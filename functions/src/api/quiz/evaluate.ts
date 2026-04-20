import { onRequest } from "firebase-functions/v2/https";
import { runEvaluation } from "../../services/evaluation-service";
import { corsOptions } from "../../utils/constants";
import { verifyAuthToken } from "../../utils/authHelper";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const evaluatePrompt = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  // Verify auth before switching to SSE — errors here still return JSON
  const user = await verifyAuthToken(req, res);
  if (!user) return;

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || user.email !== adminEmail) {
    console.warn(`Unauthorized evaluation attempt by ${user.email}`);
    res.status(403).json({ success: false, error: "Forbidden: Admin access only" });
    return;
  }

  // Auth passed — switch to SSE streaming mode
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const db = admin.firestore();
    const evalRef = db.collection("prompt_evaluations").doc();

    const results = await runEvaluation((result) => {
      res.write(`data: ${JSON.stringify({ type: "result", data: result })}\n\n`);
    });

    await evalRef.set({
      id: evalRef.id,
      timestamp: FieldValue.serverTimestamp(),
      results,
      triggeredBy: user.uid,
    });

    res.write(`data: ${JSON.stringify({ type: "done", id: evalRef.id, timestamp: Date.now() })}\n\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to run evaluation";
    res.write(`data: ${JSON.stringify({ type: "error", message })}\n\n`);
  } finally {
    res.end();
  }
});

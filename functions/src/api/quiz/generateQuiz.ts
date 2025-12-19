import { onRequest } from "firebase-functions/v2/https";
import { verifyAuthToken } from "../../utils/authHelper";
import { generateQuizFlow } from "../../services/quiz-ai-service";

const corsOptions = {
  cors: ["https://kateskoryna.github.io", "http://localhost:5173"],
  invoker: "public" as const,
};

export const generateQuiz = onRequest(corsOptions, async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const user = await verifyAuthToken(req, res);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { category, complexity, language, customUserPrompt } = req.body;

    const quiz = await generateQuizFlow({
      category,
      complexity,
      language,
      customUserPrompt,
    });

    res.status(200).json({ quiz });
  } catch (err: any) {
    console.error(err);
    res.status(401).json({ message: err.message || "Unauthorized" });
  }
});

import { Request } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

export interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
    email?: string;
    name?: string;
  };
}

/**
 * Helper to verify Firebase authentication token
 * Returns user if valid, sends error response if not
 */
export async function verifyAuthToken(
  req: Request,
  res: any
): Promise<{ uid: string; email?: string; name?: string } | null> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: "Unauthorized - No token provided",
    });
    return null;
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
    };
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Unauthorized - Invalid token",
    });
    return null;
  }
}

/**
 * Helper to handle CORS
 * Allows all standard REST methods for future-proofing
 */
export function setCorsHeaders(req: Request, res: any) {
  const origin = req.headers.origin;

  const allowedOrigins = ["https://kateskoryna.github.io", "http://localhost:5173"];

  if (origin && allowedOrigins.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Credentials", "true");
}

/**
 * Helper to handle OPTIONS preflight
 * Returns 204 No Content with CORS headers
 */
export function handleOptions(req: Request, res: any): boolean {
  if (req.method === "OPTIONS") {
    setCorsHeaders(req, res);
    res.status(204).send("");
    return true;
  }
  return false;
}

import { onRequest } from "firebase-functions/v2/https";
import { verifyAuthToken } from "../../utils/authHelper";
import { generateQuizFlow } from "../../services/quiz-ai-service";
import { corsOptions } from "../../utils/constants";

export const generateQuiz = onRequest(corsOptions, async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const user = await verifyAuthToken(req, res);
    if (!user) return;

    const { category, complexity, language, customUserPrompt } = req.body;

    const quiz = await generateQuizFlow({
      category,
      complexity,
      language,
      customUserPrompt,
    });

    res.status(200).json({ quiz });
  } catch (err: any) {
    void err;
    res.status(401).json({ message: "Unauthorized" });
  }
});

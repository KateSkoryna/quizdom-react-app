# Quizdom: The Ultimate AI Quiz Platform

A modern, high-performance quiz application built with **React 19**, **Firebase**, and **Google Gemini AI**.

---

## 🚀 Quick Start (Development)

To run the application locally, you need to start the backend services and the frontend client in **two separate terminal windows**.

### **Step 1: Start the Backend (Emulators)**

Open your first terminal and run:

```bash
cd functions
npm run serve
```

_This starts the Firebase Emulators for Functions, Auth, and Firestore._

### **Step 2: Start the Frontend (Vite)**

Open a second terminal in the root folder and run:

```bash
npm run dev
```

_Your app will be available at `http://localhost:5173`._

---

## 🧪 AI Prompt Evaluation Lab

We use a **Systematic Evaluation Framework** to ensure our AI-generated quizzes are high-quality and follow strict rules.

### **How to evaluate your prompt:**

1.  **Login**: Open the app and log in with your Admin email.
2.  **Access Lab**: Navigate to `/#/prompt-evaluation`.
3.  **Run**: Click "Run New Evaluation" to generate a report using **Gemini-1.5-Flash** as the semantic judge.
4.  **Iterate**: Change rules in `functions/src/services/quiz-ai-service.ts` and re-run to see your scores (1-10) improve.

_Note: For detailed theory on our evaluation methodology, see `docs/eval-system/PromptEngineering.md`._

---

## 🛡 Security & Environment

- **Admin Access**: Ensure `ADMIN_EMAIL` is set in `functions/.env` to access the Evaluation Lab.
- **API Keys**: Your Gemini API key must be set in `functions/.env` for AI features to function.

---

Built with ❤️ by a Senior AI Engineering Team.

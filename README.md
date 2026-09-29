# Quizdom

**An AI-assisted quiz platform for creating, discovering, and taking developer knowledge quizzes.**

Quizdom helps learners turn a topic or a learning goal into a structured quiz, explore quizzes written by other users, and track their progress. I designed and built the application independently, from the React interface to the Firebase backend and the AI workflows.

## The idea

Most quiz tools start with a fixed question bank or require every question to be written by hand. Quizdom combines a community quiz library with AI-assisted authoring: a learner chooses a category, difficulty, language, and optional prompt, then reviews and edits the generated quiz before sharing it. Semantic search makes the growing library easier to explore by topic and intent, rather than relying only on exact title matches.

## What you can do

- **Create and take quizzes:** author quizzes manually or generate a first draft with AI; answer questions, view completion results, and leave feedback.
- **Discover relevant content:** browse with category and difficulty filters, infinite loading, keyword matching, or natural-language semantic search.
- **Personalize your library:** create an account, maintain a profile, and save, like, and manage quizzes.
- **Generate structured content:** request quizzes by subject, difficulty, language, and custom instructions. The generation flow enforces a typed output schema and applies content, answer, and difficulty requirements.
- **Inspect prompt quality:** an admin-only evaluation lab runs a dataset of cases and reports semantic scores, making prompt changes easier to compare and refine.
- **Use the app comfortably:** responsive layouts, lazy-loaded pages, form validation, loading and error states, and optional speech input for AI prompts support the main workflows.

## Engineering and implementation

The frontend is a React single-page application. Route-level lazy loading keeps page code split, TanStack Query handles server-state caching and paginated quiz loading, and Zustand holds focused client state such as authentication, favorites, likes, and quiz attempts. React Hook Form and Yup provide form handling and client-side validation.

### Authentication and user data

Firebase Authentication handles sign-in, including Google authentication. The client observes auth state and sends the Firebase ID token to protected backend endpoints. A login endpoint verifies the token and synchronizes the authenticated identity with a Firestore user profile, creating a profile on first sign-in and updating login metadata on subsequent visits. Users can maintain profile details and an avatar, author and manage quizzes, and keep personal favorites, likes, and completion records. Quiz completion data supports a user's results and feedback.

Firestore and Storage security rules scope profile and completion access to the signed-in owner, and quiz write access to its author. Cloud Functions verify tokens for protected operations and use the Admin SDK for server-side work. This keeps identity checks and trusted writes at the backend boundary rather than relying on client state alone.

### Semantic quiz search

Search is designed for queries such as “advanced React performance questions,” where useful results may not contain the exact words in the quiz title. For a search request, the backend identifies likely category and difficulty intent, using an LLM extractor with a heuristic fallback, then combines those filters with any explicitly selected filters. It embeds the query and retrieves nearest quiz vectors from Firestore using cosine distance. Results below the relevance threshold are removed, duplicate titles are collapsed, and the best matches are returned.

When a quiz becomes searchable, a Firestore write trigger builds embedding text from its title, description, category, difficulty, and question titles. It stores the vector alongside searchable metadata and a content hash, so unchanged content can avoid unnecessary re-embedding. Removing or unpublishing a quiz removes its search entry. If embedding generation fails, search falls back to keyword ranking; explicit category and difficulty constraints remain applied.

### Evaluating generated quiz output

The prompt-evaluation lab is an admin-only tool for checking changes to the generation prompt against a small, explicit dataset of scenarios. Each case generates a quiz from defined inputs, then runs deterministic checks for question-count expectations, answer correctness, and title, description, and hint limits. A separate Gemini semantic judge scores relevance, difficulty fit, tone, and language, with reasoning to help diagnose weak output.

The evaluation combines deterministic compliance and semantic scores with a weighted score. Question difficulty receives the largest semantic weight, and failed critical checks or minimum relevance/difficulty gates make a case fail. Results stream to the UI as they complete and are saved in Firestore for later review. This makes prompt iteration more observable; model-based scores are an aid for comparison and diagnosis, not a guarantee that every generated question is factually correct.

The backend is organized as Firebase Cloud Functions with separate API handlers and service modules. Firebase Authentication identifies users; Firestore stores profiles, quizzes, and completions; Cloud Storage supports uploaded profile images. Shared quiz schemas validate generated and submitted data at the application boundary.

AI generation uses **Genkit**, **Google Gemini**, and typed schemas. The generation flow turns model output into the app's quiz format, requests retries for transient generation failures, and applies prompt rules for language, question count, answer correctness, and difficulty.

## Application structure

```text
src/                         React application
  components/                Quiz, profile, form, layout, and shared UI
  pages/                     Quiz library, quiz, profile, news, auth, evaluation
  hooks/                      Data loading and reusable interaction logic
  fetchers/                   HTTP/API client functions
  store/                      Focused Zustand client stores
  schemas/                    Frontend quiz validation schemas
functions/src/               Firebase Cloud Functions backend
  api/                        HTTP and Firestore-triggered handlers
  services/                   Quiz, AI, search, evaluation, and user logic
  schemas/                    Backend input/output schemas
  config/, types/, utils/     Infrastructure and shared backend definitions
firestore.rules               Firestore access rules
storage.rules                 Storage access rules
firestore.indexes.json        Firestore query and vector indexes
```

## Technology

| Area | Tools |
| --- | --- |
| Client | React 19, TypeScript, Vite, React Router |
| UI and forms | React Bootstrap, Sass Modules, React Hook Form, Yup |
| Client data | TanStack Query, Zustand |
| Backend and hosting | Firebase Authentication, Cloud Functions, Firestore, Cloud Storage, Firebase Hosting |
| AI | Genkit, Google Gemini, Gemini embeddings, Firestore vector search |
| Quality and tooling | ESLint, Prettier, Vitest, Lighthouse tooling |

## Run locally

You need Node.js 20 and Firebase/Gemini configuration for the services you want to use. Set the required Firebase client configuration for Vite and `GEMINI_API_KEY` in `functions/.env`. The prompt-evaluation page also checks the configured admin email. Keep secrets in local environment files; do not commit them.

Install dependencies in the project root and functions package, then run the emulators and frontend in separate terminals:

```bash
npm install
cd functions && npm install
```

```bash
# Terminal 1, from functions/
npm run serve
```

```bash
# Terminal 2, from the project root
npm run dev
```

The frontend runs at `http://localhost:5173`. The local setup starts the Functions, Firestore, and Auth emulators; Firebase configuration also defines the Storage emulator. Build commands are `npm run build` in the root and `npm run build` in `functions/`.

## Project ownership

Quizdom was designed and implemented by me as an individual project. I handled the product idea, UI, frontend, backend, Firebase data and access model, AI generation and evaluation workflows, and semantic search. The codebase is split into client and server packages to keep user-facing features, API boundaries, and domain services understandable as the project grows.

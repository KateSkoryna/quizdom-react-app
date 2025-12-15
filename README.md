# Quizdom

A modern, interactive quiz application built with React, TypeScript, and Firebase. Quizdom allows users to create, browse, and take quizzes on various programming topics while tracking their progress and favorite quizzes.

## Features

### User Management

- User authentication (signup/login/logout) via Firebase Authentication
- User profiles with custom avatars stored in Firebase Storage
- User statistics tracking (average scores, quiz history)
- Profile editing capabilities
- Password-protected accounts

### Quiz Management

- Create custom quizzes with multiple questions and answers using React Hook Form
- Browse and filter quizzes by:
  - Category (JavaScript, TypeScript, ReactJS, NextJS, NodeJS, Jest)
  - Complexity level (Beginner, Medium, Advanced, Expert)
- Take quizzes and view results
- Add quizzes to favorites (stored per user in Firestore)
- Delete your own quizzes
- View quizzes created by specific users
- Real-time quiz data synchronization with Firestore

### Additional Features

- News section with technology, health, science, and business articles (powered by external News API)
- Blog section
- Responsive design with React Bootstrap and CSS Modules
- Protected routes for authenticated users
- Error boundary for graceful error handling
- Lazy loading for optimized performance
- Image lazy loading with placeholder support

## Tech Stack

### Frontend

- **React 18.2** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server with SWC for fast compilation
- **React Router v6** - Client-side routing with loaders

### UI & Styling

- **React Bootstrap** - Pre-built UI components (Navbar, Cards, Modals, Forms, etc.)
- **Bootstrap 5.3** - CSS framework
- **CSS Modules** - Scoped component-level styling
- **Sass** - CSS preprocessing for advanced styling features

### State Management & Forms

- **Zustand** - Lightweight state management for:
  - Active navigation state
  - Quiz modal visibility
  - Quiz form state
  - Offcanvas menu state
- **React Hook Form** - Performant form handling with validation
- **Yup** - Schema validation for forms
- **@hookform/resolvers** - Integration between React Hook Form and Yup

### Backend & Database (Firebase)

- **Firebase Authentication** - Secure user authentication with email/password
- **Cloud Firestore** - NoSQL database with two main collections:
  - `users` - User profiles, preferences, favorites, and statistics
  - `quizes` - Quiz data with questions, answers, and metadata
- **Firebase Storage** - Storage for user avatar images and other assets
- **Firebase SDK v10** - Latest Firebase JavaScript SDK

### HTTP & Data Fetching

- **Axios** - HTTP client for external News API integration
- **React Router Loaders** - Data fetching integrated with routing

### Additional Libraries

- **date-fns** - Lightweight date formatting and manipulation
- **React DatePicker** - Date selection component for user birthdate
- **React Icons** - Comprehensive icon library
- **React Loader Spinner** - Loading indicators for async operations
- **React Lazy Load Image Component** - Image optimization and lazy loading
- **React Error Boundary** - Error handling wrapper
- **React UUID** - Unique ID generation
- **bcryptjs-react** - Password hashing (client-side)
- **random-avatar-generator** - Random avatar generation for new users
- **localforage** - Offline storage enhancement
- **match-sorter** & **sort-by** - Search and sorting utilities

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- A Firebase project with:
  - **Authentication** enabled (Email/Password provider)
  - **Firestore Database** set up in production or test mode
  - **Storage** configured with appropriate security rules
- A News API key from [NewsAPI.org](https://newsapi.org/) or similar service

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quizdom-react-app.git
cd quizdom-react-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase and News API credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# News API Configuration
VITE_NEWS_API_KEY=your_news_api_key
VITE_NEWS_BASE_URL=https://your-news-api-base-url.com/api/v1
```

## Available Scripts

### `npm run dev`

Starts the development server with hot module replacement (HMR) at `http://localhost:5173`.

```bash
npm run dev
```

### `npm run build`

Builds the app for production. TypeScript is compiled first, then Vite optimizes and minifies the bundle.

```bash
npm run build
```

### `npm run lint`

Runs ESLint to check for code quality issues in TypeScript and TSX files.

```bash
npm run lint
```

### `npm run preview`

Preview the production build locally after running `npm run build`.

```bash
npm run preview
```

## Monorepo Build Scripts

This project is structured as a monorepo with three workspaces that depend on each other:
- **`shared/`** - Shared TypeScript types and schemas
- **`functions/`** - Firebase Cloud Functions (backend)
- **`src/`** - React frontend application

The frontend and backend both import from `shared`, so **build order matters**: `shared` must be built first.

### When to Use These Scripts

These scripts are **manual** - run them when:
- ✅ You change TypeScript types in `shared/`
- ✅ You want to check for type errors across all workspaces
- ✅ You're preparing to deploy
- ✅ You want to generate production builds

These scripts do **NOT** run automatically on file changes.

### `npm run build:all`

Builds all three workspaces in the correct dependency order.

```bash
npm run build:all
```

**What it does:**
1. Compiles `shared/` → outputs to `shared/lib/`
2. Compiles `functions/` → outputs to `functions/lib/`
3. Builds frontend (TypeScript + Vite) → outputs to `dist/`

**When to run:** After making changes to shared types or before deployment.

### `npm run tsc:all`

Runs TypeScript compiler across all workspaces to check for type errors (faster than full build).

```bash
npm run tsc:all
```

**What it does:**
- Type-checks `shared/`, `functions/`, and `src/` for TypeScript errors
- Does NOT create build artifacts (no compilation output)
- Useful for quick validation during development

**When to run:** During development to catch type errors before committing code.

### `npm run format`

Formats all code across all workspaces using Prettier.

```bash
npm run format
```

**What it does:**
1. Formats `shared/src/` TypeScript files
2. Formats `functions/src/` TypeScript files
3. Formats `src/` TypeScript, JavaScript, CSS, and SCSS files

**When to run:** Before committing code to ensure consistent formatting.

### `npm run format:check`

Checks if all files are formatted correctly without modifying them.

```bash
npm run format:check
```

**What it does:**
- Validates formatting across all workspaces
- Reports files that need formatting
- Does NOT modify files (read-only check)

**When to run:** In CI/CD pipelines or to verify formatting before committing.

### Important Notes

- If you change types in `shared/`, always run `npm run build:all` so that `functions` and `src` see the latest types
- The scripts will stop on the first error (fail-fast behavior)
- All scripts show clear progress indicators for each workspace
- Prettier configuration is in `.prettierrc` (shared across all workspaces)

## Project Structure

```
quizdom-react-app/
├── src/
│   ├── API/
│   │   └── api.tsx                # Firebase & News API functions
│   ├── assets/                    # Images, SVGs, and static assets
│   ├── components/
│   │   ├── App/                   # Main App component with React Router
│   │   ├── ErrorFallbackComponent/ # Error boundary fallback UI
│   │   ├── FooterComponents/      # Footer components
│   │   ├── HeroComponent/         # Landing page hero section
│   │   ├── Layout/                # App layout wrapper
│   │   ├── Loader/                # Loading spinner component
│   │   ├── MainQuizPageComponents/ # Quiz listing, filtering, modals
│   │   ├── NavbarComponent/       # Navigation with Offcanvas menu
│   │   ├── NewsPageComponents/    # News listing and search
│   │   ├── QuizFormComponents/    # Quiz creation form components
│   │   ├── UserPageComponents/    # User profile components
│   │   ├── DeleteQuizComponent/   # Quiz deletion modal
│   │   ├── NavigateUserModal/     # User navigation modal
│   │   ├── OwlComponent/          # Owl mascot component
│   │   └── WarnUserText/          # Warning text component
│   ├── const/
│   │   └── const.tsx              # App constants (categories, complexity)
│   ├── context/
│   │   ├── AuthContext.tsx        # Authentication context
│   │   └── AuthProvider.tsx       # Authentication provider
│   ├── helpers/
│   │   ├── addClassnameToText.tsx # Text formatting helper
│   │   ├── convertComplexity.tsx  # Complexity converter
│   │   ├── generateRandomAvatar.tsx # Avatar generator
│   │   ├── jokes.tsx              # Programming jokes data
│   │   ├── schema.tsx             # Yup validation schemas
│   │   └── truncateString.tsx     # String truncation utility
│   ├── pages/
│   │   ├── AboutPage/
│   │   ├── BlogsPage/
│   │   ├── HomePage/
│   │   ├── LoginPage/
│   │   ├── NewsPage/
│   │   ├── NotFoundPage/
│   │   ├── QiuzPage/              # Main quiz page with filtering
│   │   ├── SignupPage/
│   │   ├── UserPage/
│   │   └── ProtectedRoute.tsx     # Route protection HOC
│   ├── store/
│   │   └── store.tsx              # Zustand stores
│   ├── types/
│   │   └── types.tsx              # TypeScript interfaces and types
│   ├── firebase.tsx               # Firebase initialization
│   ├── index.css                  # Global styles
│   ├── main.tsx                   # Application entry point
│   └── vite-env.d.ts              # Vite type definitions
├── public/                        # Static public assets
├── index.html                     # HTML entry point
├── package.json
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript config for Node scripts
├── vite.config.ts                 # Vite configuration
└── README.md
```

## Key Features Explained

### Authentication Flow

1. Users sign up with email/password using Firebase Authentication
2. User profile data is stored in Firestore `users` collection
3. Protected routes redirect unauthenticated users to login

### Quiz Creation with React Hook Form

1. Multi-step form powered by React Hook Form
2. Yup schema validation for all inputs
3. Dynamic question/answer fields
4. Form data stored in Zustand before submission
5. Quiz saved to Firestore with author information

### Data Fetching Strategy

1. React Router loaders fetch data before route rendering
2. Quiz filtering via URL search params (`?category=JavaScript&complexity=beginner`)
3. News fetched from external API with category and search support
4. Real-time updates possible with Firestore listeners (can be added)

## Development

The project uses:

- **Vite** with **@vitejs/plugin-react-swc** for fast development and building
- **TypeScript** for type safety across the codebase
- **ESLint** with TypeScript-specific rules for code quality
- **CSS Modules** for component-scoped styling without conflicts

# Quiz Validation with Yup Schemas - Complete Guide

## Overview

Your quiz app uses **Yup schemas** for comprehensive validation on both frontend and backend, ensuring consistent validation rules across your entire application.

## Architecture

```
┌─────────────────────────────────────────────────┐
│         Yup Schema (Single Source of Truth)     │
│                                                 │
│  - src/schemas/quizSchema.ts (Frontend)         │
│  - functions/src/quizSchema.ts (Backend)        │
└─────────────────────────────────────────────────┘
                      │
           ┌──────────┴──────────┐
           │                     │
    ┌──────▼──────┐      ┌──────▼──────┐
    │  Frontend   │      │   Backend   │
    │ React Hook  │      │  Firebase   │
    │    Form     │      │  Functions  │
    │ yupResolver │      │  validate() │
    └─────────────┘      └─────────────┘
```

## What's Been Implemented

### Frontend Validation

- ✅ React Hook Form integrated with `yupResolver`
- ✅ Real-time validation as users type
- ✅ Automatic error messages, Type-safe with TypeScript
- Files: `quizFormComponent.tsx`, `questionsFormComponent.tsx`

### Backend Validation - Four Firebase Cloud Functions

1. **validateQuizData** (Callable) - Validate before submission from frontend
2. **validateQuizHttp** (HTTP Endpoint) - Alternative validation, CORS-enabled
3. **validateQuizOnCreate** (Firestore Trigger) - Auto-validates new quizzes, deletes invalid
4. **validateQuizOnUpdate** (Firestore Trigger) - Auto-validates updates, reverts invalid

## Validation Rules

| Field            | Rules                                |
| ---------------- | ------------------------------------ |
| Quiz Title       | 3-100 characters, required, trimmed  |
| Quiz Description | 10-500 characters, required, trimmed |
| Questions        | 1-50 questions required              |
| Question Title   | 4-200 characters, required, trimmed  |
| Answers          | 2-6 per question, at least 1 correct |
| Category         | Valid QuizCategory enum              |
| Complexity       | Valid Complexity enum (1-4)          |
| Answer Text      | Non-empty string, required, trimmed  |
| isCorrect        | Boolean, required                    |

## Frontend Implementation

```typescript
import { yupResolver } from "@hookform/resolvers/yup";
import { quizSchema } from "../../schemas/quizSchema";

const methods = useForm({
  mode: "onChange",
  defaultValues,
  resolver: yupResolver(quizSchema),
});
```

## Backend Implementation

All Cloud Functions use yup with these options:

```typescript
await quizSchema.validate(data, {
  abortEarly: false, // Collect all errors
  stripUnknown: true, // Remove unknown fields for security
});
```

Errors are formatted as: `"Quiz title is required; Each question must have at least 2 answers"`

## How It Works

```
User fills form
     ↓
Frontend validates (Yup + React Hook Form)
     ↓
If valid, submits to Firestore
     ↓
Backend validates (Yup + Cloud Functions)
     ↓
If valid, saves to database
If invalid, reverts/deletes
```

## Deployment

```bash
npx firebase login
npx firebase deploy --only functions
```

### Local Testing with Emulator

```bash
npm --prefix functions run serve
```

In `src/firebase.tsx`:

```typescript
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const functions = getFunctions(app);
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}
export { functions };
```

## Testing Validation

Try creating a quiz with invalid data:

1. Empty title → "Quiz title is required"
2. Short title (< 3 chars) → "Quiz title must be at least 3 characters long"
3. Long title (> 100 chars) → "Quiz title must be at most 100 characters long"
4. Short description (< 10 chars) → "Quiz description must be at least 10 characters long"
5. Question with < 2 answers → "Each question must have at least 2 answers"
6. Question with no correct answer → "Each question must have at least one correct answer"
7. Question title < 4 chars → "Question title must be at least 4 characters long"

## Modifying Validation Rules

Edit **both** schema files: `src/schemas/quizSchema.ts` and `functions/src/quizSchema.ts`

Example - Change title length:

```typescript
title: yup.string().required("Quiz title is required").trim()
  .min(5, "Quiz title must be at least 5 characters long")
  .max(150, "Quiz title must be at most 150 characters long"),
```

After modifying backend: `npm --prefix functions run build && npx firebase deploy --only functions`

Custom validation example:

```typescript
questionTitle: yup.string().required("Question title is required").trim()
  .min(4, "Question title must be at least 4 characters long")
  .test('no-profanity', 'Question contains inappropriate language',
    (value) => !containsProfanity(value)
  ),
```

## Optional: Backend Validation on Submit

Add validation before Firestore submission in `src/fetchers/api.ts`:

```typescript
import { validateQuizData } from "../utils/quizValidation";

export async function addQuiz(
  data: QuizFormState,
  userId: string,
  userName: string,
  setError: UseFormSetError<QuizFormState>
) {
  try {
    const validatedData = await validateQuizData(data);
    await addDoc(collection(db, "quizes"), {
      ...validatedData,
      authorId: userId,
      authorName: userName,
      publishedAt: new Date(),
      complexity: COMPLEXITY_VALUES[validatedData.complexity],
    });
  } catch (error) {
    if (error instanceof Error) {
      setError("root", { message: error.message || "Failed to create a quiz" });
      throw new Error(error.message);
    }
  }
}
```

## Project Structure

```
quizdom-react-app/
├── src/
│   ├── schemas/
│   │   └── quizSchema.ts          ← Frontend validation
│   ├── utils/
│   │   └── quizValidation.ts      ← Validation helper
│   └── components/forms/
│       ├── quizFormComponent.tsx   ← Uses yupResolver
│       └── questionsFormComponent.tsx
├── functions/
│   ├── src/
│   │   ├── index.ts               ← 4 Cloud Functions
│   │   ├── quizSchema.ts          ← Backend validation
│   │   └── types.ts               ← Type definitions
│   ├── package.json
│   └── tsconfig.json
└── firebase.json                   ← Firebase config
```

## Benefits

✅ **Consistent** - Same rules everywhere | ✅ **Type-safe** - Full TypeScript support
✅ **Maintainable** - Single source of truth | ✅ **User-friendly** - Clear error messages
✅ **Secure** - Server-side validation | ✅ **Automatic** - Firestore triggers enforce rules

## Monitoring

```bash
npx firebase functions:log              # View logs
npx firebase functions:list             # Check status
```

# Firebase Quiz Validation — Complete Project Guide

**Purpose:** single concise reference combining deployment checklist, frontend & backend integration, Firestore triggers, validation rules, and troubleshooting.

---

## Table of Contents

1. Overview
2. Quick Start (deploy + build)
3. Project structure
4. Frontend integration (callable + HTTP)
5. Updating quiz creation (recommended locations)
6. Firestore triggers (automatic validation)
7. Local testing (emulator)
8. Validation rules (summary)
9. Error messages & handling
10. Deployment notes & rebuild
11. Cleanup & migration notes
12. Support & next steps

---

## 1. Overview

This project uses a shared Yup schema on both frontend and backend to validate quiz data. Validation runs:

- Client-side (Yup + react-hook-form)
- Server-side via Firebase Functions (callable + HTTP)
- Automatically on Firestore writes via triggers

Benefits: consistent rules, TypeScript safety, and server-side protection against malformed or malicious data.

---

## 2. Quick Start

### Install & build functions

```bash
cd functions
npm install
npm run build
```

### Login & deploy

```bash
npx firebase login
npx firebase deploy --only functions
```

Deployed functions:

- `validateQuizData` — callable
- `validateQuizHttp` — HTTP POST
- `validateQuizOnCreate` — Firestore onCreate trigger
- `validateQuizOnUpdate` — Firestore onUpdate trigger

---

## 3. Project Structure (important files)

```
quizdom-react-app/
├─ src/
│  ├─ schemas/quizSchema.ts          # frontend yup schema
│  ├─ utils/quizValidation.ts        # callable/http wrappers
│  └─ components/forms/
│     ├─ quizFormComponent.tsx
│     └─ questionsFormComponent.tsx
├─ functions/
│  ├─ src/
│  │  ├─ index.ts                    # exports cloud functions
│  │  ├─ quizSchema.ts               # backend yup schema
│  │  ├─ types.ts
│  │  └─ validation.ts               # old validation (optional delete)
│  ├─ package.json
│  └─ tsconfig.json
├─ firebase.json
├─ YUP_VALIDATION_GUIDE.md
├─ INTEGRATION_GUIDE.md
└─ FIREBASE_FUNCTIONS_USAGE.md
```

---

## 4. Frontend Integration

Callable function flow
`src/utils/quizValidation.ts`:

```ts
import { getFunctions, httpsCallable } from "firebase/functions";

const validateQuizDataFn = httpsCallable(getFunctions(), "validateQuizData");

export async function validateQuizData(quizData: QuizFormState) {
  try {
    const result = await validateQuizDataFn(quizData);
    if (result.data.success) return result.data.data;
    throw new Error(result.data.error || "Validation failed");
  } catch (e: any) {
    throw new Error(e.message || "Quiz validation failed");
  }
}
```

## 5. Updating Quiz Creation Logic

### Validate inside `addQuiz` (recommended single place)

`src/fetchers/api.ts`:

```ts
import { validateQuizData } from "../utils/quizValidation";

export async function addQuiz(
  data: QuizFormState,
  userId: string,
  userName: string,
  setError: UseFormSetError<QuizFormState>
) {
  try {
    const validated = await validateQuizData(data);
    await addDoc(collection(db, "quizes"), {
      ...validated,
      authorId: userId,
      authorName: userName,
      publishedAt: new Date(),
      complexity: COMPLEXITY_VALUES[validated.complexity],
    });
  } catch (error) {
    if (error instanceof Error) {
      setError("root", { message: error.message });
      throw error;
    }
    throw new Error("Failed to create quiz");
  }
}
```

> Note: The collection name used here is `quizes`. Check your triggers/queries for consistency (see section 11).

## 6. Firestore Triggers (Automatic Validation)

Triggers included in functions:

- `validateQuizOnCreate` — runs on document creation:
  - Validates payload
  - If invalid: deletes the document (or rejects write depending on implementation)
- `validateQuizOnUpdate` — runs on document update:
  - Validates new data
  - If invalid: reverts update or deletes

**Effect:** backend enforcement even if client-side validation is bypassed.

---

## 7. Local Testing with Emulator

Start functions emulator:

```bash
npm --prefix functions run serve
```

Connect from frontend:

```ts
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
const functions = getFunctions(app);
if (import.meta.env.DEV) connectFunctionsEmulator(functions, "localhost", 5001);
export { functions };
```

Test callable and HTTP endpoints locally before deploying.

---

## 8. Validation Rules (Summary)

### Quiz

- Title: **3–100 chars**
- Description: **10–500 chars**
- Questions: **1–50**
- Category & complexity must be valid

### Question

- Title: non-empty, 4–200 chars preferred
- Answers: **2–6**
- At least **1 correct answer**
- Optional hint

### Answer

- Non-empty `text`
- Boolean `isCorrect`

Keep frontend and backend `quizSchema.ts` in sync:

- `src/schemas/quizSchema.ts`
- `functions/src/quizSchema.ts`

---

## 9. Error Messages & Handling

Validation returns clear messages for UI display:

- "Quiz must have a non-empty title"
- "Quiz title must be at least 3 characters long"
- "Question 1 must have at least 2 answers"
- "Question 2 must have at least one correct answer"

Example usage:

```ts
try {
  const validated = await validateQuizData(quizData);
} catch (err) {
  toast.error(err.message);
}
```

---

## 10. Deployment Notes & Rebuild

After changing backend code:

```bash
npm --prefix functions run build
npx firebase deploy --only functions
```

View logs:

```bash
npx firebase functions:log
```

Check Firebase Console: https://console.firebase.google.com/

---

## 11. Cleanup & Critical Notes

### Old validation file

If `functions/src/validation.ts` is legacy, remove:

```bash
rm functions/src/validation.ts
```

### Collection name mismatch

Triggers watch `quizzes` but code may write to `quizes`. Fix to one form:

In `functions/src/index.ts`:

```ts
.document("quizes/{quizId}") // OR .document("quizzes/{quizId}")
```

Make sure both Firestore writes and triggers use the same path.

### Schema sync

When updating schema, update BOTH:

- `src/schemas/quizSchema.ts`
- `functions/src/quizSchema.ts`

---

## REST API Structure

### Backend (Firebase Functions)

```
functions/
└── src/
    ├── api/
    │   └── quiz/
    │       ├── attempts.ts     # Quiz attempt endpoints
    │       └── feedback.ts     # Quiz feedback endpoints
    ├── services/               # Business logic (future)
    ├── utils/
    │   └── constants.ts        # Shared constants (MAX_ATTEMPTS, COLLECTIONS)
    ├── middlewares/
    │   └── authMiddleware.ts   # Firebase token verification
    ├── config/
    │   └── firestore.ts        # Firestore database instance
    └── index.ts                # Exports all functions
```

### Quiz Attempts API Endpoints

#### 1. Check Attempt Limit
**GET** `/quizAttempts/:quizId/check`
- Check if user can attempt the quiz
- Returns: `{ canAttempt, attemptCount, maxAttempts, attempts }`

#### 2. Record Quiz Attempt
**POST** `/quizAttempts`
- Save quiz completion automatically
- Body: `{ quizId, score: { totalQuestions, correctAnswers } }`
- Returns: `{ attemptId, attemptNumber: 1, remainingAttempts: 0 }`
- **One attempt per user per quiz** (MAX_ATTEMPTS = 1)

#### 3. Get User Attempts
**GET** `/quizAttempts/:quizId`
- Get user's attempt history + feedback for a quiz
- Returns: `{ attempts, feedback, attemptCount, canAttempt }`

### Quiz Feedback API Endpoints

#### Submit Feedback
**POST** `/quizFeedback`
- Submit/update rating and comment for a quiz
- Body: `{ quizId, rating: 1-5, comment?: string }`
- User must complete quiz before leaving feedback
- Updates quiz average rating automatically

### Frontend (React + Axios)

```
src/
├── api/
│   └── axiosInstance.ts        # Axios client with auth interceptor
├── store/
│   └── quizAttemptsStore.ts    # Zustand store for attempts/feedback
└── components/
    ├── quiz/
    │   └── quizItem/
    │       └── startQuizButton.tsx  # Shows "Start" or "Already completed"
    └── modal/
        └── startQuizModal.tsx       # Auto-saves results, handles feedback
```

### Authentication Flow

All API requests require Firebase authentication:

1. **Frontend**: Axios interceptor automatically adds Firebase auth token to headers
```typescript
Authorization: Bearer <firebase-id-token>
```

2. **Backend**: Auth middleware verifies token on every request
```typescript
const decodedToken = await admin.auth().verifyIdToken(token);
req.user = { uid, email, name };
```

### Quiz Completion Flow

```
User finishes quiz
    ↓
Frontend calculates score (e.g., 15/20)
    ↓
Auto-saves to database via POST /quizAttempts
    ↓
Result stored in Firestore:
  {
    quizId,
    userId,
    attemptNumber: 1,
    score: { totalQuestions: 20, correctAnswers: 15 },
    completedAt: timestamp
  }
    ↓
User can optionally add rating (1-5) and feedback
    ↓
POST /quizFeedback → updates quiz average rating
    ↓
Modal closes, button shows "Already completed: 15/20"
```

### Key Features

- ✅ **One attempt per quiz** - Users can't retake quizzes
- ✅ **Auto-save results** - Scores saved immediately upon completion
- ✅ **Optional feedback** - Rating and comments are optional
- ✅ **Transaction safety** - Prevents duplicate attempts via Firestore transactions
- ✅ **Auth protection** - All endpoints require valid Firebase auth token
- ✅ **Automatic rating calculation** - Quiz average rating updated when feedback submitted

### Environment Variables

Add to `.env`:
```env
# Firebase Functions URL (development)
REACT_APP_FUNCTIONS_URL=http://127.0.0.1:5001/quizdom-react-app/us-central1

# Firebase Functions URL (production)
REACT_APP_FUNCTIONS_URL=https://us-central1-your-project.cloudfunctions.net
```

### Local Development

1. Start Firebase emulator:
```bash
cd functions
npm run serve
```

2. Frontend will automatically connect to local functions (via axios instance)

### Deployment

```bash
cd functions
npm run build
firebase deploy --only functions
```

Deployed endpoints:
- `/quizAttempts` - Quiz attempt management
- `/quizFeedback` - Quiz feedback management

# Firebase Functions - Quiz Validation with Yup

This directory contains Firebase Cloud Functions for validating quiz data using Yup schemas.

## Overview

All validation is powered by **Yup schemas**, ensuring consistent validation rules across frontend and backend.

## Functions

### 1. `validateQuizData` (Callable Function)

A callable function that validates quiz data before submission using Yup schema.

**Usage in React:**
```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const validateQuiz = httpsCallable(functions, 'validateQuizData');

try {
  const result = await validateQuiz(quizData);
  console.log('Validation successful:', result.data);
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

### 2. `validateQuizHttp` (HTTP Endpoint)

An HTTP endpoint for validating quiz data (alternative approach).

**Usage:**
```typescript
const response = await fetch('YOUR_FUNCTION_URL/validateQuizHttp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(quizData)
});

const result = await response.json();
```

### 3. `validateQuizOnCreate` (Firestore Trigger)

Automatically validates quiz data when a new quiz is created in Firestore using Yup schema.

### 4. `validateQuizOnUpdate` (Firestore Trigger)

Automatically validates quiz data when an existing quiz is updated using Yup schema.

## Validation Schema

All validation uses the Yup schema defined in `src/quizSchema.ts`:

- **Quiz title**: 3-100 characters
- **Quiz description**: 10-500 characters
- **Questions**: 1-50 questions
- **Question title**: 4-200 characters
- **Answers**: 2-6 answers per question
- **At least one correct answer** per question
- **Valid category and complexity**

## Development

### Install dependencies
```bash
npm install
```

### Build
```bash
npm run build
```

### Deploy
```bash
npm run deploy
```

Or from project root:
```bash
npx firebase deploy --only functions
```

### Local testing with emulator
```bash
npm run serve
```

## Error Handling

Yup validation errors are collected and formatted:

```json
{
  "error": "Quiz title must be at least 3 characters long; Each question must have at least one correct answer"
}
```

Multiple validation errors are joined with semicolons for clarity.

## Modifying Validation Rules

To modify validation rules, edit `src/quizSchema.ts` and rebuild:

```bash
npm run build
```

Then deploy:

```bash
npm run deploy
```

## Dependencies

- `firebase-admin`: ^12.1.0
- `firebase-functions`: ^5.0.0
- `yup`: Latest version

## TypeScript

This project uses TypeScript with strict type checking. All types are defined in `src/types.ts`.

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

## Firebase Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Copy the configuration values

### 2. Enable Firebase Authentication
1. In Firebase Console, navigate to **Authentication**
2. Click **Get Started**
3. Enable the **Email/Password** sign-in provider
4. Optionally enable **Email link (passwordless sign-in)**

### 3. Set up Cloud Firestore Database
1. Navigate to **Firestore Database** in Firebase Console
2. Click **Create Database**
3. Choose **Start in test mode** (for development) or **Start in production mode**
4. Select a Firestore location
5. Create two collections manually or let the app create them:
   - `users` - Stores user profiles and data
   - `quizes` - Stores quiz data with questions and answers

#### Firestore Security Rules (Example)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data and write to their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Anyone can read quizzes, but only authenticated users can create
    match /quizes/{quizId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        request.auth.uid == resource.data.authorId;
    }
  }
}
```

### 4. Configure Firebase Storage
1. Navigate to **Storage** in Firebase Console
2. Click **Get Started**
3. Set up security rules for user avatars

#### Storage Security Rules (Example)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Update Environment Variables
Copy your Firebase configuration values to the `.env` file as shown in the Installation section.

## Firestore Data Structure

### Users Collection (`users/{userId}`)
```typescript
{
  id: string;                    // Firebase Auth UID
  name: string;                  // Full name
  email: string;                 // Email address
  avatar: string;                // Avatar URL or generated avatar
  dateOfBirth: Timestamp;        // User's birthdate
  gender: "male" | "female";     // User gender
  password: string;              // Hashed password (stored separately in Auth)
  avarageScore: number;          // Average quiz score
  userInfo: string;              // User bio/description
  favorites: string[];           // Array of favorite quiz IDs
}
```

### Quizes Collection (`quizes/{quizId}`)
```typescript
{
  id: string;                                    // Auto-generated document ID
  title: string;                                 // Quiz title
  description: string;                           // Quiz description
  complexity: "beginner" | "medium" | "advanced" | "expert";
  category: "JavaScript" | "TypeScript" | "ReactJS" | "NextJS" | "NodeJS" | "Jest";
  authorId: string;                              // User ID of quiz creator
  authorName: string;                            // Display name of creator
  publishedAt: Timestamp;                        // Publication date
  questions: [
    {
      questionTitle: string;                     // Question text
      answers: [
        {
          answer: string;                        // Answer text
          isCorrect: boolean;                    // True if correct answer
        }
      ]
    }
  ]
}
```

## Key Features Explained

### Authentication Flow
1. Users sign up with email/password using Firebase Authentication
2. User profile data is stored in Firestore `users` collection
3. Protected routes redirect unauthenticated users to login
4. AuthContext provides authentication state throughout the app

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

## Browser Support

This application supports all modern browsers that support ES6+ features:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Deployment

The app is configured for GitHub Pages deployment with basename `/quizdom-react-app` (see src/components/App/App.tsx:99).

To deploy:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Ensure Firebase configuration is set for production

## License

This project is private and not licensed for public use.

## Author

Kate

---

**Built with React, TypeScript, Firebase, and React Hook Form**

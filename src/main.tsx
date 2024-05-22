import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { QuizPage } from "./pages/QiuzPage/QuizPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { BlogsPage } from "./pages/BlogsPage/BlogsPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { UserPage } from "./pages/UserPage/UserPage";
import App from "./components/App/App";
import { getAllNews } from "./API/api";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./pages/ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthProvider>
          <App />
        </AuthProvider>
      ),
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "quizes",
          element: <QuizPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "news",
          element: <NewsPage />,
          errorElement: <NotFoundPage />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            let searchQuery = url.searchParams.get("query");
            let searchCategory = url.searchParams.get("category");
            if (!searchQuery) {
              searchQuery = "none";
            }
            if (!searchCategory) {
              searchCategory = "technology";
            }
            return getAllNews(searchQuery, searchCategory);
          },
        },
        {
          path: "blogs",
          element: <BlogsPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "signup",
          element: <SignupPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  { basename: "/quizdom-react-app" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

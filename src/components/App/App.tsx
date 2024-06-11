import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../../index.css";

import {
  getAllNews,
  getAllQuizes,
  getQuizByCategoryAndComplexity,
} from "../../API/api";
import { lazy } from "react";

const Layout = lazy(() => import("../Layout/Layout"));
const UserPage = lazy(() => import("../../pages/UserPage/UserPage"));
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const QuizPage = lazy(() => import("../../pages/QiuzPage/QuizPage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NewsPage = lazy(() => import("../../pages/NewsPage/NewsPage"));
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage")
);
const BlogsPage = lazy(() => import("../../pages/BlogsPage/BlogsPage"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage"));
const ProtectedRoute = lazy(() => import("../../pages/ProtectedRoute"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/quizes",
          element: <QuizPage />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const searchCategory = url.searchParams.get("category");
            const searchComplexity = url.searchParams.get("complexity");

            const queryData = {
              category: searchCategory,
              complexity: searchComplexity,
            };
            if (!searchCategory && !searchComplexity) {
              return getAllQuizes();
            }
            return getQuizByCategoryAndComplexity(queryData);
          },
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "news",
          element: <NewsPage />,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;

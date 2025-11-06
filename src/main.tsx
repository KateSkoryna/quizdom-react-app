import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./styles/index.scss";
import {
  getAllQuizes,
  getMediaNews,
  getQuizByCategoryAndComplexity,
} from "./API/api";

const Layout = lazy(() => import("./components/layout/Layout"));
const UserPage = lazy(() => import("./pages/UserPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="quizes" replace />,
        },
        {
          path: "quizes",
          element: <HomePage />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const searchCategory = url.searchParams.get("category");
            const searchComplexity = url.searchParams.get("complexity");

            const queryData = {
              category: searchCategory,
              complexity: searchComplexity,
            };
            if (!searchCategory && !searchComplexity) {
              return await getAllQuizes();
            }
            if (searchCategory || searchComplexity) {
              return await getQuizByCategoryAndComplexity(queryData);
            }
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
            let searchQuery = url.searchParams.get("query") || "";
            let searchCategory = url.searchParams.get("category");
            if (!searchQuery) {
              searchQuery = "none";
            }
            if (!searchCategory) {
              searchCategory = "technology";
            }
            return await getMediaNews(searchCategory, searchQuery);
          },
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
        {
          path: "*",
          element: <NotFoundPage />,
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

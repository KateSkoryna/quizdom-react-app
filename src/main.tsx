import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./styles/index.scss";
import { getMediaNews } from "./API/api";

const Layout = lazy(() => import("./components/layout/layout"));
const UserPage = lazy(() => import("./pages/user"));
const SignupPage = lazy(() => import("./pages/signup"));
const LoginPage = lazy(() => import("./pages/login"));
const HomePage = lazy(() => import("./pages/home"));
const NewsPage = lazy(() => import("./pages/news"));
const NotFoundPage = lazy(() => import("./pages/notFound"));
const ProtectedRoute = lazy(() => import("./components/common/protectedRoute"));

const router = createHashRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

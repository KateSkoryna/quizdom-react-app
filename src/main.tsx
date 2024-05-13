import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { NewsComponent } from "./components/NewsComponent/NewsComponents";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { QuizPage } from "./pages/QiuzPage/QuizPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { BlogsPage } from "./pages/BlogsPage/BlogsPage";
import { AboutComponent } from "./components/About/About";
import { getAllNews, getJoke } from "./API/api";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          errorElement: <NotFoundPage />,
          loader: async () => {
            return getJoke();
          },
        },
        {
          path: "/about",
          element: <AboutComponent />,
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
          loader: async () => {
            return getAllNews();
          },
          children: [
            {
              path: "news/:news_id",
              element: <NewsComponent />,
              errorElement: <NotFoundPage />,
            },
          ],
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

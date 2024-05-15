import React from "react";
import ReactDOM from "react-dom/client";

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
import { AboutPage } from "./pages/AboutPage/AboutPage";
import App from "./components/App/App";
import { getAllNews } from "./API/api";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
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

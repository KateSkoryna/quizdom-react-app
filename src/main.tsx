import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { NewsComponent } from "./components/NewsComponent/NewsComponents";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HeroComponent } from "./HeroComponent/HeroComponent";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <HeroComponent />,
        },
        {
          path: "quizes",
          element: <NewsComponent />,
        },
        {
          path: "news",
          element: <NewsComponent />,
        },
        {
          path: "blogs",
          element: <NewsComponent />,
        },
        {
          path: "signup",
          element: <NewsComponent />,
        },
        {
          path: "login",
          element: <NewsComponent />,
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

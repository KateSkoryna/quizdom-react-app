import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../../index.css";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { NewsPage } from "../../pages/NewsPage/NewsPage";
import { HomePage } from "../../pages/HomePage/HomePage";
import { QuizPage } from "../../pages/QiuzPage/QuizPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { SignupPage } from "../../pages/SignupPage/SignupPage";
import { BlogsPage } from "../../pages/BlogsPage/BlogsPage";
import { AboutPage } from "../../pages/AboutPage/AboutPage";
import { UserPage } from "../../pages/UserPage/UserPage";
import { getAllNews } from "../../API/api";
import { ProtectedRoute } from "../../pages/ProtectedRoute";
import Layout from "../Layout/Layout";

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
          errorElement: <NotFoundPage />,
        },
        {
          path: "/quizes",
          element: <QuizPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "about",
          element: <AboutPage />,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;

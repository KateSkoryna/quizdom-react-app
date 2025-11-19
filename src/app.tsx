import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { getMediaNews } from "./API/api";
import Layout from "./components/layout/layout";
import UserPage from "./pages/user";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import NewsPage from "./pages/news";
import NotFoundPage from "./pages/notFound";
import ProtectedRoute from "./components/common/protectedRoute";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;

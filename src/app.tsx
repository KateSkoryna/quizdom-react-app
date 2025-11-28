import { useEffect } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { fetchUserWithToken } from "./fetchers/common";
import { useAuthStore } from "./store/AuthStore";
import Layout from "./components/layout/layout";
import UserPage from "./pages/user";
import AuthPage from "./pages/auth";
import HomePage from "./pages/home";
import NewsPage from "./pages/news";
import NotFoundPage from "./pages/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import { getMediaNews } from "./fetchers/api";

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
        path: "login",
        element: <AuthPage />,
      },
      {
        path: "login/signup",
        element: <AuthPage />,
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
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      await fetchUserWithToken(firebaseUser, setCurrentUser);
    });

    return () => unsubscribe();
  }, [setCurrentUser]);

  return <RouterProvider router={router} />;
}

export default App;

import { useEffect, lazy, Suspense } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { fetchUserWithToken } from "./fetchers/common";
import { useAuthStore } from "./store/AuthStore";
import Loader from "./components/common/loader";
import ProtectedRoute from "./components/common/protectedRoute";
import { getMediaNews } from "./fetchers/api";

// Lazy load pages and layout
const Layout = lazy(() => import("./components/layout/layout"));
const UserPage = lazy(() => import("./pages/user"));
const AuthPage = lazy(() => import("./pages/auth"));
const HomePage = lazy(() => import("./pages/home"));
const NewsPage = lazy(() => import("./pages/news"));
const NotFoundPage = lazy(() => import("./pages/notFound"));

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="quizes" replace />,
      },
      {
        path: "quizes",
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "news",
        element: (
          <Suspense fallback={<Loader />}>
            <NewsPage />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<Loader />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
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

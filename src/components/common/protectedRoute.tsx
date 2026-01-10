import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type AuthStore } from "../../store/authStore";
import AccessDenied from "../fallback/accessDenied";
import Loader from "./loader";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const currentUser = useAuthStore((state: AuthStore) => state.currentUser);
  const isAuthLoading = useAuthStore((state: AuthStore) => state.isAuthLoading);
  const navigate = useNavigate();

  useEffect(() => {
    // If auth finished loading and no user, redirect to login
    if (!isAuthLoading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, isAuthLoading, navigate]);

  // Show loader while checking auth state
  if (isAuthLoading) {
    return <Loader />;
  }

  // If no user after loading, show access denied (will redirect to login via useEffect)
  if (!currentUser) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import AccessDenied from "./accessDenied";
import Loader from "../components/common/loader";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;

    if (currentUser) {
      navigate("/user");
    }
  }, [currentUser, isAuthLoading, navigate]);

  if (isAuthLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;

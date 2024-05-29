import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

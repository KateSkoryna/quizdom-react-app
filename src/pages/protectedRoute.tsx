import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

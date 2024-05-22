import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser && children;
};

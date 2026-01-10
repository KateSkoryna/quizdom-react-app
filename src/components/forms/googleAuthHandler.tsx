import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type AuthStore } from "../../store/authStore";
import GoogleAuthButton from "./googleAuthButton";

const GoogleAuthHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginWithGoogle = useAuthStore((state: AuthStore) => state.loginWithGoogle);
  const currentUser = useAuthStore((state: AuthStore) => state.currentUser);
  const navigate = useNavigate();

  // Navigate to user page once login completes and user is loaded
  useEffect(() => {
    if (currentUser && isLoading) {
      setIsLoading(false);
      navigate("/user");
    }
  }, [currentUser, isLoading, navigate]);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      // onAuthStateChanged in app.tsx will handle user sync via /login API
      // Don't navigate here - let the auth flow complete first
      // The ProtectedRoute will handle navigation once user is loaded
    } catch (error: any) {
      if (error.code !== "auth/popup-closed-by-user") {
        setError(`Authentication failed: ${error.message || "Please try again."}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <GoogleAuthButton onClick={handleGoogleAuth} isLoading={isLoading} />
      {error && <p className="text-danger mt-2 text-center">{error}</p>}
    </div>
  );
};

export default GoogleAuthHandler;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import GoogleAuthButton from "./googleAuthButton";
import { ensureUserDocument } from "../../utils/authHelper";

const GoogleAuthHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      await ensureUserDocument("google");
      navigate("/user");
    } catch (error: unknown) {
      console.error("Google auth error:", error);
      setError("Failed to authenticate with Google. Please try again.");
    } finally {
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import GoogleAuthButton from "./googleAuthButton";
import { ensureUserDocument } from "../../utils/authHelper";
import { getCurrentUser } from "../../fetchers/api";
import { CurrentUser } from "../../types";

const GoogleAuthHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Authenticate with Google
      const userCredential = await loginWithGoogle();

      // Create/update Firestore document
      await ensureUserDocument("google", userCredential.user);

      // Load user data and set in store
      const userDoc = await getCurrentUser(userCredential.user.uid);
      if (!userDoc || !userDoc.exists()) {
        throw new Error("Failed to load user profile");
      }

      const userData = userDoc.data();
      const currentUser: CurrentUser = {
        ...(userData as CurrentUser),
        id: userCredential.user.uid,
        dateOfBirth: userData.dateOfBirth?.toDate ? userData.dateOfBirth.toDate() : new Date(),
      };

      setCurrentUser(currentUser);
      navigate("/user");
    } catch (error: unknown) {
      setError("Authentication failed. Please try again.");
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

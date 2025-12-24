import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type AuthStore } from "../../store/authStore";
import GoogleAuthButton from "./googleAuthButton";
import apiClient from "../../fetchers/axiosInstance";
import { CurrentUser } from "../../types";

const GoogleAuthHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginWithGoogle = useAuthStore((state: AuthStore) => state.loginWithGoogle);
  const setCurrentUser = useAuthStore((state: AuthStore) => state.setCurrentUser);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[GoogleAuth Step 1] Authenticating with Google...');
      const userCredential = await loginWithGoogle();

      console.log('[GoogleAuth Step 2] Syncing user with backend API /login...', { uid: userCredential.user.uid });
      const response = await apiClient.post("/login");

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to sync user profile");
      }

      const userData = response.data.data;
      const currentUser: CurrentUser = {
        id: userData.id,
        name: userData.displayName,
        email: userData.email,
        avatar: userData.photoURL,
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : new Date(),
        gender: userData.sex,
        averageScore: 0,
        userInfo: userData.bio,
        favorites: [],
        location: userData.location,
      };

      setCurrentUser(currentUser);
      console.log('[GoogleAuth Step 3] Success! Navigating to /user');
      navigate("/user");
    } catch (error: any) {
      console.error('[GoogleAuth] Authentication failed:', error);
      setError(`Authentication failed: ${error.message || "Please try again."}`);
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

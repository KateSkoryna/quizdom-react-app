import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthStore } from "../store/authStore";
import { CurrentUser } from "../types";
import { getCurrentUser } from "./api";
import apiClient from "./axiosInstance";

export const fetchUserWithToken = async (
  firebaseUser: User | null,
  setCurrentUser: (user: CurrentUser | null) => void
): Promise<void> => {
  if (firebaseUser) {
    // User is signed in - get token and load user data
    const token = await firebaseUser.getIdToken();

    // Save auth data to localStorage
    const authData = {
      isLoggedIn: true,
      token,
      email: firebaseUser.email,
      uid: firebaseUser.uid,
    };
    localStorage.setItem("authData", JSON.stringify(authData));

    // Load user data from Firestore
    const userDoc = await getCurrentUser(firebaseUser.uid);

    if (userDoc && userDoc.exists()) {
      const userData = userDoc.data();

      // Handle Firestore Timestamp or string date
      let dateOfBirth: Date;
      if (userData.dateOfBirth?.toDate) {
        // Firestore Timestamp
        dateOfBirth = userData.dateOfBirth.toDate();
      } else if (userData.dateOfBirth) {
        // String or other format
        dateOfBirth = new Date(userData.dateOfBirth);
      } else {
        dateOfBirth = new Date();
      }

      const currentUser: CurrentUser = {
        ...(userData as CurrentUser),
        id: firebaseUser.uid,
        dateOfBirth,
      };
      setCurrentUser(currentUser);
    } else {
      // User document doesn't exist in Firestore - sign out
      console.warn("User document not found in Firestore for uid:", firebaseUser.uid);
      await signOut(auth);
      localStorage.removeItem("authData");
      setCurrentUser(null);
    }
  } else {
    // User is signed out
    localStorage.removeItem("authData");
    setCurrentUser(null);
  }

  // Set loading to false after auth check
  useAuthStore.setState({ isAuthLoading: false });
};

// ============================================================================
// Store API Wrapper
// ============================================================================

interface StoreWithLoading {
  isLoading: boolean;
  error: string | null;
}

type SetState<T> = (partial: Partial<T>) => void;

interface ApiCallOptions {
  data?: any;
  params?: any;
}

/**
 * Generic API wrapper for Zustand stores
 * Handles loading state, API calls, and error handling automatically
 *
 * @param set - Zustand set function
 * @param method - HTTP method (get, post, put, delete, patch)
 * @param url - API endpoint URL
 * @param options - Optional data (for POST/PUT) and params (for GET)
 * @param onSuccess - Optional callback with response data
 * @returns Promise with response data
 *
 * @example
 * ```ts
 * getQuizes: async () => {
 *   return apiCall(
 *     set,
 *     'get',
 *     '/getQuizes',
 *     undefined,
 *     (data) => set({ quizes: data })
 *   );
 * }
 * ```
 */
export async function apiCall<T, S extends StoreWithLoading>(
  set: SetState<S>,
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  options?: ApiCallOptions,
  onSuccess?: (data: T) => void
): Promise<T> {
  set({ isLoading: true, error: null } as Partial<S>);

  try {
    let response;

    switch (method) {
      case "get":
        response = await apiClient.get(url, { params: options?.params });
        break;
      case "post":
        response = await apiClient.post(url, options?.data, { params: options?.params });
        break;
      case "put":
        response = await apiClient.put(url, options?.data, { params: options?.params });
        break;
      case "delete":
        response = await apiClient.delete(url, { params: options?.params });
        break;
      case "patch":
        response = await apiClient.patch(url, options?.data, { params: options?.params });
        break;
    }

    // Check for success field if it exists
    if (response.data.success === false) {
      throw new Error(response.data.error || "Request failed");
    }

    // Extract data from response
    const data = response.data.data || response.data;

    if (onSuccess) onSuccess(data);

    set({ isLoading: false } as Partial<S>);
    return data;
  } catch (error: any) {
    const errorMsg = error.error || error.message || "An error occurred";
    set({ error: errorMsg, isLoading: false } as Partial<S>);
    throw new Error(errorMsg);
  }
}

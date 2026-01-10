import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthStore } from "../store/authStore";
import { CurrentUser, GENDER } from "../types";
import apiClient from "./axiosInstance";
import { useGlobalErrorStore, ErrorSeverity } from "../store/globalErrorStore";

export const fetchUserWithToken = async (
  firebaseUser: User | null,
  setCurrentUser: (user: CurrentUser | null) => void
): Promise<void> => {
  try {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();

      const authData = {
        isLoggedIn: true,
        token,
        email: firebaseUser.email,
        uid: firebaseUser.uid,
      };
      localStorage.setItem("authData", JSON.stringify(authData));

      // Call backend /login API to create/sync user
      const response = await apiClient.post("/login");

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to sync user profile");
      }

      const userData = response.data.data;
      const currentUser: CurrentUser = {
        id: userData.id,
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : new Date(),
        sex: (userData.sex as GENDER) || GENDER.NEUTRAL,
        averageScore: userData.averageScore || 0,
        bio: userData.bio,
        location: userData.location,
      };

      setCurrentUser(currentUser);
    } else {
      localStorage.removeItem("authData");
      setCurrentUser(null);
    }
  } catch (error: any) {
    console.error("Error fetching user:", error);

    useGlobalErrorStore.getState().addError({
      userMessage: "Failed to load user data. Please refresh the page.",
      severity: ErrorSeverity.ERROR,
      dismissable: true,
    });

    await signOut(auth);
    localStorage.removeItem("authData");
    setCurrentUser(null);
  } finally {
    useAuthStore.setState({ isAuthLoading: false });
  }
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
 * Add error to global store for user notification
 * Separated for cleaner code and single responsibility
 */
function addToGlobalErrorStore(status?: number): void {
  const isNetworkError = !status;
  const isServerError = status && status >= 500;

  if (isNetworkError) {
    useGlobalErrorStore.getState().addError({
      userMessage: "Network error. Check your connection and try again.",
      severity: ErrorSeverity.ERROR,
      dismissable: true,
    });
  } else if (isServerError) {
    useGlobalErrorStore.getState().addError({
      userMessage: "Server error. Please try again.",
      severity: ErrorSeverity.ERROR,
      dismissable: true,
    });
  }
}

/**
 * Enhanced API wrapper with global error handling
 * Fails fast - no automatic retries. User can manually retry unlimited times.
 *
 * Error handling strategy:
 * - Client errors (4xx) → Feature store only (local handling)
 * - Server/Network errors (5xx, no status) → Global store (toast notification)
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

    if (response.data.success === false) {
      throw new Error(response.data.error || "Request failed");
    }

    const data = response.data.data || response.data;

    if (onSuccess) onSuccess(data);

    set({ isLoading: false } as Partial<S>);
    return data;
  } catch (error: any) {
    const errorMsg = error.error || error.message || "An error occurred";
    const status = error.response?.status;

    // Always update feature store (all errors)
    set({ error: errorMsg, isLoading: false } as Partial<S>);

    // Separate concerns: only server/network errors go to global store
    const isClientError = status && status >= 400 && status < 500;

    if (!isClientError) {
      // Network error (no status) OR Server error (5xx)
      addToGlobalErrorStore(status);
    }

    throw new Error(errorMsg);
  }
}

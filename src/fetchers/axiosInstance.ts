import axios from "axios";
import { auth } from "../firebase";

// Get Firebase Functions URL (uses Vite environment variables)
const FUNCTIONS_URL = import.meta.env.VITE_FUNCTIONS_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: FUNCTIONS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Add Firebase auth token to every request
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        console.error("Unauthorized - please login");
        // Optionally redirect to login
      } else if (status === 403) {
        console.error("Forbidden:", data.error);
      } else if (status === 409) {
        console.error("Conflict:", data.error);
      }

      return Promise.reject(data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error - no response from server");
      return Promise.reject({ error: "Network error" });
    } else {
      // Something else happened
      console.error("Error:", error.message);
      return Promise.reject({ error: error.message });
    }
  }
);

export default apiClient;

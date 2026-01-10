import { onRequest } from "firebase-functions/v2/https";
import { verifyAuthToken } from "../../utils/authHelper";
import { syncUserWithDatabase } from "../../services/user-service";
import { corsOptions } from "../../utils/constants";

/**
 * POST /login
 * Login or register a user (authenticated)
 * Syncs user data with Firestore
 */
export const login = onRequest(corsOptions, async (req, res) => {
  // 1. Validate HTTP Method
  // CORS is handled automatically by the SDK thanks to the options object above.
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
    return;
  }

  // 2. Security: Verify Token
  const decodedUser = await verifyAuthToken(req, res);

  // verifyAuthToken handles the 401 response if token is null
  if (!decodedUser) return;

  try {
    // 3. Business Logic: Create or Update User
    const userProfile = await syncUserWithDatabase(decodedUser);

    // 4. Send Success Response
    res.status(200).json({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    console.error("Login API Error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while syncing the user profile.",
    });
  }
});

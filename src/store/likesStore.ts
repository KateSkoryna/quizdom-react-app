import { create } from "zustand";
import { ACTION } from "../types/user";
import { apiCall } from "../fetchers/common";

interface LikesStore {
  likedQuizIds: string[];
  isLoading: boolean;
  error: string | null;
  getLikes: () => Promise<void>;
  toggleLike: (quizId: string, action: ACTION) => Promise<void>;
  isLiked: (quizId: string) => boolean;
}

export const useLikesStore = create<LikesStore>((set, get) => ({
  likedQuizIds: [],
  isLoading: false,
  error: null,

  getLikes: async () => {
    set({ isLoading: true, error: null });

    await apiCall<string[], LikesStore>(set, "get", "/getUserLikes", undefined, (data) => {
      set({ likedQuizIds: data });
    });
  },

  toggleLike: async (quizId: string, action: ACTION) => {
    const currentLikedQuizIds = get().likedQuizIds;
    const updatedLikedQuizIds =
      action === ACTION.ADD
        ? [...currentLikedQuizIds, quizId]
        : currentLikedQuizIds.filter((id) => id !== quizId);

    set({ likedQuizIds: updatedLikedQuizIds });

    try {
      // Call backend API
      await apiCall<void, LikesStore>(set, "post", "/toggleLike", {
        data: { quizId, action },
      });
    } catch (error) {
      // Revert on error
      set({ likedQuizIds: currentLikedQuizIds });
      throw error;
    }
  },

  isLiked: (quizId: string) => {
    return get().likedQuizIds.includes(quizId);
  },
}));

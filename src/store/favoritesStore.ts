import { create } from "zustand";
import { UserQuiz } from "../types";
import { ACTION } from "../types/user";
import { apiCall } from "../fetchers/common";

interface FavoritesStore {
  favorites: UserQuiz[];
  favoriteIds: string[]; // Quick lookup for checking if quiz is favorited
  isLoading: boolean;
  error: string | null;
  getFavorites: () => Promise<void>;
  toggleFavorite: (quizId: string, action: ACTION) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  favoriteIds: [],
  isLoading: false,
  error: null,

  getFavorites: async () => {
    set({ isLoading: true, error: null });

    await apiCall<UserQuiz[], FavoritesStore>(
      set,
      "get",
      "/getFavoriteQuizzes",
      undefined,
      (favorites) => {
        const favoriteIds = favorites.map((quiz) => quiz.id);
        set({ favorites, favoriteIds });
      }
    );
  },

  toggleFavorite: async (quizId: string, action: ACTION) => {
    // Save current state for potential revert
    const currentFavoriteIds = get().favoriteIds;
    const currentFavorites = get().favorites;

    // Optimistic update - update UI immediately
    const updatedFavoriteIds =
      action === ACTION.ADD
        ? [...currentFavoriteIds, quizId]
        : currentFavoriteIds.filter((id) => id !== quizId);

    set({ favoriteIds: updatedFavoriteIds });

    // If removing, also update favorites array
    if (action === ACTION.REMOVE) {
      const updatedFavorites = currentFavorites.filter((quiz) => quiz.id !== quizId);
      set({ favorites: updatedFavorites });
    }

    try {
      // Call backend API
      await apiCall<void, FavoritesStore>(set, "post", "/toggleFavorite", {
        data: { quizId, action },
      });
    } catch (error) {
      // Revert on error
      set({ favoriteIds: currentFavoriteIds, favorites: currentFavorites });
      throw error;
    }
  },
}));

import { create } from "zustand";
import { UserQuiz } from "../types";
import { ACTION } from "../types/user";
import { apiCall } from "../fetchers/common";

interface FavoritesStore {
  favorites: UserQuiz[];
  isLoading: boolean;
  error: string | null;
  getFavorites: (favoriteIds: string[]) => Promise<void>;
  toggleFavorite: (quizId: string, action: ACTION) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
  isLoading: false,
  error: null,
  getFavorites: async (favoriteIds: string[]) => {
    set({ isLoading: true, error: null });

    if (!favoriteIds || favoriteIds.length === 0) {
      set({ favorites: [], isLoading: false, error: null });
      return;
    }

    const quizIdsParam = favoriteIds.join(",");
    await apiCall<UserQuiz[], FavoritesStore>(
      set,
      "get",
      "/getFavoriteQuizzes",
      { params: { quizIds: quizIdsParam } },
      (favorites) => set({ favorites })
    );
  },

  toggleFavorite: async (quizId: string, action: ACTION) => {
    await apiCall<void, FavoritesStore>(set, "post", "/toggleFavorite", {
      data: { quizId, action },
    });
  },
}));

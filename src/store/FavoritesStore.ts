import { create } from "zustand";
import { getFavoriteQuizes } from "../API/api";
import { UserQuiz } from "../types/types";

interface FavoritesStore {
  favorites: UserQuiz[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  fetchFavorites: (favoriteIds: string[]) => Promise<void>;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,
  setError: (error: string) => set({ error, isLoading: false, favorites: [] }),
  fetchFavorites: async (favoriteIds: string[]) => {
    const setError = get().setError;
    set({ isLoading: true, error: null });

    if (!favoriteIds || favoriteIds.length === 0) {
      set({ favorites: [], isLoading: false });
      return;
    }

    const favorites = await getFavoriteQuizes(favoriteIds, setError);

    if (favorites) {
      set({ favorites, isLoading: false, error: null });
    }
  },

  clearFavorites: () => set({ favorites: [], isLoading: false, error: null }),
}));

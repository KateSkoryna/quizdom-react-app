import { create } from "zustand";

type ActiveNavStore = {
    active: string;
    setActive: (active: string) => void;
};

export const useActiveNavStore = create<ActiveNavStore>((set) => ({
    active: "quizes",
    setActive: (active) => set({ active }),
}))
import { create } from "zustand";
import { GlobalStore } from "../types";

export const useGlobalStore = create<GlobalStore>((set) => ({
    // Initial state
    isUpcomingEventsOpened: true,

    // Actions
    setIsUpcomingEventsOpened: (isOpened) => set({ isUpcomingEventsOpened: isOpened })
}));

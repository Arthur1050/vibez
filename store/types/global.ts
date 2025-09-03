export interface GlobalState {
    isUpcomingEventsOpened: boolean;
}

export interface GlobalActions {
    setIsUpcomingEventsOpened: (isOpened: boolean) => void;
}

export type GlobalStore = GlobalState & GlobalActions;
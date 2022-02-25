import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import authReducer from "@/components/Authorization/authSlice";
import locationReducer from "@components/Location/locationSlice";
import profileFeedReducer from "@components/Home/FeedSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            location: locationReducer,
            profileFeed: profileFeedReducer,
        },
    });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;

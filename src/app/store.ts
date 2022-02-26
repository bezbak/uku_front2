import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import authReducer from "@/components/Authorization/authSlice";
import confirmReducer from "@components/MyProfile/ConfirmSlice";
import locationReducer from "@components/Location/locationSlice";
import profileFeedReducer from "@components/Home/FeedSlice";
import profilePublicationReducer from "@components/MyProfile/ProfileSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            location: locationReducer,
            profileFeed: profileFeedReducer,
            profilePublication: profilePublicationReducer,
            confirm: confirmReducer,
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

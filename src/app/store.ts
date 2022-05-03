import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import authReducer from "@/components/Authorization/authSlice";
import categoryReduce from "@components/Search/Category/CategorySlice";
import confirmReducer from "@components/MyProfile/ConfirmSlice";
import locationReducer from "@components/Location/locationSlice";
import mainReducer from "./mainSlice";
import postReducer from "@components/Post/PostSlice";
import profileFeedReducer from "@components/Home/FeedSlice";
import profilePublicationReducer from "@components/MyProfile/ProfileSlice";
import searchReducer from "@components/Search/SearchSlice";
import systemReducer from "./systemSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            location: locationReducer,
            profileFeed: profileFeedReducer,
            profilePublication: profilePublicationReducer,
            confirm: confirmReducer,
            system: systemReducer,
            category: categoryReduce,
            post: postReducer,
            search: searchReducer,
            main: mainReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
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

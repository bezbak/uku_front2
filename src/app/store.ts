import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import authReducer from "@/components/Authorization/authSlice";
import locationReducer from "@components/Location/locationSlice";

export function makeStore() {
    return configureStore({
        reducer: { auth: authReducer, location: locationReducer },
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

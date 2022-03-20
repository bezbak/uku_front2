import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";

export interface LocationState {
    categoryId: number | undefined;
}

const initialState: LocationState = {
    categoryId: undefined,
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number | undefined>) {
            state.categoryId = action.payload;
        },
    },
});

export const { setCategoryId } = mainSlice.actions;

export const selectCategoryId = (state: AppState) => state.main.categoryId;

export default mainSlice.reducer;

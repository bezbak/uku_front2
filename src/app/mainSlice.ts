import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { IPublication } from "@/services/types";

export interface LocationState {
    categoryId: number | undefined;
    editPost: null | IPublication;
}

const initialState: LocationState = {
    categoryId: undefined,
    editPost: null,
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number | undefined>) {
            state.categoryId = action.payload;
        },
        editPost(state, action: PayloadAction<IPublication | null>) {
            state.editPost = action.payload;
        },
    },
});

export const { setCategoryId, editPost } = mainSlice.actions;

export const selectCategoryId = (state: AppState) => state.main.categoryId;
export const selectEditPost = (state: AppState) => state.main.editPost;

export default mainSlice.reducer;

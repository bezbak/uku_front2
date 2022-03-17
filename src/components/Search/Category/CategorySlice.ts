import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store";
import { ICategoryList } from "@/services/types";
import { container } from "tsyringe";
import { searchServiceToken } from "@/tokens";

export interface LocationState {
    status: "idle" | "loading" | "failed";
    category: ICategoryList[];
}

const initialState: LocationState = {
    status: "idle",
    category: [],
};

export const categoryAsync = createAsyncThunk("category", async () => {
    const searchService = container.resolve(searchServiceToken);
    const request = searchService.getCattegory();
    if (!request) return;
    const { response } = request;
    const { data: category } = await response;
    return category;
});

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categoryAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(categoryAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.category = payload;
            });
    },
});

export const selectStatuscategory = (state: AppState) => state.category.status;
export const selectCategory = (state: AppState) => state.category.category;

export default categorySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store";
import { IProfileFeed } from "@/services/types";
import { container } from "tsyringe";
import { searchServiceToken } from "@/tokens";

export interface LocationState {
    status: "idle" | "loading" | "failed";
    search: IProfileFeed | null;
}

const initialState: LocationState = {
    status: "idle",
    search: null,
};

export const searchAsync = createAsyncThunk(
    "search",
    async (params?: {
        page?: number;
        category_id?: number;
        location_id?: number;
        q?: string;
    }) => {
        const searchService = container.resolve(searchServiceToken);
        const request = searchService.getSearch(params);
        if (!request) return;
        const { response } = request;
        const { data: search } = await response;
        return search;
    }
);

export const userSearchAsync = createAsyncThunk(
    "search/user",
    async (params?: { page?: number; q?: string }) => {
        const searchService = container.resolve(searchServiceToken);
        const request = searchService.serachUser(params);
        if (!request) return;
        const { response } = request;
        const { data: search } = await response;
        return search;
    }
);

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.search = payload;
            });
    },
});

export const selectSearch = (state: AppState) => state.search.search;

export default searchSlice.reducer;

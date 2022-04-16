import { ICategorySearch, IProfileFeed, IUserSearch } from "@/services/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store";
import { container } from "tsyringe";
import { searchServiceToken } from "@/tokens";

export interface LocationState {
    status: "idle" | "loading" | "failed";
    search: IProfileFeed | null;
    users: IUserSearch | null;
    category: ICategorySearch | null;
}

const initialState: LocationState = {
    status: "idle",
    search: null,
    users: null,
    category: null,
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
    async (params: { page?: number; q?: string }, { rejectWithValue }) => {
        const searchService = container.resolve(searchServiceToken);
        const request = searchService.serachUser(params);
        try {
            if (!request) return;
            const { response } = request;
            const { data: search } = await response;
            return search;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const categorySearchAsync = createAsyncThunk(
    "search/category",
    async (params: { page?: number; q?: string }, { rejectWithValue }) => {
        const searchService = container.resolve(searchServiceToken);
        const request = searchService.searchCategory(params);
        try {
            if (!request) return;
            const { response } = request;
            const { data: search } = await response;
            return search;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
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
                if (state.search === null || payload.previous === null) {
                    state.search = payload || null;
                } else {
                    state.search = {
                        ...payload,
                        results: [...state.search.results, ...payload.results],
                    };
                }
            })
            .addCase(userSearchAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                if (state.users === null || payload.previous === null) {
                    state.users = payload || null;
                } else {
                    state.users = {
                        ...payload,
                        results: [...state.users.results, ...payload.results],
                    };
                }
            })
            .addCase(userSearchAsync.rejected, (state) => {
                state.status = "idle";
                state.users = null;
            })
            .addCase(categorySearchAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                if (state.category === null || payload.previous === null) {
                    state.category = payload || null;
                } else {
                    state.category = {
                        ...payload,
                        results: [
                            ...state.category.results,
                            ...payload.results,
                        ],
                    };
                }
            })
            .addCase(categorySearchAsync.rejected, (state) => {
                state.status = "idle";
                state.category = null;
            });
    },
});

export const selectSearch = (state: AppState) => state.search.search;
export const selectSearchUsers = (state: AppState) => state.search.users;
export const selectSearchCategory = (state: AppState) => state.search.category;

export default searchSlice.reducer;

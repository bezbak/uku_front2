import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authServiceToken } from "@/tokens";
import { container } from "tsyringe";

export interface PostState {
    following: boolean;
    message: string;
    status: "idle" | "loading" | "failed";
}

const initialState: PostState = {
    following: false,
    status: "idle",
    message: "",
};

export const followAsync = createAsyncThunk("follow", async (id: number) => {
    const accountService = container.resolve(authServiceToken);
    const request = accountService.follow(id);
    if (!request) return;
    const { response } = request;
    const { data: follow } = await response;
    return follow;
});

export const faveAsync = createAsyncThunk("fave", async (id: number) => {
    const accountService = container.resolve(authServiceToken);
    const request = accountService.fave(id);
    if (!request) return;
    const { response } = request;
    const { data: fave } = await response;
    return fave;
});

export const postSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(followAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(followAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.following = payload.subscribe;
                state.message = payload.message;
            });
    },
});

export default postSlice.reducer;

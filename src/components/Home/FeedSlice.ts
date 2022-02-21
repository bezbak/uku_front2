import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { container } from "tsyringe";
import { IProfileFeed } from "@/services/types";
import { profileServiceToken } from "@/tokens";

export interface ProfileFeedState {
    feed: IProfileFeed | null;
    status: "idle" | "loading" | "failed";
    page: number;
}

const initialState: ProfileFeedState = {
    feed: null,
    status: "idle",
    page: 1,
};

export const profileFeedAsync = createAsyncThunk(
    "profile/feed",
    async (page: number) => {
        const profileService = container.resolve(profileServiceToken);
        const request = profileService.getProfileFeed(page);
        if (!request) return;
        const { response } = request;
        const { data: profileFeed } = await response;
        return profileFeed;
    }
);

export const profileFeedSlice = createSlice({
    name: "ProfileFeed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(profileFeedAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(profileFeedAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                state.feed = payload || null;
            });
    },
});

export const selectFeed = (state: AppState) => state.profileFeed.feed;
export const selectPage = (state: AppState) => state.profileFeed.page;

export default profileFeedSlice.reducer;

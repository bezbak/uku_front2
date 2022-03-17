import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { IProfileFeed } from "@/services/types";
import { container } from "tsyringe";
import { profileServiceToken } from "@/tokens";

export interface ProfileFeedState {
    feed: IProfileFeed | null;
    fovourite: IProfileFeed | null;
    status: "idle" | "loading" | "failed";
}

const initialState: ProfileFeedState = {
    feed: null,
    fovourite: null,
    status: "idle",
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

export const fovouriteAsync = createAsyncThunk(
    "fovororite",
    async (page: number) => {
        const profileService = container.resolve(profileServiceToken);
        const request = profileService.getFovourite(page);
        if (!request) return;
        const { response } = request;
        const { data: fovourite } = await response;
        return fovourite;
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
            })
            .addCase(fovouriteAsync.fulfilled, (state, { payload }) => {
                state.fovourite = payload || null;
            });
    },
});

export const selectFeed = (state: AppState) => state.profileFeed.feed;
export const selectFav = (state: AppState) => state.profileFeed.fovourite;

export default profileFeedSlice.reducer;

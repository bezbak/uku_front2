import { IProfileFeed, IprofileInfo } from "@/services/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileServiceToken, publicationServiceToken } from "@/tokens";

import type { AppState } from "../../app/store";
import { TokenManagerDiToken } from "@/lib/TokenManager";
import { container } from "tsyringe";

export interface LocationState {
    profile: IProfileFeed | null;
    status: "idle" | "loading" | "failed";
    page: number;
    info: IprofileInfo | null;
    profilePage: "main" | "newConfirm" | "oldConfirm" | "newPhone";
    avatar: string;
}

const initialState: LocationState = {
    profile: null,
    status: "idle",
    page: 1,
    info: null,
    profilePage: "main",
    avatar: "",
};

export const profileAsync = createAsyncThunk(
    "profile/publication",
    async (page: number) => {
        const profileService = container.resolve(profileServiceToken);
        const request = profileService.getProfilePublication(page);
        if (!request) return;
        const { response } = request;
        const { data: profile } = await response;
        return profile;
    }
);

export const profileInfoAsync = createAsyncThunk("profile/info", async () => {
    const profileService = container.resolve(profileServiceToken);
    const request = profileService.getProfileInfo();
    if (!request) return;
    const { response } = request;
    const { data: info } = await response;
    return info;
});

export const publicationProfileInfo = createAsyncThunk(
    "publication/profile/info",
    async (id: string) => {
        const profileService = container.resolve(publicationServiceToken);
        const request = profileService.getPublicationUser(id);
        if (!request) return;
        const { response } = request;
        const { data: info } = await response;
        return info;
    }
);

export const publicationProfileFeed = createAsyncThunk(
    "publication/profile/feed",
    async ({ id, page }: { id: string; page: number }) => {
        const profileService = container.resolve(publicationServiceToken);
        const request = profileService.getPublicationUserPub(id, page);
        if (!request) return;
        const { response } = request;
        const { data: feed } = await response;
        return feed;
    }
);

export const updateAvatarAsync = createAsyncThunk(
    "profile/avatar",
    async (avatar: FormData) => {
        const tokenManager = container.resolve(TokenManagerDiToken);
        const token = tokenManager.getToken();
        const headers = {
            Authorization: `Token ${token}`,
        };
        const res = await fetch("/api/v1/account/avatar/", {
            method: "PATCH",
            body: avatar,
            headers,
        });
        return await res.json();
    }
);

export const getAvatarAsync = createAsyncThunk(
    "profile/avatar/get",
    async () => {
        const profileService = container.resolve(publicationServiceToken);
        const request = profileService.getAvatar();
        if (!request) return;
        const { response } = request;
        const { data: feed } = await response;
        return feed;
    }
);

export const updateProfileAsync = createAsyncThunk(
    "profile/update",
    async (
        data: {
            instagram?: string;
            telegram?: string;
            whatsapp?: string;
        },
        { rejectWithValue }
    ) => {
        const profileService = container.resolve(profileServiceToken);
        try {
            const request = profileService.updateProfile(data);
            if (!request) return;
            const { response } = request;
            const { data: update } = await response;
            return update;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        changePage(
            state,
            action: PayloadAction<
                "main" | "newConfirm" | "oldConfirm" | "newPhone"
            >
        ) {
            state.profilePage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profileAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(profileAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.profile = payload;
            })
            .addCase(profileInfoAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(profileInfoAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.info = payload;
            })
            .addCase(updateProfileAsync.fulfilled, (state, { payload }) => {
                if (!payload) return;
                state.info = {
                    ...(state.info as IprofileInfo),
                    telegram: payload.telegram,
                    instagram: payload.instagram,
                    whatsapp: payload.whatsapp,
                };
            })
            .addCase(publicationProfileInfo.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.info = payload;
            })
            .addCase(publicationProfileFeed.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.profile = payload;
            })
            .addCase(updateAvatarAsync.fulfilled, (state, { payload }) => {
                if (!payload || state.info === null) return;
                state.info = { ...state.info, avatar: payload.avatar };
                state.avatar = payload.avatar;
            })
            .addCase(getAvatarAsync.fulfilled, (state, { payload }) => {
                if (payload) state.avatar = payload.avatar;
            });
    },
});

export const { changePage } = profileSlice.actions;

export const selectProfile = (state: AppState) =>
    state.profilePublication.profile;
export const selectPage = (state: AppState) => state.profilePublication.page;
export const selectProfileInfo = (state: AppState) =>
    state.profilePublication.info;
export const selectProfilePage = (state: AppState) =>
    state.profilePublication.profilePage;
export const selectProfileStatus = (state: AppState) =>
    state.profilePublication.status;
export const selectAvatar = (state: AppState) =>
    state.profilePublication.avatar;

export default profileSlice.reducer;

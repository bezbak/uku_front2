import { IProfileFeed, IprofileInfo } from "@/services/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { NextRouter } from "next/router";
import { container } from "tsyringe";
import { profileServiceToken } from "@/tokens";
import { toast } from "react-toastify";

export interface LocationState {
    profile: IProfileFeed | null;
    status: "idle" | "loading" | "failed";
    page: number;
    info: IprofileInfo | null;
    profilePage: "main" | "newConfirm" | "oldConfirm" | "newPhone";
}

const initialState: LocationState = {
    profile: null,
    status: "idle",
    page: 1,
    info: null,
    profilePage: "main",
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

export const updateAvatarAsync = createAsyncThunk(
    "profile/avatar",
    async (form: FormData) => {
        const profileService = container.resolve(profileServiceToken);
        const request = profileService.updateAvatar(form);
        if (!request) return;
        const { response } = request;
        const { data: info } = await response;
        return info;
    }
);

export const sendSmsToOldPhoneAsync = createAsyncThunk(
    "profile/change",
    async (rout: NextRouter, { rejectWithValue, dispatch }) => {
        const profileService = container.resolve(profileServiceToken);
        try {
            const request = profileService.sendSmsToOldPhone();
            if (!request) return;
            const { response } = request;
            const { data: confirm } = await response;
            dispatch(changePage("oldConfirm"));
            return confirm;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
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
            .addCase(sendSmsToOldPhoneAsync.fulfilled, (state, { payload }) => {
                toast.success(payload?.message);
                state.profilePage = "oldConfirm";
            })
            .addCase(sendSmsToOldPhoneAsync.rejected, (_, { payload }) => {
                toast.error(payload as string);
            })
            .addCase(updateProfileAsync.fulfilled, (state, { payload }) => {
                if (!payload) return;
                state.info = {
                    ...(state.info as IprofileInfo),
                    telegram: payload.telegram,
                    instagram: payload.instagram,
                    whatsapp: payload.whatsapp,
                };
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

export default profileSlice.reducer;

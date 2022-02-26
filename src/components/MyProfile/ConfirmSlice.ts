import { IProfileFeed, IprofileInfo } from "@/services/types";
import { authServiceToken, profileServiceToken } from "@/tokens";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { NextRouter } from "next/router";
import { changePage } from "./ProfileSlice";
import { container } from "tsyringe";

export interface LocationState {
    status: "idle" | "loading" | "failed";
    confirmStatus: "idle" | "loading" | "failed";
    message: string;
}

const initialState: LocationState = {
    status: "idle",
    confirmStatus: "idle",
    message: "",
};

export const phoneConfirmAsync = createAsyncThunk(
    "confirm/code",
    async (
        data: { code: string; type: "new" | "old" },
        { rejectWithValue, dispatch }
    ) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.phoneConfirm(data.code, data.type);
            if (!request) return;
            const { response } = request;
            const { data: confirm } = await response;
            if (data.type === "new") {
                dispatch(changePage("main"));
            } else {
                dispatch(changePage("newPhone"));
            }
            return confirm;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const newPhoneAsync = createAsyncThunk(
    "confirm/new-phone",
    async (
        data: { phone: string; rout: NextRouter },
        { rejectWithValue, dispatch }
    ) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.newPhone(data.phone);
            if (!request) return;
            const { response } = request;
            const { data: confirm } = await response;
            dispatch(changePage("newConfirm"));
            return confirm;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const confirmSlice = createSlice({
    name: "confirm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(phoneConfirmAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(phoneConfirmAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.message = payload.message;
            })
            .addCase(phoneConfirmAsync.rejected, (state, { payload }) => {
                state.message = payload as string;
                state.confirmStatus = "failed";
            });
    },
});

export const selectStatusConfirm = (state: AppState) => state.confirm.status;
export const selectConfirmStatusConfirm = (state: AppState) =>
    state.confirm.confirmStatus;
export const selectMessageConfirm = (state: AppState) => state.confirm.message;

export default confirmSlice.reducer;

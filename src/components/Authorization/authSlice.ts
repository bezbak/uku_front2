import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { IRegisterSchema } from "./types";
import { TokenManagerDiToken } from "@/lib/TokenManager";
import { authServiceToken } from "@/tokens";
import { container } from "tsyringe";

export interface CounterState {
    value: "login" | "register" | "confirm";
    status: "idle" | "loading" | "failed";
    phoneNumber: string;
    message: string | undefined;
    region_detail: Record<string, unknown> | null;
    userLogined: boolean;
    confrimStatus: "loading" | "idle" | "failed";
}

const initialState: CounterState = {
    value: "login",
    status: "idle",
    phoneNumber: "",
    message: "",
    region_detail: null,
    userLogined: false,
    confrimStatus: "idle",
};

export const loginAsync = createAsyncThunk(
    "auth/login",
    async (phone: string, { rejectWithValue }) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.authLogin(phone);
            if (!request) return;
            const { response } = request;
            const { data: authinfo } = await response;
            return authinfo;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const confirmAsync = createAsyncThunk(
    "auth/confirm",
    async (
        data: { phone: string; confirmCode: string },
        { rejectWithValue }
    ) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.confirmLogin(data);
            if (!request) return;
            const { response } = request;
            const { data: confirm } = await response;
            return confirm;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const registerAsync = createAsyncThunk(
    "auth/register",
    async (data: Omit<IRegisterSchema, "rule">, { rejectWithValue }) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.register(data);
            if (!request) return;
            const { response } = request;
            const { data: register } = await response;
            return register;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeNumber(state, action: PayloadAction<string>) {
            state.phoneNumber = action.payload;
        },
        incorectNumber(state) {
            state.value = "login";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginAsync.fulfilled, (state) => {
                state.value = "confirm";
                state.status = "idle";
                state.message = "";
            })
            .addCase(loginAsync.rejected, (state, { payload }) => {
                state.message = payload as string;
                state.status = "failed";
            })
            .addCase(confirmAsync.pending, (state) => {
                state.confrimStatus = "loading";
            })
            .addCase(confirmAsync.fulfilled, (state, { payload }) => {
                if (!payload) return;
                const tokenManager = container.resolve(TokenManagerDiToken);
                tokenManager.setToken(payload.token);
                if (!payload.is_profile_completed) {
                    state.value = "register";
                } else {
                    state.region_detail = payload?.region_detail || null;
                }
                state.confrimStatus = "idle";
                state.message = "";
            })
            .addCase(confirmAsync.rejected, (state, { payload }) => {
                state.message = payload as string;
                state.confrimStatus = "failed";
            })
            .addCase(registerAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerAsync.fulfilled, (state, { payload }) => {
                const tokenManager = container.resolve(TokenManagerDiToken);
                if (payload?.token) {
                    tokenManager.setToken(payload.token);
                }
                state.status = "idle";
                state.message = "";
            })
            .addCase(registerAsync.rejected, (state, { payload }) => {
                state.message = payload as string;
                state.status = "failed";
            });
    },
});

export const { changeNumber, incorectNumber } = authSlice.actions;

export const selectAuth = (state: AppState) => state.auth.value;
export const selectPhone = (state: AppState) => state.auth.phoneNumber;
export const selectMessage = (state: AppState) => state.auth.message;
export const selectStatus = (state: AppState) => state.auth.status;
export const selectConfirmStatus = (state: AppState) =>
    state.auth.confrimStatus;

export default authSlice.reducer;

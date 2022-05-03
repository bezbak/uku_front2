import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { IRegisterSchema } from "./types";
import { TokenManagerDiToken } from "@/lib/TokenManager";
import { authServiceToken } from "@/tokens";
import { container } from "tsyringe";
import { initLocation } from "@/app/mainSlice";
import { authentication } from "@/config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export interface CounterState {
    value: "login" | "register" | "confirm";
    status: "idle" | "loading" | "failed";
    phoneNumber: string;
    message: string | undefined;
    region_detail: {
        id: number;
        name: string;
    } | null;
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
    async (
        data: {
            phone: string;
            verify: RecaptchaVerifier;
        },
        { rejectWithValue }
    ) => {
        try {
            const auth = signInWithPhoneNumber(
                authentication,
                data.phone,
                data.verify
            );
            return await auth;
        } catch (error) {
            if (
                (error as any).code == "auth/quota-exceeded" ||
                (error as any).code == "auth/too-many-requests"
            ) {
                return rejectWithValue(
                    "Слишком много попыток, попробуйте позже"
                );
            } else {
                return rejectWithValue((error as any).message);
            }
        }
    }
);

export const confirmAsync = createAsyncThunk(
    "auth/confirm",
    async (phone: string, { rejectWithValue, dispatch }) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.confirmLogin(phone);
            if (!request) return;
            const { response } = request;
            const { data: confirm } = await response;
            dispatch(initLocation(confirm.region_detail));
            return confirm;
        } catch (error) {
            return rejectWithValue((error as any).message);
        }
    }
);

export const registerAsync = createAsyncThunk(
    "auth/register",
    async (
        data: Omit<IRegisterSchema, "rule">,
        { rejectWithValue, dispatch }
    ) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.register(data);
            if (!request) return;
            const { response } = request;
            const { data: register } = await response;
            dispatch(initLocation(register.region_detail));
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
                    state.value = "login";
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
export const selectRegionDetail = (state: AppState) => state.auth.region_detail;

export default authSlice.reducer;

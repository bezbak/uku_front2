import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { authProvider } from "@/config/firebase.config";
import { RecaptchaVerifier } from "firebase/auth";
import { container } from "tsyringe";
import { authServiceToken } from "@/tokens";
import { toast } from "react-toastify";

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
    async (phone: string, { rejectWithValue }) => {
        const authService = container.resolve(authServiceToken);
        try {
            const request = authService.newPhone(phone);
            if (!request) return;
            const { response } = request;
            const { data: confirm } = await response;
            return confirm;
        } catch (error) {
            toast.error((error as any).message);
            return rejectWithValue((error as any).message);
        }
    }
);

export const newPhoneAsync = createAsyncThunk(
    "confirm/new-phone",
    async (
        data: {
            phone: string;
            verify: RecaptchaVerifier;
        },
        { rejectWithValue }
    ) => {
        try {
            return await authProvider.verifyPhoneNumber(
                data.phone,
                data.verify
            );
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

export const confirmSlice = createSlice({
    name: "confirm",
    initialState,
    reducers: {},
});

export const selectStatusConfirm = (state: AppState) => state.confirm.status;
export const selectConfirmStatusConfirm = (state: AppState) =>
    state.confirm.confirmStatus;
export const selectMessageConfirm = (state: AppState) => state.confirm.message;

export default confirmSlice.reducer;

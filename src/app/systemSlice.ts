import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { IFaq } from "@/services/types";
import { container } from "tsyringe";
import { systemServiceToken } from "@/tokens";

export interface LocationState {
    faq: IFaq[];
}

const initialState: LocationState = {
    faq: [],
};

export const faqAsync = createAsyncThunk("system/faq", async () => {
    const systemService = container.resolve(systemServiceToken);
    const request = systemService.getFaq();
    if (!request) return;
    const { response } = request;
    const { data: faq } = await response;
    return faq;
});

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(faqAsync.fulfilled, (state, { payload }) => {
            if (!payload) return;
            state.faq = payload;
        });
    },
});

export const selectFaq = (state: AppState) => state.system.faq;

export default systemSlice.reducer;

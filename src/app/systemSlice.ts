import { IAgreemnet, IContact, IFaq } from "@/services/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { container } from "tsyringe";
import { systemServiceToken } from "@/tokens";

export interface LocationState {
    faq: IFaq[];
    agreement: IAgreemnet | null;
    privacy: IAgreemnet | null;
    contact: IContact | null;
}

const initialState: LocationState = {
    faq: [],
    agreement: null,
    privacy: null,
    contact: null,
};

export const faqAsync = createAsyncThunk("system/faq", async () => {
    const systemService = container.resolve(systemServiceToken);
    const request = systemService.getFaq();
    if (!request) return;
    const { response } = request;
    const { data: faq } = await response;
    return faq;
});

export const agreementAsync = createAsyncThunk("system/agreement", async () => {
    const systemService = container.resolve(systemServiceToken);
    const request = systemService.getAgreement();
    if (!request) return;
    const { response } = request;
    const { data: agreement } = await response;
    return agreement;
});

export const privacyPolicyAsync = createAsyncThunk(
    "system/privacy",
    async () => {
        const systemService = container.resolve(systemServiceToken);
        const request = systemService.getPrivacy();
        if (!request) return;
        const { response } = request;
        const { data: privacy } = await response;
        return privacy;
    }
);

export const contactAsync = createAsyncThunk("system/contact", async () => {
    const systemService = container.resolve(systemServiceToken);
    const request = systemService.getContact();
    if (!request) return;
    const { response } = request;
    const { data: contact } = await response;
    return contact;
});

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(faqAsync.fulfilled, (state, { payload }) => {
                if (!payload) return;
                state.faq = payload;
            })
            .addCase(agreementAsync.fulfilled, (state, { payload }) => {
                if (!payload) return;
                state.agreement = payload;
            })
            .addCase(contactAsync.fulfilled, (state, { payload }) => {
                if (!payload) return;
                state.contact = payload;
            });
    },
});

export const selectFaq = (state: AppState) => state.system.faq;
export const slectAgreement = (state: AppState) => state.system.agreement;
export const selectPrivacy = (state: AppState) => state.system.privacy;
export const selectContact = (state: AppState) => state.system.contact;

export default systemSlice.reducer;

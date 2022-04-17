import { ILocation, IPublication } from "@/services/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { UKU_LOCATION } from "@/constants/headers";

export interface LocationState {
    categoryId: number | undefined;
    editPost: null | IPublication;
    openLocationModal: boolean;
    loaction: Omit<ILocation, "children"> | null;
    searchVisible: boolean;
    authConfirm: boolean;
    actionModal: number | null;
}

const initialState: LocationState = {
    categoryId: undefined,
    editPost: null,
    openLocationModal: false,
    loaction: null,
    searchVisible: false,
    authConfirm: false,
    actionModal: null,
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number | undefined>) {
            state.categoryId = action.payload;
        },
        editPost(state, action: PayloadAction<IPublication | null>) {
            state.editPost = action.payload;
        },
        setLocationModal(state, action: PayloadAction<boolean>) {
            state.openLocationModal = action.payload;
        },
        setLocation(
            state,
            action: PayloadAction<Omit<ILocation, "children"> | null>
        ) {
            state.loaction = action.payload;
        },
        initLocation(
            _,
            action: PayloadAction<Omit<ILocation, "children"> | null>
        ) {
            if (action.payload) {
                localStorage.setItem(
                    UKU_LOCATION,
                    JSON.stringify(action.payload)
                );
            }
        },

        setSearchOverlay(state, action: PayloadAction<boolean>) {
            state.searchVisible = action.payload;
        },
        setAuthConfirm(state, action: PayloadAction<boolean>) {
            state.authConfirm = action.payload;
        },
        setActionModal(state, action: PayloadAction<number | null>) {
            state.actionModal = action.payload;
        },
    },
});

export const {
    setCategoryId,
    editPost,
    setLocationModal,
    setLocation,
    initLocation,
    setSearchOverlay,
    setAuthConfirm,
    setActionModal,
} = mainSlice.actions;

export const selectCategoryId = (state: AppState) => state.main.categoryId;
export const selectEditPost = (state: AppState) => state.main.editPost;
export const selectOpenLocationModal = (state: AppState) =>
    state.main.openLocationModal;
export const selectLocation = (state: AppState) => state.main.loaction;
export const selectSearchVisible = (state: AppState) =>
    state.main.searchVisible;
export const selectAuthConfrim = (state: AppState) => state.main.authConfirm;
export const selectActionmodal = (state: AppState) => state.main.actionModal;

export default mainSlice.reducer;

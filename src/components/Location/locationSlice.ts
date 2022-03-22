import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";
import { ILocation } from "@/services/types";
import { container } from "tsyringe";
import { locationServiceToken } from "@/tokens";

export interface LocationState {
    locations: ILocation[];
    status: "idle" | "loading" | "failed";
}

const initialState: LocationState = {
    locations: [],
    status: "idle",
};

export const locationAsync = createAsyncThunk("location", async () => {
    const locationService = container.resolve(locationServiceToken);
    const request = locationService.getLocations();
    if (!request) return;
    const { response } = request;
    const { data: locations } = await response;
    return locations;
});

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(locationAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(locationAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.locations = payload;
            });
    },
});

export const selectLocation = (state: AppState) => state.location.locations;

export default locationSlice.reducer;

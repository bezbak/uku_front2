import { authServiceToken, publicationServiceToken } from "@/tokens";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store";
import { IPublication } from "@/services/types";
import { container } from "tsyringe";

export interface PostState {
    following: boolean;
    message: string;
    status: "idle" | "loading" | "failed";
    publication: IPublication | null;
}

const initialState: PostState = {
    following: false,
    status: "idle",
    message: "",
    publication: null,
};

export const followAsync = createAsyncThunk("follow", async (id: number) => {
    const accountService = container.resolve(authServiceToken);
    const request = accountService.follow(id);
    if (!request) return;
    const { response } = request;
    const { data: follow } = await response;
    return follow;
});

export const faveAsync = createAsyncThunk("fave", async (id: number) => {
    const accountService = container.resolve(authServiceToken);
    const request = accountService.fave(id);
    if (!request) return;
    const { response } = request;
    const { data: fave } = await response;
    return fave;
});

export const publicationAsync = createAsyncThunk(
    "publication",
    async (id: string | number) => {
        const publicationService = container.resolve(publicationServiceToken);
        const request = publicationService.getPublicationById(id);
        if (!request) return;
        const { response } = request;
        const { data: publication } = await response;
        return publication;
    }
);

export const commentAsync = createAsyncThunk(
    "comment",
    async (data: { comment_id?: number; id: number; formData: FormData }) => {
        const publicationService = container.resolve(publicationServiceToken);
        const request = publicationService.addComment(data);
        if (!request) return;
        const { response } = request;
        const { data: publication } = await response;
        return publication;
    }
);

export const postSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(followAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(followAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.following = payload.subscribe;
                state.message = payload.message;
            })
            .addCase(publicationAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                state.publication = payload;
            })
            .addCase(commentAsync.fulfilled, (state, { payload }) => {
                state.status = "idle";
                if (!payload) return;
                if (state.publication)
                    state.publication = {
                        ...state.publication,
                        comments: [...state.publication.comments, payload],
                    };
            });
    },
});

export const selectPublication = (state: AppState) => state.post.publication;

export default postSlice.reducer;

import { authServiceToken, publicationServiceToken } from "@/tokens";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store";
import { IPublication } from "@/services/types";
import { container } from "tsyringe";
import { toast } from "react-toastify";

export interface PostState {
    following: boolean;
    message: string;
    status: "idle" | "loading" | "failed";
    publication: IPublication | null;
    followStatus: "idle" | "loading" | "failed";
}

const initialState: PostState = {
    following: false,
    status: "idle",
    message: "",
    publication: null,
    followStatus: "idle",
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
        try {
            const { data: publication } = await response;
            return publication;
        } catch (error) {
            console.log(error, request);
        }
    }
);

export const createPostAsync = createAsyncThunk(
    "post/create",
    async (data: {
        category: number;
        location: number;
        description: string;
        images?: number[];
    }) => {
        const publicationService = container.resolve(publicationServiceToken);
        const request = publicationService.createPost(data);
        if (!request) return;
        const { response } = request;
        const { data: post } = await response;
        return post;
    }
);

export const postImageUploadAsync = createAsyncThunk(
    "post/image",
    async (formData: FormData, { rejectWithValue }) => {
        const publicationService = container.resolve(publicationServiceToken);
        const request = publicationService.postImageUpload(formData);
        if (!request) return;
        try {
            const { response } = request;
            const { data: post } = await response;
            return post;
        } catch (error) {
            if ((error as any).code) {
                toast.error("Слишком большой размер фото!");
            }
            return rejectWithValue((error as any).message);
        }
    }
);

export const postImageDeleteAsync = createAsyncThunk(
    "post/image/delete",
    async (id: number) => {
        const publicationService = container.resolve(publicationServiceToken);
        const request = publicationService.postImageDelete(id);
        if (!request) return;
        const { response } = request;
        const { data: post } = await response;
        return post;
    }
);

export const updatePostAsync = createAsyncThunk(
    "post/update",
    async (data: {
        category: number;
        location: number;
        description: string;
        images?: number[];
        postId: number;
    }) => {
        const publicationService = container.resolve(publicationServiceToken);
        const request = publicationService.updatePost(data);
        if (!request) return;
        const { response } = request;
        const { data: post } = await response;
        return post;
    }
);

export const deletePostAsync = createAsyncThunk(
    "post/delete",
    async (postId: number) => {
        const publicationService = container.resolve(publicationServiceToken);
        const request = publicationService.deletePost(postId);
        if (!request) return;
        const { response } = request;
        const { data: post } = await response;
        return post;
    }
);

export const postSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(followAsync.pending, (state) => {
                state.followStatus = "loading";
            })
            .addCase(followAsync.fulfilled, (state, { payload }) => {
                state.followStatus = "idle";
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
export const selectFollowStatus = (state: AppState) => state.post.followStatus;

export default postSlice.reducer;

import {
    CommentSchema,
    PublicationCreateSchema,
    PublicationSchema,
} from "./schemas/PublicationSchema";
import {
    IComment,
    IProfileFeed,
    IPublication,
    IPublicationCrate,
    IprofileInfo,
} from "./types";
import { ProfileFeedSchema, ProfileInfoSchema } from "./schemas/ProfileSchema";
import { array, number, object, string } from "superstruct";

import { AUTHORIZATION_HEADER_NAME } from "@/constants/headers";
import { ApiClientInterface } from "@/lib/ApiClient";
import { TokenManagerInterface } from "@/lib/TokenManager";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class PublicationService {
    constructor(
        private readonly api: ApiClientInterface,
        private readonly tokenManager: TokenManagerInterface
    ) {}
    getPublicationUser(id: string | number) {
        const request = this.api.get(`/publication/user/${id}`, {
            headers: this.tokenManager.getToken()
                ? {
                      [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                  }
                : undefined,
        });
        assertApiResponse<IprofileInfo>(request, ProfileInfoSchema);
        return request;
    }

    getPublicationUserPub(id: string | number, page: number) {
        const request = this.api.get(`/publication/user/${id}/publications`, {
            data: {
                page,
            },
            headers: this.tokenManager.getToken()
                ? {
                      [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                  }
                : undefined,
        });
        assertApiResponse<IProfileFeed>(request, ProfileFeedSchema);
        return request;
    }

    getPublicationById(id: number | string) {
        const request = this.api.get(`/publication/${id}/`, {
            headers: this.tokenManager.getToken()
                ? {
                      [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                  }
                : undefined,
        });
        assertApiResponse<IPublication>(request, PublicationSchema);
        return request;
    }

    addComment(data: { comment_id?: number; id: number; formData: FormData }) {
        const request = this.api.post(
            `/publication/comment/${data.id}/add_comment/${
                data.comment_id ? `?comment_id=${data.comment_id}` : ""
            }`,
            data.formData,
            {
                headers: {
                    ["Authorization"]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );
        assertApiResponse<IComment>(request, CommentSchema);
        return request;
    }

    createPost(data: {
        category: number;
        location: number;
        description: string;
    }) {
        const request = this.api.post(
            "/publication/create/",
            { ...data },
            {
                headers: {
                    [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );
        assertApiResponse<IPublicationCrate>(request, PublicationCreateSchema);
        return request;
    }

    updatePost(data: {
        category: number;
        location: number;
        description: string;
        postId: number;
    }) {
        const request = this.api.put(
            `/publication/${data.postId}/update/`,
            { ...data },
            {
                headers: {
                    [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );
        assertApiResponse<IPublication>(request, PublicationSchema);
        return request;
    }

    deletePost(postId: number) {
        const request = this.api.delete(`/publication/${postId}/delete/`, {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        return request;
    }

    postImageUpload(formData: FormData) {
        const request = this.api.post("/publication/image/upload/", formData, {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        assertApiResponse<number[]>(request, array(number()));
        return request;
    }

    getAvatar() {
        const request = this.api.get("/account/avatar/", {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        assertApiResponse<{ avatar: string }>(
            request,
            object({
                avatar: string(),
            })
        );
        return request;
    }
}

export default PublicationService;

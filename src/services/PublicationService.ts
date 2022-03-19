import { IProfileFeed, IPublication, IprofileInfo } from "./types";
import { ProfileFeedSchema, ProfileInfoSchema } from "./schemas/ProfileSchema";

import { AUTHORIZATION_HEADER_NAME } from "@/constants/headers";
import { ApiClientInterface } from "@/lib/ApiClient";
import { PublicationSchema } from "./schemas/PublicationSchema";
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
}

export default PublicationService;

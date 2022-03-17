import { IProfileFeed, IprofileInfo } from "./types";
import { ProfileFeedSchema, ProfileInfoSchema } from "./schemas/ProfileSchema";

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
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        assertApiResponse<IprofileInfo>(request, ProfileInfoSchema);
        return request;
    }

    getPublicationUserPub(id: string | number, page: number) {
        const request = this.api.get(`/publication/user/${id}/publications`, {
            data: {
                page,
            },
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        assertApiResponse<IProfileFeed>(request, ProfileFeedSchema);
        return request;
    }
}

export default PublicationService;

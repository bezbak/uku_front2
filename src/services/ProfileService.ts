import {
    IOldPhoneChnage,
    IProfileFeed,
    IUpdateProfile,
    IprofileInfo,
} from "./types";
import {
    ProfileFeedSchema,
    ProfileInfoSchema,
    UpdateProfileSchema,
    oldPhoneSchema,
} from "./schemas/ProfileSchema";

import { AUTHORIZATION_HEADER_NAME } from "@/constants/headers";
import { ApiClientInterface } from "@/lib/ApiClient";
import { TokenManagerInterface } from "@/lib/TokenManager";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class ProfileService {
    constructor(
        private readonly api: ApiClientInterface,
        private readonly tokenManager: TokenManagerInterface
    ) {}
    getProfileFeed(page: number) {
        const request = this.api.get("/account/profile/feed/", {
            data: {
                page,
            },
        });
        assertApiResponse<IProfileFeed>(request, ProfileFeedSchema);
        return request;
    }

    getProfilePublication(page: number) {
        const request = this.api.get("/account/profile/publication/", {
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

    getProfileInfo() {
        const request = this.api.get("/account/profile/", {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        assertApiResponse<IprofileInfo>(request, ProfileInfoSchema);
        return request;
    }

    sendSmsToOldPhone() {
        const request = this.api.get("/account/send-sms-to-old-phone/", {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        assertApiResponse<IOldPhoneChnage>(request, oldPhoneSchema);
        return request;
    }

    updateProfile(data: {
        instagram?: string;
        telegram?: string;
        whatsapp?: string;
    }) {
        const request = this.api.patch(
            "/account/profile/update/",
            {
                ...data,
            },
            {
                headers: {
                    [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );
        assertApiResponse<IUpdateProfile>(request, UpdateProfileSchema);
        return request;
    }

    updateAvatar(form: FormData) {
        const request = this.api.patch(
            "/account/avatar/",
            {
                avatar: form,
            },
            {
                headers: {
                    [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );
        assertApiResponse<IUpdateProfile>(request, UpdateProfileSchema);
        return request;
    }

    getFovourite(page: number) {
        const request = this.api.get("/account/favorite/", {
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

export default ProfileService;

import { ApiClientInterface } from "@/lib/ApiClient";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";
import { TokenManagerInterface } from "@/lib/TokenManager";
import { ProfileFeedSchema } from "./schemas/ProfileSchema";
import { IProfileFeed } from "./types";

class ProfileService {
    constructor(
        private readonly api: ApiClientInterface,
        private readonly tokenManager: TokenManagerInterface
    ) {}
    getProfileFeed(page: number) {
        const request = this.api.get("/account/profile/feed", {
            data: {
                page,
            },
        });
        assertApiResponse<IProfileFeed>(request, ProfileFeedSchema);
        return request;
    }
}

export default ProfileService;

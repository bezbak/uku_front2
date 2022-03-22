import { ICategoryList, IProfileFeed, IUserSearch } from "./types";

import { ApiClientInterface } from "@/lib/ApiClient";
import { CategoryListSchema } from "./schemas/CategorySchema";
import { ProfileFeedSchema } from "./schemas/ProfileSchema";
import { UserSearchSchema } from "./schemas/SearchSchema";
import { array } from "superstruct";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class SearchService {
    constructor(private readonly api: ApiClientInterface) {}
    getCattegory() {
        const request = this.api.get("/category/");
        assertApiResponse<ICategoryList[]>(request, array(CategoryListSchema));
        return request;
    }

    getSearch(params?: {
        page?: number;
        category_id?: number;
        location_id?: number;
        q?: string;
    }) {
        const request = this.api.get("/publication/search/", {
            params: params,
        });
        assertApiResponse<IProfileFeed>(request, ProfileFeedSchema);
        return request;
    }

    serachUser(params?: { page?: number; q?: string }) {
        const request = this.api.get("/account/search/", {
            params: params,
        });
        assertApiResponse<IUserSearch>(request, UserSearchSchema);
        return request;
    }
}

export default SearchService;

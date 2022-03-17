import { ApiClientInterface } from "@/lib/ApiClient";
import { CategoryListSchema } from "./schemas/CategorySchema";
import { ICategoryList } from "./types";
import { array } from "superstruct";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class SearchService {
    constructor(private readonly api: ApiClientInterface) {}
    getCattegory() {
        const request = this.api.get("/category/");
        assertApiResponse<ICategoryList[]>(request, array(CategoryListSchema));
        return request;
    }
}

export default SearchService;

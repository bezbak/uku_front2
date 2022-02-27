import { ApiClientInterface } from "@/lib/ApiClient";
import { FaqSchema } from "./schemas/SystemSchema";
import { IFaq } from "./types";
import { array } from "superstruct";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class SystemService {
    constructor(private readonly api: ApiClientInterface) {}

    getFaq() {
        const request = this.api.get("/system/faq");
        assertApiResponse<IFaq[]>(request, array(FaqSchema));
        console.log(request);
        return request;
    }
}

export default SystemService;

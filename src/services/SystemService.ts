import { AgreementSchema, FaqSchema } from "./schemas/SystemSchema";
import { IAgreemnet, IFaq } from "./types";

import { ApiClientInterface } from "@/lib/ApiClient";
import { array } from "superstruct";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class SystemService {
    constructor(private readonly api: ApiClientInterface) {}

    getFaq() {
        const request = this.api.get("/system/faq");
        assertApiResponse<IFaq[]>(request, array(FaqSchema));
        return request;
    }

    getAgreement() {
        const request = this.api.get("/system/terms-of-use");
        assertApiResponse<IAgreemnet>(request, AgreementSchema);
        return request;
    }

    getPrivacy() {
        const request = this.api.get("/system/privacy-policy");
        assertApiResponse<IAgreemnet>(request, AgreementSchema);
        return request;
    }
}

export default SystemService;

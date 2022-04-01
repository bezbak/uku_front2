import {
    AgreementSchema,
    ContactSchema,
    FaqSchema,
} from "./schemas/SystemSchema";
import { IAgreemnet, IContact, IFaq } from "./types";

import { AUTHORIZATION_HEADER_NAME } from "@/constants/headers";
import { ApiClientInterface } from "@/lib/ApiClient";
import { TokenManagerInterface } from "@/lib/TokenManager";
import { array } from "superstruct";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class SystemService {
    constructor(
        private readonly api: ApiClientInterface,
        private readonly tokenManager: TokenManagerInterface
    ) {}

    getFaq() {
        const request = this.api.get("/system/faq/");
        assertApiResponse<IFaq[]>(request, array(FaqSchema));
        return request;
    }

    getAgreement() {
        const request = this.api.get("/system/terms-of-use/");
        assertApiResponse<IAgreemnet>(request, AgreementSchema);
        return request;
    }

    getPrivacy() {
        const request = this.api.get("/system/privacy-policy/");
        assertApiResponse<IAgreemnet>(request, AgreementSchema);
        return request;
    }

    getContact() {
        const request = this.api.get("/system/contact/");
        assertApiResponse<IContact>(request, ContactSchema);
        return request;
    }

    sendComplain(data: { id: number; complaint_type: string; text?: string }) {
        const request = this.api.post(`/system/complaint/${data.id}/`, data, {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });
        assertApiResponse<IContact>(request, ContactSchema);
        return request;
    }
}

export default SystemService;

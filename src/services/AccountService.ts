import { IRegisterSchema } from "@/components/Authorization/types";
import { AUTHORIZATION_HEADER_NAME } from "@/constants/headers";
import { ApiClientInterface } from "@/lib/ApiClient";
import { ApiRequestInterface } from "@/lib/ApiClient/ApiRequest";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";
import { TokenManagerInterface } from "@/lib/TokenManager";
import { singleton } from "tsyringe";
import { AuthSchema, ConfirmSchema } from "./schemas/AccountSchema";
import { IAuth, IConfirm } from "./types";

@singleton()
class AuthService {
    constructor(
        private readonly api: ApiClientInterface,
        private readonly tokenManager: TokenManagerInterface
    ) {}

    authLogin(phone: string): ApiRequestInterface<IAuth> {
        const request = this.api.post("/account/auth/", {
            phone,
        });
        assertApiResponse<IAuth>(request, AuthSchema);
        return request;
    }

    confirmLogin(data: { phone: string; confirmCode: string }) {
        const request = this.api.post("/account/login-confirm/", {
            phone: data.phone,
            confirmation_code: data.confirmCode,
        });
        assertApiResponse<IConfirm>(request, ConfirmSchema);
        return request;
    }

    register(data: Omit<IRegisterSchema, "rule">) {
        const request = this.api.patch(
            "/account",
            {
                ...data,
            },
            {
                headers: {
                    [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );

        assertApiResponse<IConfirm>(request, ConfirmSchema);
        return request;
    }
}

export default AuthService;

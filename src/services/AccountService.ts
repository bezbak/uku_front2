import {
    AuthSchema,
    ConfirmSchema,
    FollowSchema,
} from "./schemas/AccountSchema";
import { IAuth, IConfirm, IFollow, IOldPhoneChnage } from "./types";

import { AUTHORIZATION_HEADER_NAME } from "@/constants/headers";
import { ApiClientInterface } from "@/lib/ApiClient";
import { ApiRequestInterface } from "@/lib/ApiClient/ApiRequest";
import { IRegisterSchema } from "@/components/Authorization/types";
import { TokenManagerInterface } from "@/lib/TokenManager";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";
import { oldPhoneSchema } from "./schemas/ProfileSchema";
import { singleton } from "tsyringe";

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
            "/account/",
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

    logOut() {
        this.tokenManager.discardToken();
    }

    phoneConfirm(
        code: string,
        type: "new" | "old"
    ): ApiRequestInterface<IAuth> {
        const request = this.api.post(
            `/account/${
                type === "new" ? "new-phone-confirm" : "old-phone-confirm"
            }/`,
            {
                confirmation_code: code,
            },
            {
                headers: {
                    [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );
        if (type === "new") {
            assertApiResponse<IAuth>(request, AuthSchema);
        } else {
            assertApiResponse<IOldPhoneChnage>(request, oldPhoneSchema);
        }
        return request;
    }

    newPhone(phone: string): ApiRequestInterface<IAuth> {
        const request = this.api.post(
            "/account/change-old-phone/",
            {
                phone: phone,
            },
            {
                headers: {
                    [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                },
            }
        );
        assertApiResponse<IAuth>(request, AuthSchema);
        return request;
    }

    follow(id: number) {
        const request = this.api.get(`/account/follow/${id}/`, {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });

        assertApiResponse<IFollow>(request, FollowSchema);
        return request;
    }

    fave(id: number) {
        const request = this.api.get(`/account/favorite/${id}`, {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
            },
        });

        assertApiResponse<IFollow>(request, FollowSchema);
        return request;
    }
}

export default AuthService;

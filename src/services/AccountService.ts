import {
    AuthSchema,
    ConfirmSchema,
    FollowSchema,
} from "./schemas/AccountSchema";
import { IAuth, IConfirm, IFollow } from "./types";

import { AUTHORIZATION_HEADER_NAME } from "@/constants/headers";
import type {ApiClientInterface}  from "@/lib/ApiClient";
import { ApiRequestInterface } from "@/lib/ApiClient/ApiRequest";
import { IRegisterSchema } from "@/components/Authorization/types";
import type { TokenManagerInterface } from "@/lib/TokenManager";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";
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

    confirmLogin(phone: string) {
        const request = this.api.post("/account/auth-firebase/", {
            phone: phone,
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

    newPhone(phone: string): ApiRequestInterface<IAuth> {
        const request = this.api.post(
            "/account/change-old-phone/",
            {
                phone: phone,
            },
            {
                headers: this.tokenManager.getToken()
                    ? {
                          [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                      }
                    : undefined,
            }
        );
        assertApiResponse<IAuth>(request, AuthSchema);
        return request;
    }

    follow(id: number) {
        const request = this.api.get(`/account/follow/${id}/`, {
            headers: this.tokenManager.getToken()
                ? {
                      [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                  }
                : undefined,
        });

        assertApiResponse<IFollow>(request, FollowSchema);
        return request;
    }

    fave(id: number) {
        const request = this.api.get(`/account/favorite/${id}/`, {
            headers: this.tokenManager.getToken()
                ? {
                      [AUTHORIZATION_HEADER_NAME]: `Token ${this.tokenManager.getToken()}`,
                  }
                : undefined,
        });

        assertApiResponse<IFollow>(request, FollowSchema);
        return request;
    }
}

export default AuthService;

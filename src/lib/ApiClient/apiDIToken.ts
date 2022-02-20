import { InjectionToken } from "tsyringe";
import { ApiClientInterface } from ".";

export const apiDIToken = Symbol(
    "apiDIToken"
) as InjectionToken<ApiClientInterface>;

export const authApiDIToken = Symbol(
    "authApiDIToken"
) as InjectionToken<ApiClientInterface>;

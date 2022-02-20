import { InjectionToken } from "tsyringe";
import { TokenManagerInterface } from "./TokenManagerInterface";

export const tokenManagerDiToken = Symbol(
    "authApiDIToken"
) as InjectionToken<TokenManagerInterface>;

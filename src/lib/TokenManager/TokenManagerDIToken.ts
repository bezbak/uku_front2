import { InjectionToken } from "tsyringe";
import { TokenManagerInterface } from "./TokenManagerInterface";

export const TokenManagerDiToken = Symbol(
    "authApiDIToken"
) as InjectionToken<TokenManagerInterface>;

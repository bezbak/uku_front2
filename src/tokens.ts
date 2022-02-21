import { InjectionToken } from "tsyringe";
import AuthService from "./services/AccountService";
import LocationService from "./services/LocationService";
import ProfileService from "./services/ProfileService";

export const authServiceToken = Symbol(
    "authServiceToken"
) as InjectionToken<AuthService>;

export const locationServiceToken = Symbol(
    "locationServiceToken"
) as InjectionToken<LocationService>;

export const profileServiceToken = Symbol(
    "profileServiceToken"
) as InjectionToken<ProfileService>;

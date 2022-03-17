import AuthService from "./services/AccountService";
import { InjectionToken } from "tsyringe";
import LocationService from "./services/LocationService";
import ProfileService from "./services/ProfileService";
import PublicationService from "./services/PublicationService";
import SearchService from "./services/SearchService";
import SystemService from "./services/SystemService";

export const authServiceToken = Symbol(
    "authServiceToken"
) as InjectionToken<AuthService>;

export const locationServiceToken = Symbol(
    "locationServiceToken"
) as InjectionToken<LocationService>;

export const profileServiceToken = Symbol(
    "profileServiceToken"
) as InjectionToken<ProfileService>;

export const systemServiceToken = Symbol(
    "systemServiceToken"
) as InjectionToken<SystemService>;

export const searchServiceToken = Symbol(
    "searchServiceToken"
) as InjectionToken<SearchService>;

export const publicationServiceToken = Symbol(
    "publicationServiceToken"
) as InjectionToken<PublicationService>;

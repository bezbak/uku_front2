import "@/styles/globals.css";
import "reflect-metadata";

import { ApiClient, apiDIToken, authApiDIToken } from "@/lib/ApiClient";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER_NAME } from "@/constants/headers";
import React, { ReactElement, ReactNode } from "react";
import { TokenManager, TokenManagerDiToken } from "@/lib/TokenManager";
import {
    authServiceToken,
    locationServiceToken,
    profileServiceToken,
} from "@/tokens";

import type { AppProps } from "next/app";
import AuthService from "@/services/AccountService";
import CookiesManager from "@/lib/CookiesManager/CookiesManager";
import LocationService from "@/services/LocationService";
import { NextPage } from "next";
import ProfileService from "@/services/ProfileService";
import { Provider } from "react-redux";
import { container } from "tsyringe";
import store from "../app/store";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
    const cookiesManager = new CookiesManager();
    const tokenManager = new TokenManager(cookiesManager);
    const defaultHeaders = {
        [CONTENT_TYPE_HEADER_NAME]: CONTENT_TYPE,
    };
    const api = new ApiClient("/api/v1/", {
        headers: defaultHeaders,
    });
    const authService = new AuthService(api, tokenManager);
    const locationService = new LocationService(api);
    const profileService = new ProfileService(api, tokenManager);

    container.registerInstance(apiDIToken, api);
    container.registerInstance(TokenManagerDiToken, tokenManager);
    container.registerInstance(authServiceToken, authService);
    container.registerInstance(locationServiceToken, locationService);
    container.registerInstance(profileServiceToken, profileService);
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    );
}

export default App;

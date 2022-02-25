import "@/styles/globals.css";
import "reflect-metadata";

import { ApiClient, apiDIToken, authApiDIToken } from "@/lib/ApiClient";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import React, { ReactElement, ReactNode } from "react";
import { container } from "tsyringe";
import store from "../app/store";
import CookiesManager from "@/lib/CookiesManager/CookiesManager";
import { TokenManager, tokenManagerDiToken } from "@/lib/TokenManager";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER_NAME } from "@/constants/headers";
import AuthService from "@/services/AccountService";
import LocationService from "@/services/LocationService";
import {
    authServiceToken,
    locationServiceToken,
    profileServiceToken,
} from "@/tokens";
import { NextPage } from "next";
import ProfileService from "@/services/ProfileService";

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
    container.registerInstance(tokenManagerDiToken, tokenManager);
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

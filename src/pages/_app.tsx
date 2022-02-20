import "@/styles/globals.css";
import "reflect-metadata";

import { ApiClient, apiDIToken, authApiDIToken } from "@/lib/ApiClient";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { container } from "tsyringe";
import store from "../app/store";
import CookiesManager from "@/lib/CookiesManager/CookiesManager";
import { TokenManager, tokenManagerDiToken } from "@/lib/TokenManager";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER_NAME } from "@/constants/headers";
import AuthService from "@/services/AccountService";
import LocationService from "@/services/LocationService";
import { authServiceToken, locationServiceToken } from "@/tokens";

function App({ Component, pageProps }: AppProps) {
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

    container.registerInstance(apiDIToken, api);
    container.registerInstance(tokenManagerDiToken, tokenManager);
    container.registerInstance(authServiceToken, authService);
    container.registerInstance(locationServiceToken, locationService);
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default App;

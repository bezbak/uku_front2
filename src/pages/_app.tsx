import "@/styles/globals.css";
import "reflect-metadata";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";

import { ApiClient, apiDIToken } from "@/lib/ApiClient";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER_NAME } from "@/constants/headers";
import React, { ReactElement, ReactNode } from "react";
import { TokenManager, TokenManagerDiToken } from "@/lib/TokenManager";
import {
    authServiceToken,
    locationServiceToken,
    profileServiceToken,
    publicationServiceToken,
    searchServiceToken,
    systemServiceToken,
} from "@/tokens";

import type { AppProps } from "next/app";
import AuthConfirm from "@/components/Authorization/AuthConfirm";
import AuthService from "@/services/AccountService";
import CookiesManager from "@/lib/CookiesManager/CookiesManager";
import LocationModal from "@/components/Location/LocationModal";
import LocationService from "@/services/LocationService";
import { NextPage } from "next";
import ProfileService from "@/services/ProfileService";
import { Provider } from "react-redux";
import PublicationService from "@/services/PublicationService";
import SearchOverlay from "@/components/Search/Overlay";
import SearchService from "@/services/SearchService";
import SystemService from "@/services/SystemService";
import { ToastContainer } from "react-toastify";
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
    const systemService = new SystemService(api);
    const searchService = new SearchService(api);
    const publicationService = new PublicationService(api, tokenManager);

    container.registerInstance(apiDIToken, api);
    container.registerInstance(TokenManagerDiToken, tokenManager);
    container.registerInstance(authServiceToken, authService);
    container.registerInstance(locationServiceToken, locationService);
    container.registerInstance(profileServiceToken, profileService);
    container.registerInstance(systemServiceToken, systemService);
    container.registerInstance(searchServiceToken, searchService);
    container.registerInstance(publicationServiceToken, publicationService);
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <Provider store={store}>
            {getLayout(
                <>
                    <Component {...pageProps} />
                    <LocationModal />
                    <SearchOverlay />
                    <AuthConfirm />
                    <ToastContainer
                        position="top-center"
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        limit={1}
                    />
                </>
            )}
        </Provider>
    );
}

export default App;

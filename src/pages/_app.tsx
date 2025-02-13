import "@/styles/globals.css";
import "reflect-metadata";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "../config/firebase.config";

import { ApiClient, apiDIToken } from "@/lib/ApiClient";
import { CONTENT_TYPE, CONTENT_TYPE_HEADER_NAME } from "@/constants/headers";
import React, { ReactElement, ReactNode, useState } from "react";
import { TokenManager, TokenManagerDiToken } from "@/lib/TokenManager";
import {
    authServiceToken,
    locationServiceToken,
    profileServiceToken,
    publicationServiceToken,
    searchServiceToken,
    systemServiceToken,
} from "@/tokens";
import ActionModal from "@/components/ActionModal/ActionModal";
import type { AppProps } from "next/app";
import AuthConfirm from "@/components/Authorization/AuthConfirm";
import AuthService from "@/services/AccountService";
import CN from "classnames";
import CookiesManager from "@/lib/CookiesManager/CookiesManager";
import Head from "next/head";
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
import MobileMenu from "@/components/MobileMenu";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../themes";
import Router from "next/router";
import withYM from "@/lib/MetrickManager/index";

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
    const [showLink, setShowLink] = useState(true);
    const api = new ApiClient("/api/v1/", {
        headers: defaultHeaders,
    });
    const authService = new AuthService(api, tokenManager);
    const locationService = new LocationService(api);
    const profileService = new ProfileService(api, tokenManager);
    const systemService = new SystemService(api, tokenManager);
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
    function getMobile() {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) {
            return "Android";
        } else if (
            /iPad|iPhone|iPod/.test(ua) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        ) {
            return "iOS";
        }
        return "Other";
    }

    const handleOpenApp = () => {
        if (getMobile() === "iOS") {
            window.location.replace("uku://");

            setTimeout(() => {
                window.location.replace(
                    "https://apps.apple.com/kg/app/uku-kg/id1606008627"
                );
            }, 10000);
        } else if (getMobile() === "Android") {
            window.location.replace(
                "intent://uku.kg/#Intent;scheme=https;package=kg.uku.uku.kg;end"
            );
        }
    };

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>uku.kg</title>
            </Head>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
                {getLayout(
                    <>
                        <Component {...pageProps} />
                        <ActionModal />
                        <LocationModal />
                        <SearchOverlay />
                        <AuthConfirm />
                        <ToastContainer
                            position="top-center"
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            draggable
                            limit={1}
                            style={{
                                zIndex: 10000000,
                            }}
                        />
                        <div
                            className={CN("footer__deeplink", {
                                "footer__deeplink--hide": !showLink,
                            })}
                        >
                            <div className="footer__deeplink-inner">
                                <div
                                    className="footer__deeplink-text"
                                    onClick={handleOpenApp}
                                >
                                    Открыть приложение
                                </div>
                                <div className="footer__deeplink-button">
                                    <button
                                        type="button"
                                        className="action-modal__close button-reset-default-styles"
                                        onClick={() => setShowLink(false)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        </div>

                        <MobileMenu />
                        <style jsx>{`
                            .footer__deeplink {
                                position: fixed;
                                bottom: 70px;
                                width: 100%;
                                background: #fff;
                                z-index: 99;
                            }

                            .footer__deeplink-inner {
                                position: relative;
                                text-align: center;
                            }

                            .footer__deeplink-button {
                                position: absolute;
                                right: 10px;
                                top: 50%;
                                transform: translateY(-50%);
                            }

                            .footer__deeplink-button button {
                                font-size: 20px;
                            }

                            .footer__deeplink-text {
                                font-size: 14px;
                                color: #0095f6;
                                padding: 10px;
                                cursor: pointer;
                            }

                            .footer__deeplink--hide {
                                display: none;
                            }

                            @media all and (min-width: 710px) {
                                .footer__deeplink {
                                    display: none;
                                }
                            }
                        `}</style>
                    </>
                )}
            </Provider>
        </ThemeProvider>
    );
}

export default withYM("88273965", Router, undefined, {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
})(App);

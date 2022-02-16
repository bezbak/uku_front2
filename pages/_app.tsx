import "~/styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";
import { createStore } from "@reatom/core";
import { reatomContext } from "@reatom/react";

function App({ Component, pageProps }: AppProps) {
    const store = createStore();

    return (
        <reatomContext.Provider value={store}>
            <Component {...pageProps} />
        </reatomContext.Provider>
    );
}

export default App;

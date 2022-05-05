import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";
import { YMInitializer } from "react-yandex-metrika";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/images/_logo.png" />
                    <meta name="description" content="Uku" />
                    <meta name="keywords" content="Uku.kg, уку, uku" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <YMInitializer
                        accounts={[88273965]}
                        options={{
                            clickmap: true,
                            trackLinks: true,
                            accurateTrackBounce: true,
                            webvisor: true,
                        }}
                    />
                </body>
                <style jsx global>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body .Toastify__toast-container {
                        --toastify-z-index: 10000000;
                    }
                `}</style>
            </Html>
        );
    }
}

export default MyDocument;

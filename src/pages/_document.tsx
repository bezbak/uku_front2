import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="ru">
                <body>
                    <Main />
                    <NextScript />
                    {/* <YMInitializer
                        accounts={[88273965]}
                        options={{
                            clickmap: true,
                            trackLinks: true,
                            accurateTrackBounce: true,
                            webvisor: true,
                        }}
                    /> */}
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

import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/images/_logo.png" />
                    <meta name="description" content="Uku" />
                    <meta name="keywords" content="Uku.kg, уку, uku" />
                    <meta
                        httpEquiv="Content-Security-Policy"
                        content="upgrade-insecure-requests"
                    ></meta>
                </Head>
                <body className="main">
                    <Main />
                    <NextScript />
                </body>
                <style jsx global>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                `}</style>
            </Html>
        );
    }
}

export default MyDocument;

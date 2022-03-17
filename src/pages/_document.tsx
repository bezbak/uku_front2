import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head></Head>
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

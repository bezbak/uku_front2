import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";

class MyDocument extends Document {
    ym() {
        return "<noscript><div><img src='https://mc.yandex.ru/watch/88273965' style='position:absolute; left:-9999px;' alt='' /></div></noscript>\
          <script type='text/javascript' >\
       (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}\
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\
       (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')\
     ym(88273965, 'init', {\
        clickmap:true,\
        trackLinks:true,\
        accurateTrackBounce:true,\
        webvisor:true\
   })\
</script>";
    }
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
                    <div dangerouslySetInnerHTML={{ __html: this.ym() }} />
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

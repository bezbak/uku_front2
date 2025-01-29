import Head from "next/head";
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    item?: any | null; // Можно уточнить тип item
}

export default function Layout({ children, item }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{item?.description} uku.kg</title>
                <meta name="description" content="【uku.kg】 Крупнейший сайт для размещения бесплатных объявлений ➤ Кыргызстан ❱❱❱ 〚Актуальные объявления по темам〛▷ Недвижимость ➦ Транспорт ➦ Электроника ➦ Работа ➦ Услуги ➦ Дом и Сад ➦ Животные ➤ Кыргызстан ᐉ Сервис бесплатных частных и бизнес объявлений от uku.kg!" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="google" content="notranslate" />
                <meta name="keywords" content="новости, лента, обновления" />
                <meta name="robots" content="all" />
                <meta property="og:title" content="uku.kg" />
                <meta property="og:description" content="【uku.kg】 Крупнейший сайт для размещения бесплатных объявлений ➤ Кыргызстан ❱❱❱ 〚Актуальные объявления по темам〛▷ Недвижимость ➦ Транспорт ➦ Электроника ➦ Работа ➦ Услуги ➦ Дом и Сад ➦ Животные ➤ Кыргызстан ᐉ Сервис бесплатных частных и бизнес объявлений от uku.kg!" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/_logo.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/_logo.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/_logo.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/images/_logo.png" />
                <meta property="og:url" content="https://uku.kg/" />
                <link rel="canonical" href="https://uku.kg/" />
            </Head>
            <main className="main">{children}</main>
            <style jsx>{`
                .main {
                    position: relative;
                }
            `}</style>
        </>
    );
}

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
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="google" content="notranslate" />
                <meta name="keywords" content="автомобили, мотоциклы, грузовики, автобусы, спецтехника, водный транспорт, запчасти, аксессуары, квартиры, дома, земельные участки, коммерческая недвижимость, аренда, продажа, ремонт, строительство, перевозки, обучение, юридические услуги, медицинские услуги, красота и здоровье, мебель, бытовая техника, посуда, инструменты, растения, садовый инвентарь, мобильные телефоны, компьютеры, телевизоры, аудиотехника, игровые приставки, фото- и видеотехника, вакансии, резюме, поиск работы, предложения работы, одежда, обувь, аксессуары, косметика, парфюмерия, детские товары, спортивный инвентарь, велосипеды, музыкальные инструменты, книги, коллекционирование, собаки, кошки, птицы, рыбы, грызуны, зоотовары, услуги для животных, торговое оборудование, производственное оборудование, офисная техника, инструменты, игрушки, детская одежда, коляски, автокресла, детская мебель, медицинское оборудование, ортопедические товары, средства ухода, реабилитационное оборудование"/>
                <meta name="robots" content="all" />
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

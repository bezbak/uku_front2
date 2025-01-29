import { NextApiRequest, NextApiResponse } from "next";
import { getServerSideSitemap } from "next-sitemap";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const siteUrl = "https://uku.kg";
    
    // Пример динамических страниц (замени на реальные данные)
    const dynamicRoutes = [
        { loc: `${siteUrl}/post/1`, lastmod: new Date().toISOString() },
        { loc: `${siteUrl}/post/2`, lastmod: new Date().toISOString() }
    ];

    // Основные статические страницы
    const staticRoutes = [
        { loc: `${siteUrl}/`, lastmod: new Date().toISOString() },
        { loc: `${siteUrl}/about`, lastmod: new Date().toISOString() },
        { loc: `${siteUrl}/contact`, lastmod: new Date().toISOString() }
    ];

    // Объединяем все ссылки
    const fields = [...staticRoutes, ...dynamicRoutes];

    return getServerSideSitemap(req, res, fields);
}

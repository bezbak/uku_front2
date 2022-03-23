/** @type {import('next').NextConfig} */
const API_URL =
    process.env.APP_ENV === "prod"
        ? "https://api.uku.kg/"
        : "http://test.api.uku.kg/";
module.exports = {
    reactStrictMode: true,
    trailingSlash: false,
    async rewrites() {
        return [
            {
                source: "/api/v1/publication/user/:slug/publications",
                destination: `${API_URL}/api/v1/publication/user/:slug/publications`,
            },
            {
                source: "/api/v1/publication/user/:slug",
                destination: `${API_URL}/api/v1/publication/user/:slug`,
            },
            {
                source: "/api/v1/account/favorite/:slug",
                destination: `${API_URL}/api/v1/account/favorite/:slug`,
            },
            {
                source: "/api/v1/:slug*",
                destination: `${API_URL}api/v1/:slug*/`,
            },
        ];
    },
};

/** @type {import('next').NextConfig} */
const API_URL = "https://api.uku.kg/"
module.exports = {
    reactStrictMode: true,
    trailingSlash: true,
    ignoreBuildErrors: true,
    async rewrites() {
        return [
            {
                source: "/api/v1/publication/user/:slug/publications/",
                destination: `${API_URL}/api/v1/publication/user/:slug/publications`,
            },
            {
                source: "/api/v1/publication/user/:slug/",
                destination: `${API_URL}/api/v1/publication/user/:slug`,
            },
            {
                source: "/api/v1/account/favorite/:slug",
                destination: `${API_URL}/api/v1/account/favorite/:slug`,
            },
            {
                source: "/api/v1/system/complaint/:slug/",
                destination: `${API_URL}/api/v1/system/complaint/:slug`,
            },
            {
                source: "/api/v1/:slug*",
                destination: `${API_URL}api/v1/:slug*/`,
            },
        ];
    },
};

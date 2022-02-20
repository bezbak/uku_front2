/** @type {import('next').NextConfig} */
const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://test.api.uku.kg/"
        : "https://api.uku.kg/";
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/v1/:slug*",
                destination: `${API_URL}api/v1/:slug*/`,
            },
        ];
    },
    trailingSlash: true,
};

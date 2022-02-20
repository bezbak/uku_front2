module.exports = {
    presets: [
        "next/babel",
        ["@babel/preset-react", { runtime: "automatic" }],
        [
            "@babel/preset-typescript",
            {
                allowDeclareFields: true,
            },
        ],
    ],
    plugins: [
        "babel-plugin-transform-typescript-metadata",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-proposal-class-properties",
    ],
};

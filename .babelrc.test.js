module.exports = {
    presets: [
        "@babel/preset-react",
        ["@babel/preset-typescript"],
        "linaria/babel",
    ],
    plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "babel-plugin-dynamic-import-node",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-proposal-class-properties",
    ],
};

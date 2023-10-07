export const path = require('path');
const resolve = (dir: string) => path.resolve(__dirname, dir);
const { addAfterLoader, loaderByName } = require("@craco/craco");

const sassResourcesLoader = {
    loader: require.resolve("sass-resources-loader"),
    options: {
        resources: [resolve("src/styles/index.scss")]
    }
};

module.exports = {
    webpack: {
        alias: {
            '@components': resolve('src/components'),
            '@hooks': resolve('src/hooks'),
            '@utils': resolve('src/utils')
        },
        configure: (webpackConfig: any) => {
            addAfterLoader(webpackConfig, loaderByName("sass-loader"), sassResourcesLoader);
            return webpackConfig;
        }
    }
};

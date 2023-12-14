const { override, addLessLoader, addWebpackAlias, adjustStyleLoaders } = require('customize-cra');
const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = override(
    addWebpackAlias({
        '@': resolve('src'),
        '@components': resolve('src/components'),
        '@hooks': resolve('src/hooks'),
        '@utils': resolve('src/utils'),
        '@styles': resolve('src/styles'),
        '@store': resolve('src/redux-store'),
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            // localIdentName: '[name]__[local]--[hash:base64:8]' // 生成的隔离类名格式 但是未生效
            localIdentName: '[local]--[hash:base64:5]' // 默认格式
        }
    }),
    // 解决 PostCSS Loader has been initialized using an options object that does not match the API schema.
    adjustStyleLoaders(({ use: [, , postcss] }) => {
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
    }),
    (config) => {
        const loaders = config.module.rules[1].oneOf;
        // loader 位置需要根据自己项目版本的情况进行调整
        loaders[10].use.push({
            loader: 'style-resources-loader',
            options: {
                patterns: path.resolve(__dirname, 'src/styles/globalVars.less')//全局引入公共的scss 文件
            }
        })
        return config
    }
);

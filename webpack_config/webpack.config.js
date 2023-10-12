const path = require('path');
const { merge } = require('webpack-merge'); //1.加载工具
const devConfig = require('./webpack.dev.js'); //2.获取通用配置
const prodConfig = require('./webpack.prod.js'); //2.获取通用配置
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV

// console.log('环境变量：', env,)

const commonConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    // 配置默认后缀
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.svg']
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    // 自定义 Loader
                    // {
                    //     loader: path.resolve(__dirname, './custom-loaders/my-style-loader.js'),
                    //     options: {
                    //         loaderName: 'custom-loader'
                    //     }
                    // },
                    // path.resolve(__dirname, './custom-loaders/my-style-loader.js'),
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                // webpack 4 写法，webpack 5 已弃用
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             name: '[path]photo[hash:6].[ext]',
                //             limit: 1024 * 8
                //         }
                //     },
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: 'photo[hash:6].[ext]',
                //             // outputPath: './asset'
                //         }
                //     }
                // ]
                // webpack 5
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 2 * 1024
                    }
                },
                generator: {
                    filename: 'asset/imgs/[name][hash:6][ext]',
                    //打包后对资源的引入，文件命名已经有/img了
                    publicPath: './'
                }
            },
            {
                //打包其他资源(除了css、js、html、less、jpg、png、gif)资源以外的资源)
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 处理字体图标
                exclude: /\.(css|js|html|less|jpg|png|gif)$/, // 排除css、js、html、less、jpg、png、gif资源
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: './asset/fonts'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            title: "看到这里就成功了"
        }),
        // 调用清除打包目录插件
        // new CleanWebpackPlugin()
    ],
    mode: env
}

// console.log(commonConfig);

module.exports = merge(env === 'development' ? devConfig : prodConfig, commonConfig)

// module.exports = merge(env === 'development' ? devConfig : prodConfig, async (env, options) => {
//     console.log(env, options);
//     const commonConfig = {
//         entry: './src/index.js',
//         output: {
//             filename: 'bundle.js',
//             path: path.resolve(__dirname, './dist')
//         },
//         // 配置默认后缀
//         resolve: {
//             extensions: ['.ts', '.tsx', '.js', '.json', '.svg']
//         },
//         module: {
//             rules: [
//                 {
//                     test: /.css$/,
//                     use: ['style-loader', 'css-loader']
//                 },
//                 {
//                     test: /.png$/,
//                     // webpack 4 写法，webpack 5 已弃用
//                     // use: [
//                     //     {
//                     //         loader: 'url-loader',
//                     //         options: {
//                     //             name: '[path]photo[hash:6].[ext]',
//                     //             limit: 1024 * 8
//                     //         }
//                     //     },
//                     //     {
//                     //         loader: 'file-loader',
//                     //         options: {
//                     //             name: 'photo[hash:6].[ext]',
//                     //             // outputPath: './asset'
//                     //         }
//                     //     }
//                     // ]
//                     // webpack 5
//                     type: 'asset',
//                     parser: {
//                         dataUrlCondition: {
//                             maxSize: 2 * 1024
//                         }
//                     },
//                     generator: {
//                         filename: 'imgs/[name][hash:6][ext]',
//                         //打包后对资源的引入，文件命名已经有/img了
//                         publicPath: './'
//                     }
//                 },
//                 {
//                     test: /\.html$/,
//                     loader: 'html-loader',
//                 }
//             ]
//         },
//         plugins: [
//             new HtmlWebpackPlugin({
//                 filename: 'index.html',
//                 template: 'src/index.html',
//                 title: "看到这里就成功了"
//             }),
//             // 调用清除打包目录插件
//             // new CleanWebpackPlugin()
//         ],
//         mode: env
//     }
//     return commonConfig
// })

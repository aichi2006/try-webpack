var path = require('path');
var webpack = require('webpack');
var vueLoaderPlugin = require('vue-loader/lib/plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill','./src/main.js'],
    output: {
        path: path.resolve(__dirname,'./dist'),    //项目的打包文件路径
        publicPath: '/dist/',    //通过devserver访问路径
        filename: 'build.js',    //打包后的文件名
        
    },
    devtool: '#eval-source-map',
    plugins: [
        new vueLoaderPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        overlay: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }
        ]
    }
}

//根据环境变量 压缩代码
if(process.env.NODE_ENV === 'production'){
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin()
        //new webpack.optimize.UglifyJsPlugin(),
    ]);
    /*optimization: {
        minimizer: [
          new UglifyJsPlugin()
        ]
      }*/
}
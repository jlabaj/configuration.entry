// See angular2-webpack-starter:https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.common.js

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const helpers = require('./helpers');

const IISFILESDIRECTORY = 'webpackVsIIsFiles';
const WDSFILESDIRECTORY = 'webpackDevServerFiles';

module.exports = function (options) {
    isProd = options.env === 'production';
    serv = options.serv;
    return {
        devServer: {
            noInfo: false,
            stats: { colors: true },
            open: true,            
            contentBase: helpers.root(),       
            compress: true,
            progress: true,
            port: 56618,
            hot: true,
            //inline: true,
            historyApiFallback: {
                verbose: true,
                index: 'app.html',
                disableDotRule: true
            },
        },
        resolve: {
            extensions: ['.ts', '.js', 'css'],
        },
        entry: {
            //main: helpers.root('main.ts'),
            //polyfills: helpers.root('polyfills.ts'),
            //vendors: helpers.root('vendor.ts')

            main: [helpers.root('main.ts'), "webpack-dev-server/client?http://localhost:56618/", "webpack/hot/dev-server"],
            polyfills: [helpers.root('polyfills.ts'), "webpack-dev-server/client?http://localhost:56618/", "webpack/hot/dev-server"],
            vendors: [helpers.root('vendor.ts'), "webpack-dev-server/client?http://localhost:56618/", "webpack/hot/dev-server"]
        },
        output: {
            path: helpers.root('dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].bundle.map',
            publicPath: '/dist',
        },
        module: {
            loaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: /node_modules/,
                exclude: [helpers.root('node_modules/rxjs'), helpers.root('node_modules/@angular'), helpers.root('node_modules/primeng')]
            },
            {
                test: /\.ts$/,
                loaders: [
                    '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.(html)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.css$/,
                loader: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
            ],
        },
        plugins: [
            /*
           * Plugin: ForkCheckerPlugin
           * Description: Do type checking in a separate process, so webpack don't need to wait.
           *
           * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
           */
            new ForkCheckerPlugin(),
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.root('app'), // location of your src
                {
                    // your Angular Async Route paths relative to this root directory
                }
              ),
            new webpack.optimize.CommonsChunkPlugin({
                minChunks: Infinity,
                name: 'commons',
                filename: 'commons.bundle.js',
                sourceMapFilename: 'commons.bundle.map'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            //new HtmlElementsPlugin({
            //    headTags: require('./head-config.common')
            //}),
            /**
            * Plugin LoaderOptionsPlugin (experimental)
            *
            * See: https://gist.github.com/sokra/27b24881210b56bbaff7
            */
            new LoaderOptionsPlugin({}),
            // Fix Angular 2
            new NormalModuleReplacementPlugin(
            /facade(\\|\/)async/,
            helpers.root('node_modules/@angular/core/src/facade/async.js')
            ),
            new NormalModuleReplacementPlugin(
            /facade(\\|\/)collection/,
            helpers.root('node_modules/@angular/core/src/facade/collection.js')
            ),
            new NormalModuleReplacementPlugin(
            /facade(\\|\/)errors/,
            helpers.root('node_modules/@angular/core/src/facade/errors.js')
            ),
            new NormalModuleReplacementPlugin(
            /facade(\\|\/)lang/,
            helpers.root('node_modules/@angular/core/src/facade/lang.js')
            ),
            new NormalModuleReplacementPlugin(
            /facade(\\|\/)math/,
            helpers.root('node_modules/@angular/core/src/facade/math.js')
            ),
        ],
        node: {
            global: true,
            process: true,
            Buffer: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false,
            clearTimeout: true,
            setTimeout: true
        }
    }
};
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'developement';
const SERV = 'WDS';
const METADATA = webpackMerge(commonConfig({ env: ENV, serv: SERV }).metadata, {
    ENV: ENV,
    SERV: SERV
});

module.exports = function (options) {
    return webpackMerge(commonConfig({ env: ENV, serv: SERV }), {
         /**
         * Developer tool to enhance debugging
         *
         * See: http://webpack.github.io/docs/configuration.html#devtool
         * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
         */
        devtool: 'cheap-module-source-map',
        plugins: [
          /**
           * Plugin: DefinePlugin
           * Description: Define free variables.
           * Useful for having development builds with debug logging or adding global constants.
           *
           * Environment helpers
           *
           * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
           */
          // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
          new DefinePlugin({
              'ENV': JSON.stringify(METADATA.ENV),
              'SERV': METADATA.SERV,
              'process.env': {
                  'ENV': JSON.stringify(METADATA.ENV),
                  'NODE_ENV': JSON.stringify(METADATA.ENV),
                  'SERV': METADATA.SERV,
              }
          }),
      ]
    })
};
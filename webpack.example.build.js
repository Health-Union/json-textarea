const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

config.entry = './example/main.js';
config.output = {
    path: path.resolve(__dirname, './example/dist/'),
    // publicPath: '',
    filename: 'JSONTextArea.js',
    library: 'JSONTextArea',
    libraryTarget: 'umd',
};

// config.devtool = 'source-map';

config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),
    new MinifyPlugin({}, {
        sourceMap: false,
        compress: {
            warnings: false,
        },
        comments: false,
    })
]);

config.resolve = {
    alias: {
        vue$: 'vue/dist/vue.esm.js',
    },
};

module.exports = config;
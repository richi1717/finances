var webpack = require('webpack');
var stylelint = require('stylelint');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist/',
        filename: 'cf_bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap?root=.", "sass?sourceMap"]
            },
            {
                test: /\.svg$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    postcss: function() {
        return [stylelint({
            extends: ["./.stylelintrc"]
        })];
    }
}

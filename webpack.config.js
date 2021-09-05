const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/scripts/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        new CopyPlugin({
            patterns: [{
                from: 'src/index.html',
                to: 'index.html',
            }],
        }),
    ],
};

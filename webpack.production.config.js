const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

loaders.push(
    {
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?!sass-loader?outputStyle=compressed'
        }),
        test: /\.scss$/
    },
    {
        exclude: [/node_modules/],
        loader: 'babel-loader',
        test: /\.js$/
    }
);

module.exports = {
    entry: [
        '@babel/polyfill',

        './src/index.jsx',
        './src/style/index.scss'
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: '[chunkhash].js'
    },
    resolve: {
        extensions:
            [
                '.js',
                '.jsx'
            ]
    },
    module: { rules: loaders },
    devtool: 'source-map',
    optimization: { minimize: true },
    performance: { hints: false },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BABEL_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: 'style.[chunkhash].css',
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip',
            compressionOptions: { level: 1 },
            filename: '[path].gz[query]',
            minRatio: 0,
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            files: {
                css: ['style.css'],
                js: ['[chunkhash].js']
            }
        }),
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, 'public/pwa/'),
                to: resolve(__dirname, 'dist/')
            }
        ])
    ]
};

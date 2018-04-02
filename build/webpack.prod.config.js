const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

//腾讯云cos
const CosPlugin = require('cos-webpack');

const cosPlugin = new CosPlugin({
    secretId: 'AKIDNgpoc8V2JOI1jNiDOelkaIpBUcYJof8P',
    secretKey: 'Vs34zjrxugGeru6FE1wnUCqJBtRnyBIE',
    bucket: 'shopadmin-1254386949',
    //bucket: 'dev-1254386949',
    region: 'ap-guangzhou',
    path: '/'
});

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: 'https://shop.admin.htmlk.cn/dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        cosPlugin,
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            favicon: './td_icon.ico',
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ]
});
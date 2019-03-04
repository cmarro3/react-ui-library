const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pkg = require('./package.json');
const path = require('path');

const files = [
    {
        entry: path.join(__dirname, "./src/components"),
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'CheaprEatsStoryBook.js',
            library: pkg.name,
            libraryTarget: 'umd',
            publicPath: '/dist/',
            umdNamedDefine: true
        },
    },
    {
        entry: path.join(__dirname, "./src/components/preview"),
        output: {
            path: path.join(__dirname, './dist/preview'),
            filename: 'index.js',
            library: pkg.name,
            libraryTarget: 'umd',
            publicPath: '/dist/preview/',
            umdNamedDefine: true
        },
    },
];
const config = {
    plugins: [
        new MiniCssExtractPlugin()
    ],
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    module: {
        rules : [
            {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options:{
                        fallback: "file-loader",
                        name: "[name][md5:hash].[ext]",
                        outputPath: 'assets/',
                        publicPath: '/assets/'
                    }
                }
            ]
        },
        {
            test: /\.*css$/,
            use : [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.(js|jsx)$/,
            use: ["babel-loader"],
            include: path.resolve(__dirname, "src"),
            exclude: /node_modules/,
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: ["file-loader"],
        },
        {
            test: /\.(pdf|doc|zip)$/,
            use: ["file-loader"],
        }]
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react') ,
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'assets': path.resolve(__dirname, 'assets')
        }
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        },
        "styled-components": {
            commonjs: "styled-components",
            commonjs2: "styled-components",
            amd: "styled-components",
        },
    }
};

module.exports = files.map(file => ({
    ...config,
    ...file
}))
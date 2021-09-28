const path = require('path');
const pkg = require('../package.json');

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rootPath = "../dist";
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
]

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, rootPath),
        filename: `${pkg.name}.js`,
        chunkFilename: '[name].[chunkhash].js',
        library: `${pkg.name}`,
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            }
        ]
    },
    plugins
};
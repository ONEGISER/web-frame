const path = require('path');
module.exports = (env, argv) => {
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const { mode } = argv
    const isDev = mode === "development"
    const rootPath = "../build";
    const prodPlugins = [
        new CleanWebpackPlugin(),
    ]
    const publicPlugins = [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: true,
        }),
        new MiniCssExtractPlugin()
    ]
    const plugins = isDev ? publicPlugins : publicPlugins.concat(prodPlugins)
    return [{
        mode,
        entry: './test/index.js',
        output: {
            path: path.resolve(__dirname, rootPath),
            filename: "[name].[chunkhash].js",
            chunkFilename: '[name].[chunkhash].js',
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx',
                '.ts',
                '.tsx'
            ]
        },
        devServer: {
            static: {
                directory: path.join(__dirname, rootPath),
            },
            compress: true,
            port: 9000,
            hot: true
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
    }]
};
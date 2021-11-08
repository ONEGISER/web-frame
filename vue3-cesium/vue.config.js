module.exports = {
    configureWebpack: {
        externals: {
            'cesium': 'Cesium',
        },
        devServer: {
            proxy: {
                '/iserver/services/': { target: 'http://support.supermap.com.cn:8090', secure: false, changeOrigin: true, },
            }
        }
        // resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },  
        // module: {
        //     rules: [
        //         {
        //             test: /\.tsx?$/,
        //             loader: 'ts-loader',
        //             exclude: /node_modules/,
        //             options: {
        //                 appendTsSuffixTo: [/\.vue$/],
        //             }
        //         }
        //     ]
        // }
    }
}
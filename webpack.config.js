const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, '/assets'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/'
    },
    resolve: {
        alias: {
            semantic: path.resolve(__dirname, 'semantic/src/'),
            jquery: path.resolve(__dirname, 'node_modules/jquery/src/jquery')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx|\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['env'] }
                }
            },
            {
                test: /\.(png|gif)$/,
                loader: 'url-loader?limit=1024&name=[name]-[hash:8].[ext]!image-webpack-loader'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {   
                // import css from 'foo.less';
                test: /\.less$/, 
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: './',
        port: 8080,
        noInfo: false,
        hot: true,
        inline: true,
        proxy: { '*': { bypass: () => '/assets/index.html' } }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'global.jQuery': 'jquery',
            'window.jQuery': 'jquery',
        })
    ]
};
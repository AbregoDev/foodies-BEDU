const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/js/index.js','./src/js/search.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',            
        }),
        new HtmlWebpackPlugin({
            filename: 'recipeDetail.html',
            template: './src/pages/recipeDetail/recipeDetail.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'recipeRegion.html',
            template: './src/pages/recipeRegion/recipeRegion.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'search.html',
            template: './src/pages/search.html',            
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$i/,
                loader: 'html-loader',
            },
        ],
    },
};
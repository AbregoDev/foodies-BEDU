const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        recipe: './src/pages/recipeDetail/recipeDetail.js',
        region: './src/pages/recipeRegion/recipeRegion.js',
        searchResult: './src/pages/searchResult/searchResult.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'recipeDetail.html',
            template: './src/pages/recipeDetail/recipeDetail.html',
            chunks: ['recipe'],
        }),
        new HtmlWebpackPlugin({
            filename: 'recipeRegion.html',
            template: './src/pages/recipeRegion/recipeRegion.html',
            chunks: ['region'],
        }),
        new HtmlWebpackPlugin({
            filename: 'searchResult.html',
            template: './src/pages/searchResult/searchResult.html',            
            chunks: ['searchResult'],
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
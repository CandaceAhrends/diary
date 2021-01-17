const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: ["./src/utils.js", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "prod-build"),
    filename: "bundle.prod.js",
    publicPath: '/diary/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"

        },

      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      publicPath: '/diary/',
      template: './index-template.ejs',
      inject: 'body',
    })
  ],


};

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: 'eval-source-map',
  entry: ["./src/utils.js", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "diet"),
    filename: "bundle.js",
    publicPath: '/diet/'
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
      publicPath: '/diet/',
      title: 'Diet Analyzer',
      base: { 'href': '/diet' },
      meta: { viewport: 'width=device-width, user-scalable=no' },
      templateContent: '<div id="container"></div>'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'diet/'),
    hot: true,
    compress: true,
    port: 9000,
    publicPath: '/diet/'
  }
};
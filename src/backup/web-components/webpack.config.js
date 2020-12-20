const path = require("path");

module.exports = {

  entry: ["./index.js"],
  output: {
    path: path.resolve(__dirname, "publish"),
    filename: "search-wc.js"
     
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  }
};

"use strict";

const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./js/script.mjs",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "./index.html",
  //     filename: "index.html",
  //   }),
  // ],
};

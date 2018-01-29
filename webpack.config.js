const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BASE_PATH =  path.resolve(__dirname);

module.exports = {
  entry: BASE_PATH+"/webpack/entry.js",
  output: {
    path: BASE_PATH+"/assets/js/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2017"]
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("../css/styles.css"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
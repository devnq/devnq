const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_PATH =  path.resolve(__dirname);

module.exports = {
  mode: 'production',
  entry: BASE_PATH+"/webpack/entry.js",
  output: {
    path: BASE_PATH+"/assets/js/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                  targets: "> 0.25%, not dead"
                }
              ]
            ]
          }
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/styles.css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
};
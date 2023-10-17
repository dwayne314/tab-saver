const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "public", "manifest.json"),
          to: path.resolve(__dirname, "build"),
        },
        {
          from: path.resolve(__dirname, "src", "public", "images"),
          to: path.resolve(__dirname, "build", "images"),
        },
      ],
    }),
  ],
});

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "app.[chunkhash:8].js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [require("cssnano")],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "src/index.html" }),
    new MiniCssExtractPlugin({ filename: "[name].[hash:8].css" }),
    new CleanWebpackPlugin(),
  ],
};
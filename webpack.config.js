const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const SMP = new SpeedMeasurePlugin()

const isDevelopment = process.env.NODE_ENV === "development";

// module.exports= SMP.wrap({})
module.exports = {
  mode: process.env.NODE_ENV,
  entry: { index: "./src/index.js" },
  // devtool: 'source-map',
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/, // 獨立出來
          name: "vendor",
          chunks: "initial",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/typescript",
              "@babel/preset-react",
              "@babel/preset-env",
            ],
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerHost: "127.0.0.1",
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./index.html" }),
  ].filter(Boolean),
};

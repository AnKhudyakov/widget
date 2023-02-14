const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const { fileURLToPath, URL } = require('url');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src')
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
});

const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /\/node_modules/
      })]
    }
  }
}
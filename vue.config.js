const webpack = require('webpack')

module.exports =  {
  devServer: {
    overlay: {
        warnings: false,
        errors: false
    },
  },

  lintOnSave: false,
  productionSourceMap: false,
  publicPath: "./"
}
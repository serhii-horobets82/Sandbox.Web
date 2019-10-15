const webpack = require("webpack");
module.exports = {
  devServer: {
    allowedHosts: ["intel.evoflare.com", "hp.evoflare.com", "hp.evoflare.com", "whirlpool.evoflare.com"]
  },
  configureWebpack: config => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          APPLICATION_VERSION: JSON.stringify(require("./package.json").version)
        })
      ]
    };
  }
};

//Important: Set the env to either development or production to use the appropriate config
/****************************************/
const env = "development"; // 'development' or 'production'
/*******************************************/
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const development = {
  // publicPath: "http://localhost:9443/flair-client",

  devServer: {
    open: process.platform === "darwin",
    port: 9091, // CHANGE YOUR PORT HERE!
    https: false,
    disableHostCheck: true,
    //  proxy: "http://localhost:9443/flair-client",
  },
};

const production = {
  publicPath: "https://localhost:9091",
  devServer: {
    open: process.platform === "darwin",
    port: 9091, // CHANGE YOUR PORT HERE!
    https: false,
    disableHostCheck: true,
    proxy: "https://localhost:9091",
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin({ reportFilename: "FlairTreeMap" })],
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];

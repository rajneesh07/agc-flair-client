//Important: Set the env to either development or production to use the appropriate config
/****************************************/
const env = "production"; // 'development' or 'production'
/*******************************************/

const development = {
  devServer: {
    //open: process.platform === 'darwin',
    publicPath: "/softphone/",
    port: 9092, // CHANGE YOUR PORT HERE!
    https: true,
    disableHostCheck: true,
    proxy: "https://cticonnector.oberoirealty.com/softphone",
  },
};

const production = {
  publicPath: "https://cticonnector.oberoirealty.com/softphone",
  devServer: {
    open: process.platform === "darwin",
    port: 8083, // CHANGE YOUR PORT HERE!
    https: true,
    disableHostCheck: true,
    proxy: "https://cticonnector.oberoirealty.com/softphone",
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];

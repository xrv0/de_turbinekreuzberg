module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 7545,
      gas: 8000000,
      gasPrice: 5e9,
      networkId: '*',
    },
  },
};

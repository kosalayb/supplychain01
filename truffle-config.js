module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // connect to Ganache
      port: 7545,
      network_id: 5777 //or "*" for any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}



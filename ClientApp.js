// ClientApp.js
// A simple client, connects to Blockchain and request market data.
//
var CoinMarketOracleContract = require('./build/contracts/CoinMarketOracle.json')
var contract = require('truffle-contract')

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://localhost:8545'));

var oracleContract = contract(CoinMarketOracleContract)
oracleContract.setProvider(web3.currentProvider)

if (typeof oracleContract.currentProvider.sendAsync !== "function") {
  oracleContract.currentProvider.sendAsync = function() {
    return oracleContract.currentProvider.send.apply(
      oracleContract.currentProvider, arguments
    );
  };
}

web3.eth.getAccounts((err, accounts) => {
  oracleContract.deployed()
  .then((oracleInstance) => {

    // Build List of function calls to oracle
    const oracleCalls = [
      oracleInstance.getCapVaule('2781'),  // Get Current Value for USD
      oracleInstance.updateCoinMarket('2781' {from: accounts[0]}) // Submits a call for update
    ]

    // Map over all promises
    Promise.all(oracleCalls)
    .then((result) => {
      console.log('Data: ' + result[0])
      console.log('Submitting request for data update.....')
    })
    .catch((err) => {
      console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

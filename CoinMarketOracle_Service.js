// CoinMarketOracle_Service.js
//  Oracle Service (listens for contract events)
//
var fetch = require('fetch')
var Web3 = require('web3');
var CoinMarketOracleContract = require('./build/contracts/CoinMarketOracle.json')
var contract = require('truffle-contract')

var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

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
    // Listen for contract events
    oracleInstance.CoinMarketUpdateRequest()
    .watch((err, event) => {
      // Fetch lastest data
      fetch.fetchUrl('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', (err, m, b) => {
        const rData = JSON.parse(b.toString())
        const capValue = parseInt(rData.data.data.quote.USD)

        // Invoke oracle contract function to update the data
        oracleInstance.setCapValue('2781', capValue, {from: accounts[0]})
      })
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

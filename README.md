# Final Assignment - A Simple Oracle

 - Mohammad Jamshed Qureshi
 - GBC Student: 101260567
 - Program: T175 Blockchain Development Fall 2019)

# Introduction

This is a simple implementation of a Ethererum Oracle, it provides bitcoin market cap data using Coin Market Cap API V1 (https://coinmarketcap.com/api/documentation/v1/).

# Assumptions

- For test purposes it only implements Coin Market Cap - Latest global metrics. [Global-Metrics] (https://coinmarketcap.com/api/documentation/v1/#tag/global-metrics)
- API is called with USD conversion only.

# Dependencies

- Truffle
- Ganache or testrpc
- Nodejs
- web3

# Run Tests

- Start private testnet e.g. using testrpc or ganache
- Configure truffle.js file if required.
- `truffle test` from the repo directory

# Run Oracle Service and Client App

- Start your private test network
- Configure *truffle.js*
- Run `truffle compile`
- Run `truffle migrate`
- Run `node CoinMarketOracle_Service.js`
- Run client app to request and fetch market data from oracle
`node ClientApp.js`

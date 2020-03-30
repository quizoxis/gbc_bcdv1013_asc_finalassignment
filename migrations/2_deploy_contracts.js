const CoinMarketOracleContract = artifacts.require("CoinMarketOracle");

module.exports = function(deployer) {
  deployer.deploy(CoinMarketOracleContract);
}

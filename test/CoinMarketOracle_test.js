const CoinMarketOracleContract = artifacts.require("CoinMarketOracle");

contract("CoinMarketOracle", () => {

  it("has been deployed successfully", async () => {
    const c = await CoinMarketOracleContract.deployed();
    assert(c, "contract was not deployed");
  });

  describe("owner()", () => {
    it("returns owner's address", async () => {
      const c = await CoinMarketOracleContract.deployed();
      const owner = await c.owner();

      assert(owner, "the current owner");
    });
  });

  describe("getCapVaule()", () => {
    it("returns 'Zero'", async () => {
      const c = await CoinMarketOracleContract.deployed();
      const expected = "0";
      const actual = await c.getCapVaule('2781');
      assert.equal(actual, expected, "value is null");
    });
  });

});

contract("Oracle: update CoinMarketCap Data", () => {
  describe("updateCoinMarket(integer)", () => {
    it("Triggers Oracle event to update data", async () => {
      const c = await CoinMarketOracleContract.deployed()
      const expected = "0";

      await c.updateCoinMarket('2781');
      const actual = await c.getCapVaule('2781');

      assert.equal(actual, expected, "market data was not updated");
    });
  });
});

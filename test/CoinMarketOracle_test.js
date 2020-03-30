const CoinMarketOracleContract = artifacts.require("CoinMarketOracle");

contract("CoinMarketOracle",(accounts) => {

  it("has been deployed successfully", async () => {
    const c = await CoinMarketOracleContract.deployed();
    assert(c, "contract was not deployed");
  });

  describe("getCapVaule()", () => {
    it("returns 'Zero'", async () => {
      const c = await CoinMarketOracleContract.deployed();
      const expected = "0";
      const actual = await c.getCapVaule('2781');
      assert.equal(actual, expected, "value is null");
    });
  });

  describe("owner()", () => {
    it("returns owner's address", async () => {
      const c = await CoinMarketOracleContract.deployed();
      const owner = await c.owner();

      assert(owner, "the current owner");
    });

    it("validates deployer address is same as owner address", async () => {
      const c = await CoinMarketOracleContract.deployed();
      const ownerAddr = await c.owner();
      const expected = accounts[0];

      assert.equal(ownerAddr, expected, "deployer and owner adresses are the same");
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

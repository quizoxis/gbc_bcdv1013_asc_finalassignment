pragma solidity ^0.4.24;

contract CoinMarketOracle {

  address public owner;
  bool internal online;

  mapping (uint => uint ) private CoinMarketCap;

  modifier onlyOwner(){
    require(msg.sender == owner);
    _;
  }

  modifier isOnline() {
    require(online == true, 'Oracle is currently offline!');
    _;
  }

  event CoinMarketUpdateRequest(address requestBy, uint capId);

  constructor() public {
      owner = msg.sender;
      online = true;
  }

  function getStatus() public view returns(bool) {
      return online;
  }
  function setOnline() public onlyOwner {
      online = true;
  }

  function setOffline() public onlyOwner {
      online = false;
  }


  function setCapValue(uint capId, uint capValue) public onlyOwner isOnline {
    CoinMarketCap[capId] = capValue;
  }

  function getCapVaule(uint capId) public view isOnline returns (uint) {
    return CoinMarketCap[capId];
  }

  function updateCoinMarket(uint capId) public returns(bool) {
    // emit update request event
    emit CoinMarketUpdateRequest(msg.sender,capId);
  }

}

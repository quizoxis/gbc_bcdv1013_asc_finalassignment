pragma solidity ^0.4.24;

contract CoinMarketOracle {

  address public _owner;
  bool internal _online;

  mapping (uint => uint ) private CoinMarketCap;

  modifier onlyOwner(){
    require(msg.sender == _owner);
    _;
  }

  modifier isOnline() {
    require(_online == true, 'Oracle is currently offline!');
    _;
  }

  event CoinMarketUpdateRequest(address requestBy, uint capId);

  constructor() public {
      _owner = msg.sender;
      _online = true;
  }

  function getStatus() public view returns(bool) {
      return _online;
  }
  function setOnline() public onlyOwner {
      _online = true;
  }

  function setOffline() public onlyOwner {
      _online = false;
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

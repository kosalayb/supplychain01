var Contract = artifacts.require("AssetTracking.sol");

module.exports = function(deployer) {
  deployer.deploy(Contract);
};
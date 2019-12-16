var Contract = artifacts.require("AdvancedStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(Contract);
};
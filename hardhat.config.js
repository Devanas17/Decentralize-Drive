require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
};

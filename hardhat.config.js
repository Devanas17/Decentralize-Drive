require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
    },
    matic: {
      url: process.env.MATIC_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
};

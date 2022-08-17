require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



module.exports = {
  solidity: "0.8.16",
  defaultNetwork: "Mainnet",
  networks: {
    hardhat: {},
    Mainnet: {
      url: process.env.NEXT_PUBLIC_API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

};

// 0x5ED9795B77D6722D3B0bE7DeCb0b834e2db5EBe0

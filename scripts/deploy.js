// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Moonknight = await hre.ethers.getContractFactory("Moonknight");
  const moonknight = await Moonknight.deploy(["0x2C9Ca5584734f78c5Ab4A0AeC69FFA46aB8d5AF9", "0xe8cC5F21DA0E68B49D9b23E807DE8D2aAa57e6F8"], ["80", "20"], "0x16afc301b9a6b2a663b581a250c848c37c1a5e1d2324b0089a85292da8fe1687", "ipfs://QmdtbvLVYDX3FxcYBsDcCaPd9hWCJ6cQXBxGWyLynbYQ2R/");

  await moonknight.deployed(["0x2C9Ca5584734f78c5Ab4A0AeC69FFA46aB8d5AF9", "0xe8cC5F21DA0E68B49D9b23E807DE8D2aAa57e6F8"], ["80", "20"], "0x16afc301b9a6b2a663b581a250c848c37c1a5e1d2324b0089a85292da8fe1687", "ipfs://QmdtbvLVYDX3FxcYBsDcCaPd9hWCJ6cQXBxGWyLynbYQ2R/");

  console.log("Moonknight deployed to:", moonknight.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

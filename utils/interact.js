const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_API_URL);

const contract = require("../artifacts/contracts/Moonknight.sol/Moonknight.json");
const contractAddress = "0x44bad4E59D166c0ea466693ba68BB0DCC673A0e8";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const proof = ["0x487e25a70cc68e9472970212531888a5179505c4c516c20f1073970a168ed328", "0xfea41f919cd7661d2266c346e2deffcfd9d3e1bbf9904546a9ef862559c75686", "0x3b4f37af1265fdea2c08f01566aa5e6fd609c5c8faf764b96b82f3cc4b13e84f", "0x01bff8e0ef68f27a3bbff5f974ac750f3c96ef8b0a73d667299cdc8ce8053c6a", "0x8447c7ada5a1bf6ee01dfbdd8b0d4ade1471ce082a1d7611839246bcd670fe1b", "0x42a7b7a4d03ffcac233c57bfb4791b2880c8fc4423fba0586f985d54c525e0ca", "0x9b231225f96aab434fc7e36ab0e6e63349066a20686574c60dfc84e7838e95a7", "0x6ce377194e0e08b07e629516727be455d8d80ec30513d48f160754ba17e7d5a0", "0x6bf093815f9b6a21a96b1f46fe64795784c2e9fa5072e5c8faedc356858472a7"];


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const obj = {
        status: "",
        address: addressArray[0],
      };

      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😞" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://metamask.io/download.html"
            >
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: ""
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😞" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://metamask.io/download.html"
            >
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

// Contract Methods

export const getMaxMintAmount = async () => {
  const result = await nftContract.methods.publicsaleMaxMint().call();
  return result;
};

export const getMaxmlMintAmount = async () => {
  const result = await nftContract.methods.mlsaleMaxMint().call();
  return result;
};

export const getTotalSupply = async () => {
  const result = await nftContract.methods.totalSupply().call();
  return result;
};

export const getNftPrice = async () => {
  const result = await nftContract.methods.publicSalePrice().call();
  const resultEther = web3.utils.fromWei(result, "ether");
  return resultEther;
};

export const getPresaleNftPrice = async () => {
  const result = await nftContract.methods.mlSalePrice().call();
  const resultEther = web3.utils.fromWei(result, "ether");
  return resultEther;
};


export const getWLSaleState = async () => {
  const result = await nftContract.methods.mlsaleIsActive().call();
  return result;
};

export const getSaleState = async () => {
  const result = await nftContract.methods.saleIsActive().call();
  return result;
};


export const publicSaleMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          🦊 Connect to Metamask using{" "}
          <span className="px-2 text-purple-600">Connect Wallet</span> button.
        </p>
      ),
    };
  }

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: parseInt(web3.utils.toWei("0.0066", "ether") * mintAmount).toString(
      16
    ), // hex
    gasLimit: "0",
    data: nftContract.methods.publicSaleMint(window.ethereum.selectedAddress, mintAmount).encodeABI(), //make call to NFT smart contract
  };
  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ethereum.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
  };


  //wlmint
  export const mlmint = async (mintAmount) => {
    if (!window.ethereum.selectedAddress) {
      return {
        success: false,
        status: (
          <p>
            🦊 Connect to Metamask using{" "}
            <span className="px-2 text-purple-600">Connect Wallet</span> button.
          </p>
        ),
      };
    }
  
    //set up your Ethereum transaction
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      value: parseInt(web3.utils.toWei("0", "ether") * mintAmount).toString(
        16
      ), // hex
      gasLimit: "0",
      data: nftContract.methods.whitelistMint(window.ethereum.selectedAddress, mintAmount, proof).encodeABI(), //make call to NFT smart contract
    };
    //sign the transaction via Metamask
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        success: true,
        status:
          "✅ Check out your transaction on Etherscan: https://ethereum.etherscan.io/tx/" +
          txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }

  

  
};



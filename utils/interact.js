const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_API_URL);

const contract = require("../artifacts/contracts/Moonknight.sol/Moonknight.json");
const contractAddress = "0x66208950e78E36050B193FC17efB7f7CED1A246A";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const proof = ["0x91c2d1c8acc74826844a73ba1391c1429dcf6583bf7472070991fc214f4613fb"];


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

export const getSaleState = async () => {
  const result = await nftContract.methods.saleIsActive().call();
  return result;
};

export const getWLSaleState = async () => {
  const result = await nftContract.methods.mlsaleIsActive().call();
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
    value: parseInt(web3.utils.toWei("0.006", "ether") * mintAmount).toString(
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
        "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
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
          "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
          txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }

  

  
};



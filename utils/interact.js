const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_API_URL);

const contract = require("../artifacts/contracts/Moonknight.sol/Moonknight.json");
const contractAddress = "0x9781e8F05bFEecF879209ed83695A14fd2854cD8";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const proof = ["0x1652f78d0f372fdb46183231a0f002ea74d3f1d4f54ad79483c6c26b1a94b461,0xc16fae8149eb6788ee42bef27fc335b80f19198a10c5ea225f4d40ec141b3344,0xfc1ee7a98429e85d247ce743ec06a71b67388a6e7cbb671d740ab57227ffad25,0xd66cb139bbed814373a71d57caf32e346004bb9977a774a36b64cebe81498c16,0xfdb872026a7f76296659840339b87e426da8c68462bfb7d9181c699031db48a6,0x0489cad91cbafcb90feb49cd713bac0e20f8bb97d43b6f59500ae35713b734e7,0x9fa2c1bb93615e88fef6736021cff83765f5bc70e19af13ed5c376eb1a91cf58,0x9da140acf89b70a2b9b98a92c8b8e1675acabdfc43ca339db368c81c8c68608b,0x232cb3cbb8ca03d17733364f7a05d04a085b6c34bca211cf1ac9db5d49dbe160"];


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



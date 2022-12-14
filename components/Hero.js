import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStatus } from "../context/statusContext";

import {
  getMaxMintAmount,
  getTotalSupply,
  getNftPrice,
  publicSaleMint,
  mlmint,
  getSaleState,
  getWLSaleState,
  getMaxmlMintAmount,
} from "../utils/interact";


const Hero = () => {
  const { status, setStatus } = useStatus();

  const [count, setCount] = useState(1);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [maxmlMintAmount, setMaxmlMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nftPrice, setNftPrice] = useState("0.0066");
  const [isWLSaleActive, setIsWLSaleActive] = useState(false);
  const [isSaleActive, setIsSaleActive] = useState(false);
  

  useEffect(() => {
    const prepare = async () => {
      setMaxmlMintAmount(await getMaxmlMintAmount());
      setMaxMintAmount(await getMaxMintAmount());
      setNftPrice(await getNftPrice());
      setIsSaleActive(await getSaleState());
      setIsWLSaleActive(await getWLSaleState());
      await updateTotalSupply();
    };

    prepare();
  });

  const updateTotalSupply = async () => {
    const mintedCount = await getTotalSupply();
    setTotalSupply(mintedCount);
  };

  const mlincrementCount = () => {
    if (count < maxmlMintAmount) {
      setCount(count + 1);
    }
  };

  const mldecrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (count < maxMintAmount) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const mintEmoji = async () => {
    const { status } = await publicSaleMint(count);
    setStatus(status);

    
    updateTotalSupply();
  };

  const MLmint = async () => {
    const { status } = await mlmint(count);
    setStatus(status);

    
    updateTotalSupply();
  };

  const CheckML = async () => {
    const { status } = await checkML(count);
    setStatus(status);

  };



  return (
        <main id="main" className="main1">
            <div className="background">
            <div className="eyes"></div>
            </div>
            <div className="flex flex-col items-center text-center mintcenter">
        

           {isWLSaleActive ? (
            <>
              {/* Wl Minted NFT Ratio */}
              <p className="bg-gray-100 rounded-md text-gray-800 font-extrabold text-lg mt-10 my-5 py-1 px-3 text1">
                <span className="text-purple-600">{`${totalSupply}`}</span > /
                6666
              </p>

              <div className="flex items-center mt-6 text-3xl font-bold text-gray-200">
                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md hover:bg-pink-500 text-center border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
                  onClick={mlincrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <h2 className="mx-8 text-2xl text ">{count} </h2>

                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md hover:bg-pink-500 text-center border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
                  onClick={mldecrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>

              <h4 className="mt-4 font-semibold text-center text-white text">
                {0} ETH{" "}
                <span className="text-sm text-gray-300 text"> + GAS</span>
              </h4>

              {/* Mint Button */}
              <button
                className="mt-6 py-2 px-5 pixeltextR  uppercase bg-white border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
                onClick={MLmint}
              >
                Moonlist Mint
              </button>
            </>
          ) : (
            <p className="mt-80 textx">
              {""}
             
            </p>
          )}


          {/* Status */}

         

          {isSaleActive ? (
            <>
              {/* Minted NFT Ratio */}
              <p className="bg-gray-100 rounded-md text-gray-800 font-extrabold text-lg my-4 py-1 px-3 text1">
                <span className="text-purple-600">{`${totalSupply}`}</span> /
                6666
              </p>

              <div className="flex items-center mt-6 text-3xl font-bold text-gray-200">
                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md hover:bg-pink-500 text-center border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
                  onClick={incrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <h2 className="mx-8 text">{count}</h2>

                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md hover:bg-pink-500 text-center border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
                  onClick={decrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>

              <h4 className="mt-4 font-semibold text-center text-white text">
                {0.0066} ETH{" "}
                <span className="text-sm text-gray-300"> + GAS</span>
              </h4>

              {/* Mint Button */}
              <button
                className="mt-6 py-2 px-5 pixeltextR  uppercase bg-white border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
                onClick={mintEmoji}
              >
                Mint
              </button>
            </>
          ) : (
            <p className="text-white text-2xl mt-8">
              {" "}
              
            </p>
          )}


          {/* Status */}
          

         
        </div>
    
    </main>
  );
};

export default Hero;

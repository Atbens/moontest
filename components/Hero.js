import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStatus } from "../context/statusContext";

import {
  getMaxMintAmount,
  getTotalSupply,
  getNftPrice,
  mintNFT,
  getSaleState,
} from "../utils/interact";

const Hero = () => {
  const { status, setStatus } = useStatus();

  const [count, setCount] = useState(1);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nftPrice, setNftPrice] = useState("0.01");
  const [isSaleActive, setIsSaleActive] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      setMaxMintAmount(await getMaxMintAmount());
      setNftPrice(await getNftPrice());
      setIsSaleActive(await getSaleState());
      await updateTotalSupply();
    };

    prepare();
  });

  const updateTotalSupply = async () => {
    const mintedCount = await getTotalSupply();
    setTotalSupply(mintedCount);
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
    const { status } = await mintNFT(count);
    setStatus(status);

    
    updateTotalSupply();
  };



  return (
    <main id="main" className="h-screen py-16  py-20  rbackground">
      <div className="container max-w-6xl mx-auto flex flex-col items-center pt-4">
        <div className="flex flex-col items-center">
          <Image
            src="/images/preview.gif"
            width="270"
            height="270"
            className="rounded-md"
          />

          {isSaleActive ? (
            <>
              {/* Minted NFT Ratio */}
              <p className="bg-gray-100 rounded-md text-gray-800 font-extrabold text-lg my-4 py-1 px-3">
                <span className="text-purple-600">{`${totalSupply}`}</span> /
                10000
              </p>

              <div className="flex items-center mt-6 text-3xl font-bold text-gray-200">
                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md text-black hover:bg-pink-200 text-center"
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

                <h2 className="mx-8">{count}</h2>

                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md hover:bg-pink-200 text-center"
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

              <h4 className="mt-2 font-semibold text-center text-white">
                {0.015} ETH{" "}
                <span className="text-sm text-gray-300"> + GAS</span>
              </h4>

              {/* Mint Button */}
              <button
                className="mt-6 py-2 px-5 text-center text-2xl text-white uppercase bg-blue-400 border-b-4 border-blue-700 rounded hover:bg-pink-400 hover:border-pink-500"
                onClick={mintEmoji}
              >
                Mint
              </button>
            </>
          ) : (
            <p className="text-white text-2xl mt-8">
              {" "}
              😥 Sale is not active yet!
            </p>
          )}


          {/* Status */}

          {status && (
            <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-red-400 rounded-md ">
              {status}
            </div>
          )}

          <div className="welcome px-4 py-4 mt-8">WELCOME TO THE EMOJI GAMBLE CLUB
          <h5 className="text-2xl py-5 fontstyle1 ">EMGC is a collection of 11,111 Emoji NFTs—unique digital collectibles living on the Ethereum blockchain. Your Emoji doubles as your Gamble Club membership card,
           and grants access to members-only benefits,
            the first of which is access to THE BAR,a collaborative chat creation room.
            Future areas and perks can be unlocked by the community through roadmap activation.
            </h5>
          
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;

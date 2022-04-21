import Link from "next/link";

const About = () => {
  return (
    <div id="about" className=" rbackground">
       <fieldset>
       <legend>E M G C</legend>
       </fieldset>
      <h1 className="mb-20 font-mono text-6xl font-semibold text-center text-gray-100 uppercase ">
        About The Emoji Gamble Club
      </h1>
      <div className="container relative max-w-6xl py-3 pt-16 mx-auto mt-20 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 transform shadow-lg gradient-background -skew-y-6sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="font-mono text-3xl font-bold text-gray-900 underlined">
                THE EMOJI GAMBLE CLUB
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="space-y-2 list-disc">
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      <code className="font-semibold text-gray-900">1,1111</code>{" "}
                      ERC-721 NFTs.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                    A key to the pirate ship.
                    </p>
                  </li>

                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                    Programmatically generated from 98 possible features by normal emoji.
                    </p>
                  </li>

                  

                  
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2"><code className="font-semibold text-gray-900">0.015</code>{" "}
                    ETH per Emoji for public.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2"><code className="font-semibold text-gray-900">0.008</code>{" "}
                    ETH per Emoji for presale.</p>
                  </li>
                </ul>
              </div>
              <div className="pt-6 text-base leading-6 font-extralight sm:text-lg sm:leading-7">
                <p>
                  {`We are a club established by random combination of common Emoji programming,
                    and it is also the predecessor of a pirate gambling NFT game in our team.
                    Our club will become not only the Emoji system in pirate gambling NFT games, but also the Emoji club in the metauniverse.
                    Membership is required to enter The Bar, where members can chat, play and create collaboratively.
                    Of course, the ownership of the creation belongs to the members.
                    We will apply all Emoji in the club to any possible social field and collect interesting Emoji. 
                    We firmly believe that Emoji is an indispensable part of social interaction. Welcome to our club and keep chill!`}
                </p>
                <p className="mt-8">
                  <Link href="#main">
                    <a className="text-cyan-600 hover:text-cyan-700">
                      {" "}
                      Mint one
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import Link from "next/link";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="left1">

      </div>
      <div className="right1">
        <div className="titlep">
          Welcome to the Moonknight&apos;s Word
        </div>

      <div className="textp mt-6 py-3 px-3">
      We are glad that many friends have came to the Moon, but the arrival of earth species has had an impact on the Moon environment and something terrible is about to happen.
      Moonknight will guard the Moon and Moontown.
      Buy your own Moonknight and join the adventure!


  
      



      </div>

      <button
        className="linkbutton mt-8 py-2 px-5 pixeltextR  uppercase bg-white border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
        >
        <Link href="https://opensea.io">
                    <a className="pixeltextR">
                      {" "}
                      Buy on opensea
                    </a>
          </Link>
              
      </button>

      </div>
      
    </div>
    
  )
    
};

export default About;

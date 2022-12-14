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
      The &apos;Black Fog&apos; means calamity in the Moon. The arrival of earth creatures disturbed the &apos;black fog&apos;. It swept the Moon. Become a Moon Knight, Evolve or Mutate, your choice!
      </div>

      <button
        className="linkbutton mt-8 py-2 px-5 pixeltextR  uppercase bg-white border-b-4 border-grey rounded hover:bg-pink-500 hover:border-pink-600"
        >
        <Link href="https://opensea.io/zh-CN/collection/moonknight-official">
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

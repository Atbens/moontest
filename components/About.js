import Link from "next/link";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="left1">

      </div>
      <div className="right1">
        <div className="titlep">
          Test
        </div>

      <div className="textp mt-6">
        aaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaa
        aaaaaaaaa
        Test1
        11


  
      



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

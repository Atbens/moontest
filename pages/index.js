import Head from "next/head";
import Image from "next/image";

import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Roadmap from "../components/Roadmap/Roadmap";
import FAQ from "../components/FAQ";



export default function Home() {
  return (
    <div className=" rbackground">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Roadmap />
      <FAQ />
      
      
    </div>
  );
}

import React from 'react'
import TypingBox from "../Components/TypingBox";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    <div>
      <div className="canvas">
            <Header/>
            <TypingBox />
            <Footer/>
       </div>
    </div>
  )
}

export default HomePage

import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Feature from '../components/Feature'
import Reviews from '../components/Reviews'
import Howitwork from '../components/Howitwork'
import Ctasection from '../components/Ctasection'
import Faqs from '../components/Faqs'
import Footer from '../components/Footer'


function Landingpage() {
  return (
    <div>
        <Header></Header>
        <Main></Main>
        <Feature></Feature>
        <Reviews></Reviews>
        <Howitwork></Howitwork>
        <Ctasection></Ctasection>
        <Faqs></Faqs>
        <Footer></Footer>
        
    </div>
  )
}

export default Landingpage
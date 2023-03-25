import React from 'react'
import Footer from './Footer';
import Header from './Header'
import SideNav from './SideNav';

const Layout = (props)=> {
  return (
    <>
    <Header/>  
    <div id="layoutSidenav">
      <SideNav/>
      <div id="layoutSidenav_content">
        {/* main */}
      {props.children}
      {/* footer */}
      <Footer/>
      </div>
      
    </div>
    </>
  )
}

export default Layout;
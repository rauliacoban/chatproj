import Cookies from 'js-cookie';
import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const SideNav = () => {
    let user = Cookies.get("user");

  return (
    <Container className='d-flex ' style={{height: 200}}>
        <Container className='d-flex bg-white text-primary align-items-center bg-opacity-75 justify-content-center rounded fw-bold mt-5 w-50 shadow-lg' style={{fontSize:"30px"}}>
            <span className='fw-bold'>Hello</span>
            <span className='userName' style={{marginLeft:"10px"}}>{user}!</span> 
        </Container>
    </Container>
  )
}

export default SideNav
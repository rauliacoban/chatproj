import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie';


  const Navbar = (props:any) => {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    readCookie();
  }, []);

  function logout() {
    Cookies.remove("user");
    Cookies.remove("csrfToken");
    window.location.reload();
    setLoggedIn(false);
  }

  const readCookie = () => {
    const csrfToken = Cookies.get("csrfToken");
    if (csrfToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    };

  return (
    <>
    {!loggedIn ? (
      <NavbarBs sticky='top' className='bg-white shadow-sm' style={{height:55}}>
        <Container className='d-flex flex-column align-items-center justify-content-between'>
          <Nav className='me-auto fw-bold fs-4'>
            <Nav.Link as={NavLink} to='/login' className='text-primary'>Chat App</Nav.Link>
          </Nav>
        </Container>
      </NavbarBs>
    ) : (
      <NavbarBs sticky='top' className='bg-white shadow-md' style={{height:55}}>
        <Container className='container-fluid me-auto fw-bold fs-4'>
            <Nav.Link as={NavLink} to='/' className='text-primary'>Chat App</Nav.Link>
            <Button
              variant="outline-primary"
              className='fw-bold'
              onClick={() => logout()}
              >Log out
            </Button>
        </Container>
      </NavbarBs>
    )}
    </>
  )   
}

export default Navbar
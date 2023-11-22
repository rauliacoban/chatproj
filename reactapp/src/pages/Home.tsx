import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import ChatView from '../components/ChatView';
import { Container } from 'react-bootstrap';
// import { getChatView } from '../api/api-routes';
import MainChooseChat from '../components/MainChooseChat';

const Home = () => {
  const [auth, setAuth] = useState(false); //auth is variable, setAuth is the function which updates auth
  const navigate = useNavigate();

  // execute once when component mounts
  useEffect(() => {
    readCookie();
  }, []);

  const readCookie = () => {
    const user = Cookies.get("user");
    const csrfToken = Cookies.get("csrfToken");
      if (csrfToken) {
        setAuth(true);
        // getChatView(csrfToken,user); !!! remove this line?
      } else {
        setAuth(false);
        navigate("/login");
      }
    };

  return (
    <>
      {!auth ? "" : (
        <Container className='d-flex rounded-sm' style={{height: "80vh"}}>
          <MainChooseChat/>
        </Container>
      )}
    </>
  )
}

export default Home
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import ChatView from '../components/ChatView';
import { Container } from 'react-bootstrap';
// import { getChatView } from '../api/api-routes';
import MainChooseChat from '../components/MainChooseChat';

const Home = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    readCookie();
  }, []);

  const readCookie = () => {
    const user = Cookies.get("user");
    const csrfToken = Cookies.get("csrfToken");
      if (csrfToken) {
        setAuth(true);
        // getChatView(csrfToken,user);
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
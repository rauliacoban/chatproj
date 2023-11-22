import { Container } from 'react-bootstrap'
import Cookies from 'js-cookie';

const RoomNumber = () => {
  
  return (
    <>
      <Container className='d-flex justify-content-center align-items-center bg-primary fw-bold bg-opacity-75 w-25 rounded shadow-lg' style={{color:'white', marginLeft:"75%", height:50}}>

          {'Group name: ' +  Cookies.get("roomCode")}
    
      </Container>
    </>
  )
}

export default RoomNumber
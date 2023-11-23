import React from 'react';
import { Button } from 'react-bootstrap'
import { doesRoomExist } from '../api/api-routes';
import Cookies from "js-cookie";

interface JoinChatProps {
  buttonText: string;
}

const RoomButton: React.FC<JoinChatProps> = ({ buttonText }) => {
  return (
    <Button className='bg-dark mt-2' type="submit" value="Submit" onClick={() => doesRoomExist(Cookies.get("csrfToken"), buttonText)}>
    <div className='fw-bold' style={{color:'white'}}>
        { buttonText }
    </div>
    </Button>
  );
}

export default RoomButton;


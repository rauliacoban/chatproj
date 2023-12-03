import React from 'react';
import { Button } from 'react-bootstrap'
import { doesRoomExist, joinRoom } from '../api/api-routes';
import Cookies from "js-cookie";

interface JoinChatProps {
  buttonText: string;
  groupId: string;
  groupName: string;
}

const RoomButton: React.FC<JoinChatProps> = ({ buttonText, groupId, groupName }) => {
  console.log("!!! GROUPID1: " + buttonText)
  console.log("!!! GROUPID2: " + groupId)
  console.log("!!! GROUPID3: " + groupName)
  return (
    <Button className='bg-dark mt-2' type="submit" value="Submit" onClick={() => joinRoom(Cookies.get("csrfToken"), groupId, groupName)}>
    <div className='fw-bold' style={{color:'white'}}>
        { buttonText }
    </div>
    </Button>
  );
}

export default RoomButton;


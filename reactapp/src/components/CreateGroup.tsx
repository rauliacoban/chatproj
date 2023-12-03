import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { createGroup, doesRoomExist, getRoomCode } from '../api/api-routes';
import NewChat from './NewChat';

const CreateGroup = () => {
  const [groupName,setgroupName] = useState(" ");
  return (
    <>
    {
      <Container className='d-flex justify-content-center align-items-center bg-primary bg-opacity-50 rounded shadow-lg' style={{height:650}}>
      <div className='d-flex justify-content-center align-items-center bg-dark bg-opacity-75 rounded shadow-lg' style={{height: 150, marginTop: -200}}>
          <div className='d-flex justify-content-center align-items-center flex-column fw-bold fs-5 m-3' style={{color:'white'}}>
              <div>Enter Group Name</div>
              <input className='mt-3' type="text" name="name"  value = {groupName} onChange={(e) => setgroupName(e.target.value)}/>
              <Link to="/createGroup">
                <Button className='bg-dark mt-2' type="submit" value="Submit" onClick={() => createGroup(Cookies.get("csrfToken"),groupName)}>
                  <div className='fw-bold' style={{color:'white'}}>
                      Enter
                  </div>
                </Button>
              </Link>
          </div>
      </div>
      </Container>
    }
    </>
  )
}

export default CreateGroup
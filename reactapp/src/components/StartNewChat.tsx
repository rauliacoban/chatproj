import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getRoomCode } from '../api/api-routes'
import Cookies from 'js-cookie'

const StartNewChat = () => {
  return (
    <>
    <Link to="#" onClick={() => getRoomCode(Cookies.get("csrfToken"))}> 
        <div className='d-flex bg-white text-primary justify-content-center align-items-center bg-opacity-75 rounded shadow-lg p-3' style={{}}>
           <div className='fw-bold fs-4'>
                Create Chat
           </div>
        </div>
    </Link>
    </>
  )
}

export default StartNewChat
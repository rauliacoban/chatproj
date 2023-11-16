import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const JoinChat = () => {
  return (
    <>
    <Link to="/chatCheck">
        <div className='d-flex justify-content-center align-items-center bg-white text-primary bg-opacity-75 rounded shadow-lg p-3' style={{}}>
            <div className='fw-bold fs-4'>
                Join Chat
           </div>
        </div>
    </Link>
    </>
    
  )
}

export default JoinChat
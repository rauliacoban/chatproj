import React from 'react'
import { Container } from 'react-bootstrap'
import CreateNewGroup from './CreateNewGroup'
import JoinChat from './JoinChat'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const BrowseButton = () => {
  return (
    <>
    <Link to="/browseGroups">
        <div className='d-flex justify-content-center align-items-center bg-white text-primary bg-opacity-75 rounded shadow-lg p-3' style={{}}>
            <div className='fw-bold fs-4'>
                Browse Groups
           </div>
        </div>
    </Link>
    </>
    
  )
}

export default BrowseButton
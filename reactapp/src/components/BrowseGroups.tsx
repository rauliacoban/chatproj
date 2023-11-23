import React from 'react'
import { Container } from 'react-bootstrap'
import CreateNewGroup from './CreateNewGroup'
import SimpleTable from './TableGroups'

const BrowseGroups = () => {
  return (
    <>
      <Container className='d-flex flex-column rounded bg-primary bg-opacity-50' style={{height: "80vh"}}>
        <Container className='d-flex justify-content-evenly align-items-center rounded w-80' style={{marginTop: "7%"}}>
          <SimpleTable/>
        </Container>
      </Container>
    </>
  )
}

export default BrowseGroups
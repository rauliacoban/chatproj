import React from 'react'
import { Container } from 'react-bootstrap'
import StartNewChat from './StartNewChat'
import JoinChat from './JoinChat'
import Sidebar from './Sidebar'

const MainChooseChat = () => {
  return (
    <>
        <Container className='d-flex flex-column rounded bg-primary bg-opacity-50' style={{}}>
              <Container className='d-flex align-items-center justify-content-center flex-column rounded mt-5' style={{}}>
                <Container className='d-flex justify-content-center' style={{}}>
                    <Sidebar/>
                </Container>
              </Container>
              <Container className='d-flex justify-content-evenly align-items-center rounded w-50' style={{marginTop: "7%"}}>
                  <StartNewChat/>
                  <JoinChat/>
              </Container>
          </Container>
       
    </>
  )
}

export default MainChooseChat
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'


const SendMessage = () => {
  const [message, setMessage] = useState("");

  function handleSubmit(event:any){
    event.preventDefault();
    setMessage("")
  }

  return (
    <Form noValidate onSubmit={handleSubmit} className='' style={{marginTop:50}}>
        <Form.Group className="d-flex flex-column align-items-start" controlId="sendMessageForm" >
            <InputGroup className='d-flex flex-column' style={{height:55}}>
                <Form.Control 
                  required 
                  value = {message} 
                  placeholder={"Enter message"}
                  onChange={(e) => setMessage(e.target.value)}
                  className='w-100'
                  />      
            </InputGroup>
        </Form.Group>
    </Form>
  )
}

export default SendMessage
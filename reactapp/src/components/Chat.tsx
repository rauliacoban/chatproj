import React, {useEffect, useRef, useState} from 'react'
import {Container, Form, InputGroup} from 'react-bootstrap'
import Message from './Message'
import SendMessage from './SendMessage'
import getChatSocket from '../api/WebSockets';
import Cookies from 'js-cookie';
import {useReducer} from 'react';


let listMessages: any[] = []
let messages: any[] = []


const Chat = () => {
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [isPaused, setPause] = useState(false);
    const [ws, setWS] = useState(getChatSocket(
        Cookies.get("roomNumber"),
        Cookies.get("user"),
        Cookies.get("roomCode")
    ))
    const [webSocketReady, setWebSocketReady] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const ref:any = useRef()


    console.log('RE-RENDER: ' + webSocketReady);

    useEffect(() => {
      console.log("executing")
      ref.current.scrollIntoView({behaviour:"smooth"});
    }, [webSocketReady])

    useEffect(() => {
        ws.onopen = (e) => {
           setWebSocketReady(false);
           console.log('connected to websocket')
        }

        ws.onmessage = (message: any) => {
            let mesajJSON = JSON.parse(message.data);
            messages.push(JSON.stringify(mesajJSON.message).slice(1, -1));
            setUser(JSON.stringify(mesajJSON.user).slice(1, -1));
            setWebSocketReady(true);
            setNewMessage(true);
        }
        return () => ws.close();
               
        }, [ws]
    );

    useEffect(() => {
        listMessages = messages.map((item) =>
            <div>
                <Message user={user} message={item}/>
            </div>)
        setNewMessage(false);
    }, [newMessage])


    function handleSubmit(event: any) {
        if (message != ""){
          event.preventDefault();
          const usr = Cookies.get("user");
          if (ws === null) return;
          ws.send(JSON.stringify({
              'message': usr + " " + message,
              'user': usr
          }));
          setWebSocketReady(false);
          setMessage("");
        } 
        else {
          event.preventDefault();
        }
        
    }


    return (
        <Container className='d-flex flex-column justify-content-center p-5'>
          <div className='d-flex flex-column justify-content-start overflow-auto' style={{height:400, marginTop:"auto"}}>
            {webSocketReady ? listMessages : "loading.."}
            <div ref={ref}/>
          </div >
            {/* This sends chat */}
            <Form noValidate onSubmit={handleSubmit} className='mt-5'>
                <Form.Group className="d-flex flex-column align-items-start" controlId="sendMessageForm">
                    <InputGroup className='d-flex flex-column' style={{height: 55}}>
                        <Form.Control
                            required
                            value={message}
                            placeholder={"Enter message"}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-100'
                        />
                    </InputGroup>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Chat

function newDate() {
    throw new Error('Function not implemented.');
}

import React, {useEffect, useRef, useState} from 'react'
import {Container, Form, InputGroup} from 'react-bootstrap'
import Message from './Message'
import SendMessage from './SendMessage'
import getChatSocket from '../api/WebSockets';
import Cookies from 'js-cookie';
import {useReducer} from 'react';


let listMessages: any[] = []
let messages: any[] = []

interface ChatProps {
    ws: WebSocket;
}

const Chat: React.FC<ChatProps> = ({ ws }) =>{
    console.log("                   ENTERING CHAT")
    const [message, setMessage] = useState("");
    let my_message;
    const [deleteme, setDeleteme] = useState("");
    const [user, setUser] = useState("");
    const [isPaused, setPause] = useState(false);

    const [webSocketReady, setWebSocketReady] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const ref:any = useRef()


    const effectRan = useRef(false);


    console.log('RE-RENDER: ' + webSocketReady);
    console.log('user: ' + user);
    console.log('isPaused: ' + isPaused);
    console.log('webSocketReady: ' + webSocketReady);
    console.log('newMessage: ' + newMessage);
    console.log('groupId: ' + Cookies.get("groupId"));
    console.log('roomCode: ' + Cookies.get("roomCode"));

    useEffect(() => {
        console.log("executing")
        ref.current.scrollIntoView({behaviour:"smooth"});
    }, [webSocketReady])

    useEffect(() => {
        ws.onopen = (e) => {
            setWebSocketReady(false);
            console.log('connected to websocket')
        }

        ws.onmessage = (text_data: any) => {
            console.log("   Message:" + text_data.data)
            let dataJSON = JSON.parse(text_data.data);
            let type = dataJSON['type']
            let message = dataJSON['message']
            let author = dataJSON['author']
            messages.push(message);
            setUser(author);
            setWebSocketReady(true);
            setNewMessage(true);
            /*
            let stringified = JSON.stringify(mesajJSON.message);
            console.log("   message:" + stringified)
            messages.push(stringified.slice(1, -1));
            let user_string = JSON.stringify(mesajJSON.user)
            console.log("   user:" + user_string)
            setUser(user_string.slice(1, -1));
            setWebSocketReady(true);
            setNewMessage(true);//*/
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
        console.log("handleSubmit called")
        if (message != ""){
            event.preventDefault();
            const usr = Cookies.get("user");
            if (ws === null) {
                console.log("Websocket is NULL!");
                return;
            }
            else{
                console.log("Websocket is OK!");
            }
            console.log("Sending message")
            ws.send(JSON.stringify({
                "type":"text_message",
                'message': message,
                'author': usr
            }));
            console.log("Sent message")
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
import React, { useEffect, useRef, useState } from 'react'
import { Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import Message from './Message'
import SendMessage from './SendMessage'
import UserList from './UserList'
import getChatSocket from '../api/WebSockets';
import Cookies from 'js-cookie';
import { useReducer } from 'react';
import { group } from 'console';


let listMessages: any[] = []
let messages: any[] = []
let timestamps: any[] = []

interface ChatProps {
    ws: WebSocket;
}

const Chat: React.FC<ChatProps> = ({ ws }) => {
    console.log("                   ENTERING CHAT")
    const [message, setMessage] = useState("");
    const [isPaused, setPause] = useState(false);

    const [webSocketReady, setWebSocketReady] = useState(false);
    const [backlogReady, setBacklogReady] = useState(false);
    const [userlistReady, setUserlistReady] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const ref: any = useRef()

    const [users, setUsers] = useState<any[]>([]);

    const effectRan = useRef(false);

    useEffect(() => {
        console.log("executing")
        ref.current.scrollIntoView({ behaviour: "smooth" });
    }, [backlogReady, userlistReady, webSocketReady])

    useEffect(() => {
        ws.onopen = (e) => {
            console.log('connected to websocket')

            const usr = Cookies.get("user");
            const groupid = Cookies.get("groupId");
            console.log("Sending request for backlog " + usr + groupid)
            ws.send(JSON.stringify({
                "type": "backlog_request"
            }));
            console.log("Sent request for backlog")

            console.log("Sending request for userlist " + usr + groupid)
            ws.send(JSON.stringify({
                "type": "userlist_request"
            }));
            console.log("Sent request for userlist")
        }

        ws.onmessage = (text_data: any) => {
            console.log("GOT NEW MESSAEGE!!")
            console.log("   Message:" + text_data.data)
            let dataJSON = JSON.parse(text_data.data);

            if (dataJSON.type == 'text_message') {
                let type = dataJSON['type']
                messages.push({
                    "message": dataJSON['message'],
                    "author": dataJSON['author'],
                    "timestamp": String(dataJSON['timestamp'])
                });
                setNewMessage(true);
            }
            else if (dataJSON.type == 'backlog_messages') {
                let msgs = JSON.parse(dataJSON['items']);
                console.log(msgs);
                msgs.forEach((msg: { [x: string]: any; }) => {
                    messages.push(msg);
                });
                setBacklogReady(true);
                setNewMessage(true);
            }

            else if (dataJSON.type == 'userlist') {
                let usrs = JSON.parse(dataJSON['items']);
                console.log(usrs);
                setUsers(usrs);
                setUserlistReady(true);
            }

            setWebSocketReady(true);
        }
        return () => ws.close();

    }, [ws]
    );

    useEffect(() => {
        console.log('                       EFFECT')
        listMessages = (messages).map((item) =>
            <div>
                <Message user={item['author']} message={item['message']} timestamp={item['timestamp']} />
            </div>
        )

        setNewMessage(false);
    }, [newMessage])


    function handleSubmit(event: any) {
        console.log("handleSubmit called")
        if (message != "") {
            event.preventDefault();
            const usr = Cookies.get("user");
            if (ws === null) {
                console.log("Websocket is NULL!");
                return;
            }
            else {
                console.log("Websocket is OK!");
            }
            console.log("Sending message")
            ws.send(JSON.stringify({
                "type": "text_message",
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
            <Row>
                <Col md={8}>
                    <div className='d-flex flex-column justify-content-start overflow-auto' style={{ height: 400, marginTop: "auto" }}>
                        {webSocketReady ? listMessages : "loading.."}
                        <div ref={ref} />
                    </div>
                </Col>
                <Col md={4}>
                    <UserList users={users} />
                </Col>
            </Row>
            <Form noValidate onSubmit={handleSubmit} className='mt-5'>
                <Form.Group className="d-flex flex-column align-items-start" controlId="sendMessageForm">
                    <InputGroup className='d-flex flex-column' style={{ height: 55 }}>
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
    );
};

export default Chat;
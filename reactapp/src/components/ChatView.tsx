import React, { useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import RoomNumber from './RoomNumber'
import Cookies from 'js-cookie';
import Image from 'react-bootstrap';
import SendMessage from './SendMessage';
import Message from './Message';
import Chat from './Chat';

interface TextProps{
  content: string
}

const URL_REGEX =
	/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

const IMG_REGEX = /.*\.(gif|jpe?g|bmp|png)$/igm;

function Text({ content }: TextProps) {
  const words = content.split(' ');
  return (
    <p>
      {words.map((word) => {
        return word.match(IMG_REGEX) ? (
          <>
            <img style={{width:200}} src={word} />
          </>
        ) : (
          word.match(URL_REGEX) ? (
            <>
            <a target='_blank' href={word}>{word}</a>{ ' ' }
          </>
        ) : (
          word + ' '
        ));
      })}
    </p>
  );
}

const ChatView  = () => {
  return (
    <>
    <div className='bg-primary bg-opacity-50 w-100 rounded shadow-lg' style={{overflow: "none"}}>
        <RoomNumber />
        <Chat/> 
    </div>
    </>
 
  )
}

export default ChatView
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'




interface TextProps{
  content: string
}

const URL_REGEX =
/\b(?:https?|ftp):\/\/(?:www\.)?\S+/gi;

function Text({ content }: TextProps) {
  const words = content.split(' ');
  return (
    <div className='d-flex align-items-center rounded mt-3'  style={{color:'black', marginLeft: 7}}>
    <p>
      {words.map((word) => {
        return (  
            word.match(URL_REGEX) ? (
            <>
              <a target='_blank' href={word}>{word}</a>{ ' ' }
            </>
        ) : (
          word + ' '
        ));
      })}
    </p>
    </div>
  );
}



const Message = (props : any) => {
  console.log(props)
  let message = props.message
  let user = props.user
  let timestamp = props.timestamp.substr(0, props.timestamp.indexOf('.'))

  return (
    <>
    <Container className='d-flex rounded bg-white bg-opacity-75 shadow-sm mt-1 flex-column justify-content-start' style={{color:'black', height:"auto", width:"auto", margin:"auto" }}>
      <span className="mt-2" style={{fontWeight:"bold", marginLeft:6}}>
      {user} {timestamp}
      </span>
      <Text content={message}/>
    </Container>
    </>
  )
}

export default Message
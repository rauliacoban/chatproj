import React from 'react';
import { Link } from 'react-router-dom';

interface JoinChatProps {
  buttonText: string;
}

const JoinChat: React.FC<JoinChatProps> = ({ buttonText }) => {
  return (
    <Link to="/chatCheck">
      <div className='d-flex justify-content-center align-items-center bg-white text-primary bg-opacity-75 rounded shadow-lg p-3' style={{}}>
        <div className='fw-bold fs-4'>
          {buttonText}
        </div>
      </div>
    </Link>
  );
}

export default JoinChat;

import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

interface UserListProps {
    users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    useEffect(() => {
        // Any logic you want to execute when users prop changes
        console.log('Users prop has changed:', users);
    }, [users]);

    return (
        <div className="p-3">
            <h5 className="text-black">Users in Chat</h5>
            <ListGroup>
                {users.map((user) => (
                    <ListGroup.Item>{user}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default UserList;
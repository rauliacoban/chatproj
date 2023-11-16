import React, { useState } from 'react'
import { Container, Form, InputGroup } from 'react-bootstrap'

const Search = () => {

    const [username, setUsername] = useState("")

    const handleSearch = () => {
        //search route
      }
    
    const handleKey = (e:any) => {
        e.code === "Enter" && handleSearch();
    }

  return (
    <>
        <InputGroup className="mb-3">
            <Form.Control
                className='shadow-none'
                placeholder="Search"
                onChange={e => setUsername(e.target.value)}
            />
        </InputGroup>
        
    </>

  )
}

export default Search
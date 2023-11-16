import { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { doLogin } from '../api/api-routes';

const LoginForm = () => {
  const [validatedUser, setValidatedUser] = useState(false);
  const [validatedPwd, setValidatedPwd] = useState(false);
  const [errMsgUser, setErrMsgUser] = useState("");
  const [errMsgPwd, setErrMsgPwd] = useState("");
  const [errMsgValid, setErrMsgValid] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  let loggedIn = false;
  useEffect(() => {
    if (user.length !== 0){
      checkUserValidation()
    } else {
        setErrMsgUser("")
    }
    if (pwd.length !== 0){
      checkPwdValidation()
    } else {
        setErrMsgPwd("")
        setErrMsgValid("");
    }

    if (loggedIn){
      navigate('/')
    }
    
    },[user, pwd, loggedIn])

  const checkUserValidation = () => {
    if(user.length === 0){
      setValidatedUser(false)
      setErrMsgUser("Username can't be empty.")}
    else {
      setValidatedUser(true)
    }
  }

  const checkPwdValidation = () => {
    if(pwd.length === 0){
      setValidatedPwd(false)
      setErrMsgPwd("Password can't be empty.")}
    else {
      setValidatedPwd(true)
    }
  }

  const handleSubmit = (event:any) => {
    if (validatedPwd && validatedUser){
      doLogin(user,pwd,navigate,loggedIn,setErrMsgValid);
    }
    setErrMsgPwd("Password can't be empty.")
    event.preventDefault();
    checkUserValidation();
    checkPwdValidation();
    loggedIn = false;
  };
  
    return (
        <Container className='m-5 d-flex flex-column align-items-center '>
          <Form noValidate onSubmit={handleSubmit} className='m-5 w-50 bg-white shadow p-3 rounded-3 border d-flex flex-column align-items-center' >
              <Container className='m-3 w-25 d-flex flex-column align-items-center fw-bold text-primary fs-4'>
                  Login
              </Container>
  
            <Form.Group className="mb-5 d-flex flex-column align-items-start" controlId="formBasicUsername" >
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation className='d-flex flex-column'>
                <Form.Control 
                  required 
                  type="username" 
                  placeholder="Enter username" 
                  value = {user} 
                  onChange={(e) => setUser(e.target.value)}
                  className='w-100'
                  />
                { !validatedUser ? (
                <Form.Text className='mt-2 text-danger'>
                  {errMsgUser}
                </Form.Text>) : ('')}        
              </InputGroup>
            </Form.Group>
  
            <Form.Group className="mb-3 d-flex flex-column " controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation className='d-flex flex-column d-inline'>
                <Form.Control 
                  required 
                  type="password" 
                  placeholder="Password"
                  value = {pwd} 
                  onChange={(e) => setPwd(e.target.value)}
                  className='w-100'
                  />
                { !validatedPwd ? (
                <Form.Text className='mt-2 text-danger'>
                  {errMsgPwd}
                </Form.Text>) : (<Form.Text className='mt-2 text-danger'>
                  {errMsgValid}
                </Form.Text>)} 
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-4'>
              Login
            </Button>
            <Form.Text className="text-muted mt-3">
            No account? <Link to="/register">Register here!</Link>
            </Form.Text>
          </Form>
        </Container>
      )
}

export default LoginForm
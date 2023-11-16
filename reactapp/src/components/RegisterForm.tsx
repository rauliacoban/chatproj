import { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { doRegister } from '../api/api-routes';

const RegisterForm = () => {
  const REGEXEMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const REGEXPWD = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  const REGEXUSER = /^.{5,}$/;
  const [validatedUser, setValidatedUser] = useState(false);
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedPwd, setValidatedPwd] = useState(false);
  const [validatedConfirmPwd, setValidatedConfirmPwd] = useState(false);

  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgUser, setErrMsgUser] = useState("");
  const [errMsgPwd, setErrMsgPwd] = useState("");
  const [errMsgConfirmPwd, setErrMsgConfirmPwd] = useState("");

  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const navigate = useNavigate();

  let registered = false;

    useEffect(() => {
        if (email.length !== 0){
            checkEmailValidation()
        } else {
            setErrMsgEmail("")
        }
        if (user.length !== 0){
            checkUserValidation()
        } else {
            setErrMsgUser("")
        }
        if (pwd.length !== 0){
            checkPwdValidation()
        } else {
            setErrMsgPwd("")
        }
        if (confirmPwd.length !== 0){
            checkConfirmPwdValidation()
        } else {
            setErrMsgConfirmPwd("");
        }
    },[user, email, pwd, confirmPwd])

  const checkEmailValidation = () => {
    if(email.length === 0){
      setValidatedEmail(false)
      setErrMsgEmail("Please enter an email.")
    } else if (!REGEXEMAIL.test(email)) {
      setValidatedEmail(false)
      setErrMsgEmail("Email not valid!")
    }
    else {
      setValidatedEmail(true)
    }

  }

  const checkUserValidation = () => {
    if(user.length === 0){
      setValidatedUser(false)
      setErrMsgUser("Please enter an username.")
    } else if (!REGEXUSER.test(user)) {
      setValidatedUser(false)
      setErrMsgUser("Username needs more than 5 letters.")
    }
    else {
      setValidatedUser(true)
    }
  }

  const checkPwdValidation = () => {
    if(pwd.length === 0){
      setValidatedPwd(false)
      setErrMsgPwd("Please enter a password.")
    }
    else if(!REGEXPWD.test(pwd)){
      setValidatedPwd(false)
      setErrMsgPwd("Password too weak.")
    } 
    else {
      setValidatedPwd(true)
    }
    
  }

  const checkConfirmPwdValidation = () => {
    if(confirmPwd.length === 0){
      setValidatedConfirmPwd(false)
      setErrMsgConfirmPwd("Please confirm your password.")
    }
    else if(confirmPwd !== pwd){
      setValidatedConfirmPwd(false)
      setErrMsgConfirmPwd("Passwords don't match!")
    } 
    else {
      setValidatedConfirmPwd(true)
    }
    
  }

  const handleSubmit = (event:any) => {
    if (validatedPwd && validatedUser && validatedEmail) {
      doRegister(user,pwd,email,navigate,registered);

    }
      event.preventDefault();
      checkEmailValidation();
      checkUserValidation();
      checkPwdValidation();
      checkConfirmPwdValidation();
      registered = false;
  };

    return (
      <Container className='m-5 d-flex flex-column align-items-center'>
          <Form noValidate onSubmit={handleSubmit} className='m-5 w-50 bg-white shadow p-3 rounded-3 border d-flex flex-column align-items-center' >
              <Container className='m-3 w-25 d-flex flex-column align-items-center fw-bold text-primary fs-4'>
                  Register
              </Container>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation className='d-flex flex-column d-inline'>
                      <Form.Control 
                      required
                      type="email" 
                      placeholder="Enter email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-100'
                      />
                      { !validatedEmail ? (
                      <Form.Text className='mt-2 text-danger'>
                          {errMsgEmail}
                      </Form.Text>) : ('')}
                  </InputGroup>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicUsername">
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
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
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
                      </Form.Text>) : ('')}
                  </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup hasValidation className='d-flex flex-column d-inline'>
                      <Form.Control 
                          required 
                          type="password" 
                          placeholder="Confirm password"
                          value = {confirmPwd} 
                          onChange={(e) => setConfirmPwd(e.target.value)}
                          className='w-100'
                          />
                          { !validatedConfirmPwd ? (
                      <Form.Text className='mt-2 text-danger'>
                          {errMsgConfirmPwd}
                      </Form.Text>) : ('')}
                  </InputGroup>
              </Form.Group>
              <Button variant="primary" type="submit">
                  Register
              </Button>
              <Form.Text className="text-muted">
                  Already have an account? <Link to="/login">Login here!</Link>
              </Form.Text>
          </Form>
      </Container>
    )
}

export default RegisterForm
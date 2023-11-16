import axios from "axios";
import Cookies from "js-cookie";
import { ApiConstants } from "./api-constants";
import { RedirectFunction } from "react-router-dom";
import  { redirect } from 'react-router-dom'

// export const getChatView = (csrf:any , user:any) => {
//         const params = ({
//           "username" : user
//          })
//         axios.get(ApiConstants.chatUrl ,{
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFTOKEN': csrf
//           },
//           params
//         }).then((response:any) =>{
//           console.log(response.data);
//         }).catch((e:any) => {
//           console.log(e);
//         });  

// };

export const doRegister = (user:string,pwd:string,email:string,navigate:any,registered:boolean) => {
  try {
    axios.post(ApiConstants.registerUrl ,{
      username: user,
      password: pwd,
      email: email,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response:any) =>{
      console.log(response.data.token);
      if (response.data.token !== null) {
        navigate("/login");
        registered = true;
        window.location.reload();
      }
      if (response.data.success){
        console.log("response.data.success!")
      } else {
        console.log("ba astia")
      }
    }).catch((e:any) => {
      console.log(e);
    });  
  } catch (registerError) {
    console.error("[ERROR]: Error: " + registerError)
  }
};

export const doLogin = (user:string ,pwd:string,navigate:any,loggedIn:boolean,setErrMsgValid:any ) =>{
  try {
    axios.post(ApiConstants.loginUrl ,{
      username: user,
      password: pwd,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response:any) =>{
      if (response.data.token !== null) {
        navigate('/')
        Cookies.set("csrfToken", response.data.token);
        loggedIn = true;
        window.location.reload();
      }
      if (response.data.success){
        Cookies.set("user", user);
      } else {
        setErrMsgValid(response.data.message);
      }
    }).catch((e:any) => {
      console.log(e);
    });
  } catch (loginError) {
    console.error ("[ERROR]: Error: " + loginError);  
  }
};



export const getRoomCode = (csrf:any) =>{
    let roomCode;
    axios.get(ApiConstants.chatRoomCode ,{
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrf
      },
    }).then((response:any) =>{
      console.log(response.data.code);
      roomCode = response.data.code;
      Cookies.set("roomCode", roomCode);
      Cookies.set("roomNumber",response.data.id);
      window.location.replace("/chat/ws/chat/" + Cookies.get("roomNumber"))
    }).catch((e:any) => {
      console.log(e);
    });
};

export const doesRoomExist = (csrf:any,room:any) =>{
  room=room.trim();
  const params = ({
    "room" : room
   })
   console.log(room + " ROOOOMMMM");
  axios.get(ApiConstants.checkRoomUrl ,{
    params,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf
    },
  }).then((response:any) =>{
    const roomId=response.data.number;
    Cookies.set("roomCode",room);
    Cookies.set("roomNumber",roomId);
    window.location.replace("/chat/ws/chat/" + Cookies.get("roomNumber"));

  }).catch((e:any) => {
    throw new Error(e.response);
  });
};

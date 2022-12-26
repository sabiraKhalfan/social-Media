import "./App.css"
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Auth from './Pages/Auth/Auth';
import React, { Component }  from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import Chat from "./Pages/Chat/Chat";

function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
        <div className="blur" style={{top:'10%', right:'0'}}></div>
        <div className="blur"style={{top:'36%', marginLeft:'-8%'}} ></div>
        
        <Routes>
          <Route  path ='/'  element ={user? <Navigate to="home" /> : <Navigate to="auth"/>}/>
          <Route path ='/home' element ={user?<Home/>:<Navigate to ='../auth'/>}/> 
          <Route path = '/auth' element ={user?<Navigate to ='../home'/>:<Auth/>}/>
          <Route path ='/profile/:id' element ={user? <Profile/> :<Navigate to ="../auth"/> }/>
          <Route path ='/chat' element ={user? <Chat/> :<Navigate to ="../auth"/>}/>
        </Routes>/
    </div>
  );
}

export default App;

import React from 'react'
import './Chat.css'
import LogoSearch from "../../Components/LogoSearch/LogoSearch"; 
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../../Api/ChatRequest';
import Conversations from '../../Components/Conversations/Conversations';


const Chat = () => {
const {user} =useSelector((state)=>state.authReducer.authData);
const [chats, setChats] =useState([]);



useEffect(()=>{
    // fetch api
    const getChats =async()=>{

        try {
            const {data} =await userChats(user._id)
            setChats(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    getChats()
},user)




  return (
    <div className="Chat">
        {/*LeftSide */}
        <div className="Left-side-chat">
            
        <LogoSearch />
        <div className="Chat-container">

            <h2>Chats</h2>
            <div className="Chat-List"> {chats.map((chat)=>(
            <div>
                <Conversations data ={chat} currentUser ={user._id}/>
            </div>   
            ))}</div>
        </div>
        </div>



        {/* Right Side*/ }
        <div className="Right-side-chat">
   
        </div>
    </div>
  )
}

export default Chat
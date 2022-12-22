import React, { useEffect } from 'react'

import './FollowersCard.css'
import User from '../User/User'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from  '../../Api/UserRequest'



const FollowersCard = () => {
const [persons,setPersons] =useState([])
const {user} =useSelector((state)=>state.authReducer.authData)


useEffect( 
  () => {
    const fetchPersons=async()=>{ 
      const {data} =await getAllUser();
      setPersons(data);
      console.log(data,"data")

    };
    fetchPersons();
  },[])



  return (
   <div className="FollowersCard">
    <h4>People You may know</h4>
      {persons.map((person, id)=>{
        if(person._id !==  user._id)
        {

          return <User person ={person} key={id}/>
        }

      })}
   </div>
  )
}

export default FollowersCard
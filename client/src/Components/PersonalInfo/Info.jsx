import React from 'react'
import { useState,useEffect } from 'react'
import './Info.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModel'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../Api/UserRequest'
  import { logout } from '../../Actions/AuthAction'


const Info = () => {

const dispatch =useDispatch();
const params =useParams();

const profileUserId =params.id;
const [profileUser,setProfileUser]=useState({});

const {user} = useSelector((state)=>state.authReducer.authData)

 const [show,setShow] = useState(false)

useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
       // console.log("usr",user)
       
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
       // console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

const handleLogOut =()=>{
    dispatch(logout());
}


  return (
    
    <div className="Info">
        <div className="infoHead">
      <h4>Profile Info</h4>
       {profileUserId === user._id? (<div>
      <UilPen width='2rem'
       height='1.2rem' 
       onClick={()=>setShow(true)}/>
  <ProfileModal show={show}
  setShow={setShow}
  data ={user 
  }/>

      </div>):""}

      
        </div>
        <div className="infoDetail">
            <span><b>Status </b></span>
            <span>
                {profileUser.relationship}
            </span>

        </div>
        <div className="infoDetail">
            <span><b>Lives in </b></span>
            <span>
                {profileUser.livesIn}
            </span>

        </div>
        <div className="infoDetail">
            <span><b>Works at </b></span>
            <span>
              {profileUser.worksAt}
            </span>

        </div>
        <button className='button logout-button' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Info
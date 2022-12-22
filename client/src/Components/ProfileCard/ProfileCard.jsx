import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import './../ProfileCard/ProfileCard.css'

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;



const ProfileCard = ({location}) => {
    const {user} =useSelector((state)=>state.authReducer.authData)
    const {posts} = useSelector((state)=>state.postReducer)
   
  
    return (
    <div className="ProfileCard">
        <div className="ProfileImage">
        <img src={user.coverPicture
         ? serverPublic +user.coverPicture 
         :serverPublic+"cover.jpg" } alt="" />


        <img src={user.profilePicture
        ? serverPublic + user. profilePicture 
        :serverPublic+"default.png"} alt=''/>

        </div>
        <div className="ProfileName">
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt ?user.worksAt:"Write About Yourself"}</span>
        </div>
        <div className="followStatus">
            <hr />
            <div>
            <div className="follow">
            <span>{user.following.length}</span>
            <span>Followings</span>
            </div>
            <div className='vl'></div>
            <div className="follow">
                <span>{user.followers.length}</span>
                <span>Followers</span>
            </div>


         {location === "profilePage" &&(
            <>
            <div className="vl">

            </div>
            <div className="follow">
                <span>{posts.filter((el)=>el.userId===user._id).length}</span>
                <span>Posts</span>
            </div>
            </>
         )}
            </div>
            <hr />

        </div>
        {location ==="profilePage" ? '':<span>
            <Link to ={`/profile/${user._id}`} style ={{textDecoration: "none",color:"inherit"}}>
             My Profile</Link></span> }
           
    </div>
  )
}

export default ProfileCard
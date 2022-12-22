import React, { useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { followUser } from '../../Actions/UserAction';
import { unfollowUser } from '../../Actions/UserAction';



const User = ({person}) => {

const dispatch =useDispatch();
const { user } = useSelector((state) => state.authReducer.authData);
 const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
 const [following,setfollowing] =useState(person.followers.includes(user._id))

 const handleFollow=()=>{
  following ?
  dispatch(unfollowUser(person._id,user)):
  dispatch(followUser(person._id,user));
  setfollowing((prev) =>!prev);

};
  return (
    <div className='followers'>
    <div>
      <img src={person.profilePicture
        ? serverPublic + person. profilePicture 
        :serverPublic+"default.png"} alt=" " className='followerImage'/>
      <div className='name'>
        <span>{person.firstname}</span>
        <span>{person.username}</span>

      </div>
      
    </div>
    <button className={following?"button fc-button UnFollowButton":"button fc-button"} onClick={handleFollow}>{following? "UnFollow":"Follow"}
        
      </button>
  </div>
  )
}

export default User
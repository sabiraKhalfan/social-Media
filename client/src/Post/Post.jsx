import React from 'react'
import './../Post/Post.css'
import {likePost} from '.././Api/PostRequest'

import Comment from './../img/comment.png'
import Share  from './../img/share.png'
import Like  from './../img/like.png'
import NotLike from './../img/notlike.png'
import { useSelector } from 'react-redux'
import { useState } from 'react'



const Post = ({data}) => {

    const {user}= useSelector((state)=>state.authReducer.authData)
    const [liked, setLiked] =useState(data.likes.includes(user._id))
    const [likes,setLikes] =useState(data.likes.length)
    
    const handleLike =()=>{
      
     likePost(data._id,user._id);
      setLiked((prev) => !prev);
      liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
    }
  return (
    <div className="Post">
      <img
        src={data.Image ? process.env.REACT_APP_PUBLIC_FOLDER + data.Image : ""}
        alt=""
      />

            <div className="postReact">
                <img src={liked?Like:NotLike} alt ="" style={{cursor:'pointer'}} onClick={handleLike}/>
                <img src={Comment}alt="" />
                <img src={Share} alt="" />
            </div>
            <span  style={{color:"var(--gray)",fontSize:'12px'}}>{likes} likes</span>
        
        <div className="divdetail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>

        </div>
    </div>
  )
}

export default Post
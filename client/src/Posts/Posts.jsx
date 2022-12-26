import React from 'react'
import Post from './../Post/Post'
import { useEffect } from 'react'
//import {PostsData} from './../Data/PostData'
import { useDispatch,useSelector } from 'react-redux'
import { getTimelinePosts } from '../Actions/PostAction'
import { useParams } from 'react-router-dom'
import Dropdown from '../Components/DropDown/DropDown'
import './Posts.css'
import { useState } from 'react'
const Posts = () => {
  const [show,setShow]=useState(false)
  const params =useParams();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData);
  let {posts,loading}= useSelector((state)=>state.postReducer);


  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  },[]);
  
if(!posts) return "No Posts";
if(params.id) posts=posts.filter((post)=>post.userId ===params.id)
  
  
    return (
      <div className="Posts">
        {loading ? "Fectching Posts..." :
         posts ?posts.map((post,id)=>{
          return(
            <div key={post._id} className='' style={{position:"relative"}}>
              <div style={{position:'absolute', right:"15px", top:"15px" }}> <Dropdown key={post._id} id={post._id} /> </div>
            <div><Post  data={post} id ={id}/></div>
            
            </div>
            ) 
        }):""}
   
        
        
      </div>
    )
}

export default Posts
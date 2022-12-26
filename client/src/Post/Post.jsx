import React from 'react'
import './../Post/Post.css'
import {createComment, deleteComment, getComment, likePost} from '.././Api/PostRequest'

import Comment from './../img/comment.png'
import Share  from './../img/share.png'
import Like  from './../img/like.png'
import NotLike from './../img/notlike.png'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'





const Post = ({data}) => {


  //let {posts,loading}= useSelector((state)=>state.postReducer);

    const {user}= useSelector((state)=>state.authReducer.authData)
    const [liked, setLiked] =useState(data.likes.includes(user._id))
    const [likes,setLikes] =useState(data.likes.length)
    const [comment,setComment]=useState('');
    const [comments,setComments]=useState([]);
    const[show, setshow] =useState(false);
    const [refresh, setRefresh]= useState(0)

    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!comment.trim()) return;

      try {
        const response=await createComment(data._id,comment,user.firstname);
        console.log(response,"response")
        
        setComments(pre=>{
          return[response.data,...pre]
        })
        setComment('')
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      const getComments=async()=>{
        const commentData=await getComment(data._id);
        console.log(commentData,'tjsadf');
        setComments(commentData.data)
      }
      getComments()
    },[data._id,refresh==1])


     const handleDelete=async(id)=>{
      try {
        setRefresh(0)
        await deleteComment(id);
        setRefresh(1)
      } catch (error) {
        console.log(error)
      }
    
     }
    
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
    <div className="icon">
            <div className="postReact">
                <img src={liked?Like:NotLike} alt ="" style={{cursor:'pointer'}} onClick={handleLike}/>
                <img src={Comment}alt="" className='comment' onClick={()=>setshow((show)=> !show)}/>
                <img src={Share} alt="" />
                
            

        
              
                
            </div>
            </div>
            <span  style={{color:"var(--gray)",fontSize:'12px'}}>{likes} likes</span>
        
        <div className="divdetail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>

            {show?<>
            <form action="" onSubmit={handleSubmit}>
            <div className='comment'>
            <input className='writeComment' value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder='Write Your Comments Here' style={{ color: "var(--phone)" }}

            ></input>
            <button className='commentButton' type='submit'>post</button>
        </div>
            </form>
        <div>
            {comments.map((value)=>{
             return <p>{value.userName}:{value.comment} <button onClick={()=>handleDelete(value._id)}>delete </button></p>
            })}
        </div></>:null}

        </div>
    </div>
  )
}

export default Post
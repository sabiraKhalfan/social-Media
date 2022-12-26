import axios from 'axios'
const API = axios.create({baseURL:"http://localhost:5000"})
export const getTimelinePosts =(id)=>API.get(`/post/${id}/getTimelinePost`);
export const likePost=(id, userId)=>API.put(`/post/${id}/like`, {userId: userId})
export const deletePost =(id)=>{
    console.log(id,'id')
    API.delete(`/post/${id}`,{headers:{authorization:`Bearer ${JSON.parse(localStorage.getItem('ProfileData')).token}`}})}



export const createComment=(id,comment,firstname)=>API.post(`/post/${id}/comment`,{comment,firstname});
export const getComment=(id)=>API.get(`/post/${id}/comment`)
export const deleteComment=(id)=>API.delete(`/post/${id}/comment`);


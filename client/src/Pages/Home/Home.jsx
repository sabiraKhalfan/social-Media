import React from 'react'
import { ProfileSide } from '../../Components/ProfileSide/ProfileSide'
import './Home.css'
import PostSide from '../../PostSide/PostSide'
import RightSide from '../../RightSide/RightSide'

const Home = () => {
  return (
    <div className="Home">
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
       
    </div>
  )
}

export default Home
import React from 'react'
//import FollowersCard from '../FollowersCard/FollowersCard'
import './ProfileSide.css'
import ProfileCard from '../ProfileCard/ProfileCard'
import LogoSearch from './../LogoSearch/LogoSearch'

export const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch/>
      <ProfileCard location ='homepage'/>
      
     
    </div>
  )
}

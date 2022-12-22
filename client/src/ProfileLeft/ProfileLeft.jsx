import React from 'react'
import LogoSearch from '../Components/LogoSearch/LogoSearch'
import FollowersCard from './../Components/FollowersCard/FollowersCard'
import Info from '../Components/PersonalInfo/Info'

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
    <LogoSearch/>
    <Info/>
    <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
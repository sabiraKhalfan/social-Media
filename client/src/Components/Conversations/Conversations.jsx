import React from 'react'
import { useEffect ,useState} from 'react'
import { getUser } from '../../Api/UserRequest'

const Conversations = ({data,currentUserId}) => {

    const [userData,setUserData] =useState({})

    useEffect(()=>{
        const userId=data.members.find((id)=>id!==currentUserId)
        console.log(userId)
        const getUserData= async()=>{
            try {
                const {data}=await getUser(userId)
                setUserData(data);

            } catch (error) {
                console.log(error)
            }
        
        
        }
        getUserData();
    },[])
    
  return (
    <div className="follower converstation">
{console.log(userData?.profilePicture)}
 <div className="">
    <div className="online-dot"></div>
    {/* <img src={userData?.profilePicture?
        
    process.env.REACT_APP_PUBLIC_FOLDER+userData.profilePicture:
    process.env.REACT_APP_PUBLIC_FOLDER+ "default.png"} alt="" /> */}
    </div>
    </div>
  )
}

export default Conversations


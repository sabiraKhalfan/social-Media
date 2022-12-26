import React ,{useState} from 'react'
import './RightSide.css'
import Home from './../img/home.png'
import FollowersCard from '../Components/FollowersCard/FollowersCard'
import comment from './../img/comment.png'

import ShareModal from '../Components/ShareModal/ShareModal'
import {Link} from 'react-router-dom'

const RightSide = () => {
    const [show,setShow] = useState(false)
    return (
        <div className="RightSide">
            <div className="navIcons">
            <Link to ="../home">
                <img src={Home} alt="" />
              </Link>
              <Link to ='../chat'>
              <img src={comment} alt = ""  /> 

              </Link>
            
            </div>
            
            <div>
              <FollowersCard/>

              </div>
        
            <ShareModal show={show}
            setShow={setShow}/>

        </div>
    )
}

export default RightSide
import React ,{useState} from 'react'
import './RightSide.css'
import Home from './../img/home.png'
import { UilSetting } from '@iconscout/react-unicons'
import Comment from './../img/comment.png'
import Noti from './../img/noti.png'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../Components/ShareModal/ShareModal'
import {Link} from 'react-router-dom'

const RightSide = () => {
    const [show,setShow] = useState(false)
    return (
        <div className="RightSide">
            <div className="NavIcon">
            <Link to ="../home">
                <img src={Home} alt="" />
              </Link>

                <UilSetting />
                <img src={Noti} alt="" />
                <img src={Comment} alt="" />

            </div>
            <TrendCard/>
            <button className='button r-button' onClick={()=>setShow(true)}>Share</button>
            <ShareModal show={show}
            setShow={setShow}/>

        </div>
    )
}

export default RightSide
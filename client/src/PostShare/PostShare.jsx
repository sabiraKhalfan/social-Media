import React from 'react'
import Profile from './../img/profileImg.jpg'
import './PostShare.css'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
//import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage,uploadPost } from '../Actions/UploadAction';
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const PostShare = () => {
   
    const dispatch =useDispatch();
    const loading =useSelector((state)=>state.postReducer.uploading)
    const [Image, setImage] = useState(null)
   
   
    const desc = useRef();
    const { user } = useSelector((state) => state.authReducer.authData)
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setImage(img)

        }
    };
    const reset =()=>{
    
        setImage(null);
        desc.current.value="";
    }
    
    const ImageRef = useRef();
  // handle post upload
    const handleUpload =async (e) => {
        e.preventDefault();

        //post data
        const newPost = {
         
            userId: user._id,
            desc: desc.current.value

        };//if there is an image with post
       // console.log("ethiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        if (Image) {

           
            const data = new FormData();
            const fileName = Date.now() + Image.name;
            data.append("name", fileName);
            data.append("file", Image);
            newPost.Image = fileName;
            //console.log(newPost,"newwwwwwpostttttt");
            try {
              dispatch(uploadImage(data));
              
            } catch (err) {
              console.log(err);
            }
          }
          dispatch(uploadPost(newPost));
        
          reset();
          


    }



    return (
        <div className="PostShare">
            <img src={user.profilePicture
        ? serverPublic + user. profilePicture 
        :serverPublic+"default.png"} alt=''/>
            <div>
                <input
                    ref={desc}
                    required
                    type='text' placeholder="What's happening" />
                <div className="PostOptions">
                    <div className="Options" style={{ color: "var(--photo)" }}
                        onClick={() => ImageRef.current.click()}>
                        <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
                    
                    <div className="Options" style={{ color: "var(schedule)" }}>
                        <UilSchedule />
                        Schedule
                    </div>
                    <button
                     className='button ps-button' 
                    onClick={handleUpload} 
                    disabled={loading}  
                    >
                    {loading ? "Uploading..":"share"}
                        </button>
                    <div style={{ display: "none" }}>
                        <input type="file"
                            
                            ref={ImageRef} onChange={onImageChange} />
                    </div>
                </div>
                {Image && (
                    <div className="PreviewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(Image)} alt="" />
                    </div>
                )}
            </div>

        </div>
    )
}

export default PostShare
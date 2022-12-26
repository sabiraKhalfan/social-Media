
import * as UploadApi from '../Api/UploadRequest'

export const uploadImage = (data) => async(dispatch) => {

    try {
      console.log("Image upload Action start ")
      await UploadApi.uploadImage(data);
      
    } catch (error) {
      console.log(error);
    }
  };



  export const uploadPost = (data) => async(dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    console.log(data,"dataaaaaaaaaaa")
    try {
      const newPost =await UploadApi.uploadPost(data);
  
      dispatch({ type: "UPLOAD_SUCCESS",data :newPost.data});
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPLOAD_FAIL" });
    }
  }

  // export const uploadVideo =(data)=>async(dispatch)=>{
  //   dispatch({type:"VIDEO_UPLOAD_START"});
  //   console.log(data,"videodata");
  //   try {
  //     const newPost=await UploadApi.uploadVideo(data);
  //     dispatch({type:"VIDEO_UPLOAD_SUCCESS",data :newPost.data});
  //   } catch (error) {
  //     console.log(error);
  //     dispatch({ type: "VIDEO_UPLOAD_FAIL" });
  //   }
  //   }
  
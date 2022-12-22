import * as PostApi from '../Api/PostRequest'

export const getTimelinePosts =(id)=>async(dispatch)=>{
    dispatch({type:"RETRIEVING_START"})
    try {
        const {data}= await PostApi.getTimelinePosts(id);
       
        dispatch({type:"RETREIVING_SUCCESS",data:data})
      
    } catch (error) {
        dispatch({type:"RETRIEVING_FAIL"})
        console.log(error)
    }

}
import * as AuthApi from '../Api/AuthRequest'


export const logIn=(formData)=>async(dispatch)=>{
   //telling our reducer that dispatcher is started
   
    dispatch({type:"AUTH_START"})
   
    try {   
        const {data} =await AuthApi.logIn(formData)
        //after receiving data from server telling out reducer 
        //that dispatcher has successfully  authenticated
        dispatch({type:"AUTH_SUCCESS",data:data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}


export const signUp=(formData)=>async(dispatch)=>{
    //telling our reducer that dispatcher is started
    
     dispatch({type:"AUTH_START"})
    
     try {   

         const {data} =await AuthApi.signUp(formData)
         //after receiving data from server telling out reducer 
         //that dispatcher has successfully  authenticated
         dispatch({type:"AUTH_SUCCESS",data:data})
         
     } catch (error) {
         console.log(error)
         dispatch({type:"AUTH_FAIL"});
     }
 }


 // reducers will get data from actions and then it will store in reduc store
 export const logout =()=>async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
 }
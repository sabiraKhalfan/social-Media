import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Auth.css'
import { useDispatch, useSelector } from 'react-redux'

import { logIn, signUp } from '../../Actions/AuthAction'


const Auth = () => {
  const dispatch = useDispatch();
  //const loading = useSelector((state)=>state.authReducer.loading)
//console.log(loading)
  const [IsSignUp, setSignUp] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

//The event gets passed in by React, and we want to update our state object. So to do that,
// we call the setData function and pass in a new object with the updated data.
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }


const handleSubmit=(e)=>{
e.preventDefault();


if(IsSignUp){
data.password === data.confirmpass
?
 dispatch(signUp(data)):
  setConfirmPass(false);
  
}
else {
  dispatch(logIn(data))
}
}

const resetForm=()=>{
  setConfirmPass(true);
  setData(
  {
    firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirmpass: "",
})
}




  return (
    <div className="Auth" >
      <div className="a-right">

        <form className='infoForm authForm' onSubmit={handleSubmit}>


          <h3>{IsSignUp ? "SignUp" : "Login"}</h3>

          {IsSignUp &&

            <div className='inputname'>
              <input 
              type="text" 
              placeholder='First Name' 
              className='infoInput' name='firstname' 
               value={data.firstname} 
               onChange={handleChange} />

              <input 
              type="text"
               placeholder='Last Name' 
               className='infoInput' 
               name='lastname' 
               onChange={handleChange} />

            </div>

          }
          <div className='infoInput1' >
            <div>
              <input 
              type="text" 
              className="infoInput"
               name='username' 
               placeholder='UserName' 
               style={{ width: "80%" }} 
               onChange={handleChange} />
            </div>
            <div className='infoInput2'>
              <input 
              type="password" 
              className='infoInput'
              style={{ width: "90%" }} 
               name='password' placeholder='Password' 
               onChange={handleChange}
               value={data.password} />



              {IsSignUp &&
                
                  <input type="password"
                    className='infoInput'
                     name='confirmpass' 
                     placeholder='Confirm Password'
                      onChange={handleChange}
                      value={data.confirmpass}/>

                
              }
            </div>
          </div>
          <span
            style={{
              color: "red",
              fontSize: "16px",
              alignSelf: "center",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
             style={{ 
              fontSize: "12px",
              cursor:"pointer",
            }} 
            onClick ={()=>{
              resetForm();
              setSignUp((prev)=>!prev)
            }}
            >
             {IsSignUp  ?  "Already Have an Account! Login":"Don't Have an account! SignUp"} 
            </span>
          </div>
          
          <button className='button infoButton' type='submit' 
          >
            {IsSignUp ?"Sign Up":"Login"}</button>

        </form>
      </div>
    </div>
  )
}

export default Auth
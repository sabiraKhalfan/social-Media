import React from 'react'
import './Otp.css';

import firebase from '../../Config/Config';

const Otp = () => {
const handleSubmit=()=>{
  
}


  return (
    <div className="Otp">
      <div className="Otp-container">
        <form action=""  className='Otp-form'>
          <div className="Otp-fields">
        <img className="otp-icon" src={Otp} alt="" />
        <h3>OTP Verification</h3>
            <div className="Otp-input">
              <input type="number" name="otp" />
            </div>
            <div className="Otp-button">
              <button type="submit"onClick={handleSubmit} on>submit</button>
            </div>
          </div>
        </form>
      </div>
      {/* <Form onFinish={onFinish}>
        <Form.Item>
        <Input
                type="number"
                placeholder="OTP"
              />
        </Form.Item>
        <Button htmlType='submit'>submit</Button>
      </Form> */}
    </div>
  );
};
  


export default Otp;
import React, { useState } from 'react'
import  '../styles/Login.css'

const Register = () => {
    const [emailVal,setEmailVal] = useState([])
    const [passwordVal,setPasswordVal] = useState([])
    


  return (
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2>register</h2>
                    <div class="inputbox">
                        {/* <ion-icon name="mail-outline"></ion-icon> */}
                        <input type="email" required onChange={(e)=>{setEmailVal(e.target.value)}}/>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                        <input type="password" required/>
                        <label for="">Password</label>
                    </div>
                    <div class="inputbox">
                        {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                        <input type="password" required/>
                        <label for="">confirm password</label>
                    </div>
                   
                    <button onClick={()=>{console.log(emailVal)}}>register</button>
                   
                </form>
            </div>
        </div>
    </section>
  )
}

export default Register

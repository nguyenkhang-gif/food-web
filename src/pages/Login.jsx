import React, { useContext, useState } from 'react'
import  '../styles/Login.css'
import { AuthContext } from '../context/authcontext'

const Login = () => {
    const {curentUser,login}= useContext(AuthContext)
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const handleChange = (e)=>{
        setUser((prev) => ({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            login(user)
            // await axios.post("http://localhost:8800/api/auth/login", user)
            
          
            
            
        }catch(err){
            console.log(err)
            
        }
        console.log(user)
    }
  return (
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2>Login</h2>
                    <div class="inputbox">
                        {/* <ion-icon name="mail-outline"></ion-icon> */}
                        <input type="email" name='email' onChange={handleChange} required/>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                        <input type="password" name='password' onChange={handleChange} required/>
                        <label for="">Password</label>
                    </div>
                    
                    <button onClick={handleSubmit}>Log in</button>
                    <div class="register">
                        <p>Don't have a account <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login

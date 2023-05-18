import React, { useState } from 'react'
import '../styles/Login.css'
import { register } from '../apicalls'
import { validateEmail } from '../Funtions'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const navigate = useNavigate()
    const handleValidateUser = (email, password, repassword) => {
        //  vlidate 
        let result = true
        if (!validateEmail(email)) {
            console.log('email good')
            result = false
        }
        if (!(password == repassword && password != '' && repassword != '')) {
            // console.log('pass is good')
            result = false
        }
        if (result) {
            return true
        } else {
            console.log('password:', password)
            console.log('repassword:', repassword)
            alert('mật khẩu or email chưa đúng thử lại ')
            return false
        }
    }
    const hanndleSubmit = (e) => {
        e.preventDefault()


        if (handleValidateUser(email, password, repassword)) {
            // console.log('user should be create', email, password)
            register({ email, password })
            navigate('/')
        }
        // console.log('user should be create', email,password)


    }
    return (
        <section>
            <div class="form-box">
                <div class="form-value">
                    <form onSubmit={hanndleSubmit}>
                        <h2>register</h2>
                        <div class="inputbox">
                            {/* <ion-icon name="mail-outline"></ion-icon> */}
                            <input type="email" required onChange={(e) => { setEmail(e.target.value) }} />
                            <label htmlFor="">Email</label>
                        </div>
                        <div class="inputbox">
                            {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                            <input type="password" required onChange={(e) => { setPassword(e.target.value) }} />
                            <label htmlFor="">Password</label>
                        </div>
                        <div class="inputbox">
                            {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                            <input type="password" required onChange={(e) => { setRePassword(e.target.value) }} />
                            <label htmlFor="">confirm password</label>
                        </div>

                        <button onClick={ hanndleSubmit }>register</button>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register

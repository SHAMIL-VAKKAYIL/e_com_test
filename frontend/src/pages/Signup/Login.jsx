import './Login.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { userLogin } from './authApi/Api'

function Login() {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const logindata = async () => {
        try {
            await userLogin({ email, password },dispatch)

        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <section className='mainUserLogin'>
                <div className="innerLogin">
                    <img className='Loginhead' height={40} width={150} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3GOa09_CQMYmfIdDYXaBzmcVTpSuvTeSpQ&s" alt="" />
                    <div className='LoginForm'>
                        <label style={{ color: '#000', marginTop: '10px' }} htmlFor="">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />

                        <label style={{ color: '#000', marginTop: '10px' }} htmlFor="">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />

                        <button className='LoginButton' onClick={logindata} >Login</button>
                        <div>
                            <Link style={{ textDecoration: 'none' }} to={'/signup'} >Don't have an account?</Link>
                        </div>
                    </div>
                    <p></p>
                </div>
            </section>
        </>
    )
}

export default Login

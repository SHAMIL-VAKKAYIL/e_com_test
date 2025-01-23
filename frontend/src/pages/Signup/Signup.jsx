import React, { useState } from 'react'
import './Signup.css'
import { userSignup } from './authApi/Api'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    async function Signup() {
        await userSignup({ fullname, email, password })
        navigate('/')
    }


    return (
        <>
            <section className='mainUserSignup'>
                <div className="innerSignup">
                    <img className='siginuphead' height={40} width={150} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3GOa09_CQMYmfIdDYXaBzmcVTpSuvTeSpQ&s" alt="" />
                    <div className='signupForm'>
                        <label style={{ color: '#000', marginTop: '10px' }} htmlFor="">Full name:</label>
                        <input onChange={(e) => setFullname(e.target.value)} type="text" placeholder='Fullname' />
                        <label style={{ color: '#000', marginTop: '10px' }} htmlFor="">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />
                        <label style={{ color: '#000', marginTop: '10px' }} htmlFor="">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
                        <button className='siginupButton' onClick={Signup}>Submit</button>
                        <div>
                            <Link style={{ textDecoration: 'none' }} to={'/'}>Already have an account?</Link>
                        </div>
                    </div>
                    <p></p>
                </div>
            </section>
        </>
    )
}

export default Signup

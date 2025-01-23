import React, { useState } from 'react'
import '../pages/Signup/Login.css'
import { Link } from 'react-router-dom'
import { adLogin } from './AdminApi'
import { useDispatch } from 'react-redux'
function AdminLogin() {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const adminLogin = async () => {
    try {
      await adLogin({ email, password }, dispatch)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <section className='mainUserLogin'>
        <div className="innerLogin">
          <h3>Admin</h3>
          <img className='Loginhead' height={40} width={150} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3GOa09_CQMYmfIdDYXaBzmcVTpSuvTeSpQ&s" alt="" />
          <div className='LoginForm'>
            <label style={{ color: '#000', marginTop: '10px' }} htmlFor="">Email:</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />

            <label style={{ color: '#000', marginTop: '10px' }} htmlFor="">Password:</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />

            <button className='LoginButton' onClick={adminLogin} >Login</button>
            <div>
              <Link style={{ textDecoration: 'none' }}  >Don't have an account?</Link>
            </div>
          </div>
          <p></p>
        </div>
      </section>
    </div>
  )
}

export default AdminLogin

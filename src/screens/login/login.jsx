import React, { useEffect, useState } from 'react'
import { loginService } from '../../service/login'
import { decrypt, encrypt } from '../../helpers/encrypt'
import { useNavigate } from 'react-router-dom'
import { getToken, setToken } from '../../utils/storage'
import './login.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
    const [credetials, setCredentials] = useState({email:"",password:""})

    useEffect(()=>{
      if(getToken().length>0){
        navigate('/priceChange')
      }
    },[])
    const handleLogin =()=>{
      if(credetials.email && credetials.password){
        loginService(credetials).then((res)=>{if(res.status===200){
          toast.success("Login successfully")
          setToken(res.data.result.token)
          if(getToken().length>0){navigate('/priceChange')}
        }}).catch((err)=>{
          toast.error("Incorrect email or password")
        })
      }else{
        toast.error("Enter email and password");
      }
    }

    


  return (
    <div className='login'>
      <ToastContainer />
        <div className='login-content'>
          <div className='login-textbox'>
          <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={decrypt(credetials.email)} onChange={(e)=>setCredentials({...credetials,[e.target.name]:encrypt(e.target.value)})} placeholder='Enter the email'/>
          </div>
          <div className='login-textbox'>
          <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={decrypt(credetials.password)} onChange={(e)=>setCredentials({...credetials,[e.target.name]:encrypt(e.target.value)})} placeholder='Enter the Password'/>
          </div>
        <input type="button" value="Login" onClick={handleLogin}/>
        </div>
    </div>
  )
}

export default Login
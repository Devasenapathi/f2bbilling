import React, { useEffect, useState } from 'react'
import { loginService } from '../../service/login'
import { decrypt, encrypt } from '../../helpers/encrypt'
import { useNavigate } from 'react-router-dom'
import { getToken, setToken } from '../../utils/storage'

const Login = () => {
  const navigate = useNavigate();
    const [credetials, setCredentials] = useState({email:"",password:""})

    useEffect(()=>{
      if(getToken().length>0){
        navigate('/priceChange')
      }
    },[])
    const handleLogin =()=>{
        loginService(credetials).then((res)=>{if(res.status===200){
          console.log(res.data.result)
          setToken(res.data.result.token)
          if(getToken().length>0){navigate('/priceChange')}
        }}).catch((err)=>{console.log(err)})
    }

    


  return (
    <div>
        <input type="text" name="email" id="email" value={decrypt(credetials.email)} onChange={(e)=>setCredentials({...credetials,[e.target.name]:encrypt(e.target.value)})} placeholder='Enter the email'/>
        <input type="password" name="password" id="password" value={decrypt(credetials.password)} onChange={(e)=>setCredentials({...credetials,[e.target.name]:encrypt(e.target.value)})} placeholder='Enter the Password'/>
        <input type="button" value="Login" onClick={handleLogin}/>
    </div>
  )
}

export default Login
import React from 'react'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../App.css"

const Login = () => {
    const [credentials,setCredentials] = useState({email:"",password:""});
  let navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://16.171.208.191:5000/api/auth/login",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email: credentials.email,password: credentials.password})
    })
    const json = await response.json()
    // console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      navigate("/homepage");
    }
    else{
        alert("please enter correct credentials")
      }
  }
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }


  return (
    <>
    <center>
        <div className="login_container">
            <h3 className="login_head">LOGIN</h3>
        
            <form className="forms" onSubmit = {handleSubmit}>
                <label className="gmail"><b>Email</b></label><br/>
                <input className = 'login_email' name = "email" id="email" type="email" value={credentials.email} onChange = {onChange} placeholder="xyz@gmail.com" /><br/>
                <label className="gmail"><b>Password</b></label><br/>
                <input className = 'login_password' name = "password" type="password" value={credentials.password} placeholder="" onChange = {onChange}/><br/>
                <div className="forgot"><a href="/" className="forgot" >forgot password</a></div>
                
                <button className="login_b" >Login</button><br/>
                Don't have an account? <Link to="/createuser" className="cna" >Create new Account</Link>
            </form>
        </div>
    </center>
    </>
  )
}

export default Login

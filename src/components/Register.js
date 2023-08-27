import React from 'react'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Register = () => {
    const [credentials,setCredentials] = useState({username:"",email:"",password:"",role:"student"});
    let navigate = useNavigate();
    const onSubmit = async(e)=>{   
        e.preventDefault() 
        const response = await fetch("http://16.171.208.191:5000/api/auth/createuser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username:credentials.username,email: credentials.email,password: credentials.password,role:credentials.role})
      })
      console.log(credentials);
      const json = await response.json()
      
      console.log(json)
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate("/");
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
        <div class="register_container">
        <form className = 'container my-5' onSubmit={onSubmit}>
        <h1>Create new Account</h1>
            <div className="mb-3 x">
                <label htmlFor="name" className="form-label my-2">Username (username must be unique)</label>
                <input name = 'username' type = 'text' className="form-control" id="username" value={credentials.username} onChange = {onChange}/>
            </div>
            <div className="mb-3">

                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input name = 'email' type="email" className="form-control" id="exampleInputEmail1" value={credentials.email} aria-describedby="emailHelp" onChange = {onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input name = 'password' type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange = {onChange}/>
            </div>
            <div className='role_c'>
            {/* <label htmlFor="role">Role:</label>
            <select name="role" onChange={onChange} className='mx-2 py-1'>
              <option value="Student">Reader</option>
              <option value="Tutor">Author</option>
            </select> */}
            
            <button type="submit" className="btn btn-primary my-2">Submit</button>
            </div>
        </form>
        
        </div>
    </>
  )
}

export default Register

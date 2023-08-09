import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function Login() {
  
  const [credentials,setCredentials] =useState({email:"",password:""})
  let navigate=useNavigate()
  const handlesubmit= (event)=>{
    event.preventDefault();
    console.log(credentials.email,credentials.password)
    fetch("http://localhost:4000/api/loginuser", {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({email:credentials.email,password:credentials.password})
    }).then(response => response.json()).then(json => {
      if(!json.success){
        localStorage.setItem('isLogin','false')
        alert("Enter Valid Credentials")
      }
      else{
        localStorage.setItem('userEmail',credentials.email)
        localStorage.setItem('isLogin','true')
        localStorage.setItem('profileEmail',"")
        localStorage.setItem('isProfile','false')
        navigate("/");
      }
    })
   
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }


  return(
    <div> 
    <div><Navbar /></div>
    <div className="wrapper ">
        
        <div className="logo">
            <img src="https://i.ibb.co/883YwKr/Whats-App-Image-2023-04-04-at-21-30-15.jpg" alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            MNNITIAN
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">Login Here</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" id="userName" placeholder="email" name='email' value={credentials.email} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button className="btn mt-3 bg-success" onClick={handlesubmit}>Login</button>
        <Link to="/SignUp" className="btn mt-3 fs-6 bg-success">New User</Link>
        
      </div>
    </div>
  )
}



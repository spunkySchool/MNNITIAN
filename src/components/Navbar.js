import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


export default function Navbar() {
  const [request,setRequest] =useState("")
  const navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.setItem('isLogin','false')
    localStorage.setItem('isProfile',"false")
    navigate("/")
  }
  const handleProfile=()=>{
    localStorage.setItem('isProfile','false')
    navigate("/About")
  }
  const handleOnclick=()=>{
    console.log("/".concat("",request))
    navigate("/".concat("",request));
  }
  let options=['Requests','Sent','Recieved'];
  return (
    <div>
      
      <nav className="navbar  navbar-expand-lg navbar-dark bg-success  ">
              {
                (localStorage.getItem('isLogin')=='false')?
                <div className="container-fluid">  
                <div className="nav-item m-3 ">
                    <Link className="navbar-brand fs-1 fst-italic mr-5" to="/">MNNITIAN</Link>
                    <button className="btn  text-white m-3 btn-lg " onClick={()=>{navigate("/InterviewExperiences")}}>Experiences</button>
                    <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/FindStudent")}}>FindStudent</button>
                    <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/Login")}}>Login</button>
                    <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/SignUp")}}>SignUp</button>
                  </div>
                </div>
                :
                <div className="container-fluid">  
                <div className="nav-item m-3 ">
                  <Link className="navbar-brand fs-1 fst-italic mr-5" to="/">MNNITIAN</Link>
                  <button className="btn  text-white m-3 btn-lg " onClick={()=>{navigate("/InterviewExperiences")}}>Experiences</button>
                  <button className="btn  text-white m-3 btn-lg" onClick={()=>{navigate("/FindStudent")}}>FindStudent</button>
                  <select className='btn-success' onChange={(e)=>{setRequest(e.target.value)} } >
                      {Array.from(Array(3),(e,i)=>{
                      return (
                          <option key={i+1} value={options[i]} >{options[i]}</option>
                      )
                      })}
                  </select>
                  <button className="btn text-white" onClick={handleOnclick}>Get</button>
                  <button className="btn  text-white  m-3 btn-lg"  aria-current="page" onClick={handleProfile}>Profile</button>
                  <button className='btn  text-white m-3 btn-lg' onClick={handleLogout}>LogOut</button>
                </div>
                </div>
              }
    </nav>
  </div>
  )
}

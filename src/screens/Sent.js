import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RequestCard from '../components/RequestCard'
import Footer from '../components/Footer';

export default function Sent() {
  const [sentRequests,setSentRequests] =useState({requestData:[]});
  const fetchSentRequests = async ()=>{
    await fetch("http://localhost:4000/api/sentRequests", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:localStorage.getItem("userEmail")
        })
      }).then(async (res) => {
        let response= await res.json();
        //console.log(response);
        setSentRequests(response)
    })
  }
  
  useEffect(() => {
    fetchSentRequests();
}, [])
  console.log(sentRequests)
  return (
    <div>
      <div><Navbar /></div>
      {sentRequests!==null?
      sentRequests.requestData.map((data)=>{
        return(
        <div><RequestCard 
          name={data.RequestedEmail}
          type={data.message}
          accepted={data.accepted}
          isSent={true}
        />
        </div>)
      }):<div className='m-3 text-lg'>Empty</div>}
      <div><Footer /></div>
    </div>
  )
}

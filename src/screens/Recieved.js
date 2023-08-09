import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RequestCard from '../components/RequestCard'
import Footer from '../components/Footer';

export default function Sent() {
  const [recievedRequests,setRecievedRequests] =useState({recievedData:[]});
  const fetchRecievedRequests = async ()=>{
    await fetch("http://localhost:4000/api/recievedRequests", {
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
        setRecievedRequests(response)
    })
  }
  
  useEffect(() => {
    fetchRecievedRequests();
}, [])
  console.log(recievedRequests)
  return (
    <div>
      <div><Navbar /></div>
      {recievedRequests!==null?
      recievedRequests.recievedData.map((data)=>{
        return(
        <div><RequestCard 
          name={data.recievedEmail}
          type={data.message}
          accepted={data.accepted}
          isSent={false}
        />
        </div>)
      }):<div className='justify-centre m-3'>Empety</div>}
     <div><Footer /></div>
    </div>
  )
}

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RequestCard(props) {
  let navigate=useNavigate();
  const handleProfile=()=>{
    localStorage.setItem('isProfile','true')
    localStorage.setItem('profileEmail',props.name)
    navigate("/About")
   
  }
 
  const handleEndAccept= async ()=>{
    await fetch("http://localhost:4000/api/updateEndRequest", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            userEmail:localStorage.getItem('userEmail'),
            recievedEmail:props.name
        })
    }).then(async (res) => {
        let response= await res.json()
        if(response.success){
          alert("Access Ended");
          window.location.reload();
        }
        else{
          alert("Something Went Wrong Please Try Again Later")
        }
    })
}


  const handleAccept= async ()=>{
      await fetch("http://localhost:4000/api/updateRequest", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
              userEmail:localStorage.getItem('userEmail'),
              recievedEmail:props.name
          })
      }).then(async (res) => {
          let response= await res.json()
          if(response.success){
            alert("Request Accepted");
            window.location.reload();
          }
          else{
            alert("Something Went Wrong Please Try Again Later")
          }
      })
  }
  return (
    <div className="card mt-2">
      {props.isSent?
      <div>
        <h6 className="card-header">{"To: ".concat("",props.name)}</h6>
        <div className="card-body">
          <p className="card-text text-success b-inline">Type: <p className='text-secondary'>{props.type}</p></p>
          {props.accepted?
            <div>
            <button className=' btn-white b-inline m-2'>accepted</button>
            <button className="btn-success  m-2 t-inline"  aria-current="page" onClick={handleProfile}>Profile</button>
            </div>
            :
            <div>
            <button className=' btn-white b-inline m-2'>Pending</button>
            <button className="btn-success  m-2 t-inline"  aria-current="page" >Unsend</button>
            </div>
          }
      </div>
      </div>:
      <div>
        <h6 className="card-header">{"From: ".concat("",props.name)}</h6>
        <div className="card-body">
          <p className="card-text text-success b-inline">Type: <p className='text-secondary'>{props.type}</p></p>
          {props.accepted?
            <div>
            <button className=' btn-white b-inline m-2'>accepted</button>
            <button className="btn-success  m-2 t-inline"  aria-current="page" onClick={handleProfile}>Profile</button>
            <button className="btn-success  m-2 t-inline"  aria-current="page" onClick={handleEndAccept}>End Access</button>
            </div>
            :
            <div>
            <button className="btn-success  m-2 mr-3 t-inline"  aria-current="page" onClick={handleProfile}>Profile</button>
            <button className="btn-success  m-2  t-inline"  aria-current="page" onClick={handleAccept} >Accept</button>
            </div>
          }
      </div>
    </div>
      }
      
    </div>
  )
}

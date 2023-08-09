
import React from 'react'
import { useNavigate,Link } from 'react-router-dom';


export default function Card(props) {
  const fetchUser = async () => {
    if(localStorage.getItem("isLogin")=="true"){
    let email=localStorage.getItem("userEmail")
    if(localStorage.getItem("isProfile")==="true"){email=localStorage.getItem("profileEmail")}
    console.log(localStorage.getItem('userEmail'),props.email)
    await fetch("http://localhost:4000/api/Requests", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          userEmail:email,
          RequestedEmail:props.email,
          message:props.message
        })
    }).then(async (res) => {
        alert("Request Sent")
    })
  }
  else{
    alert("Please Login To Your Account First")
  }
}
  const handleRequest=async ()=>{
    fetchUser();
  }
  
  
  return (
    <div>  
        <div className="card" style={{"width": "16rem","maxHeight":"250px" }}>
        <h5 className=" m-2">{props.company}</h5>
        <p className=" m-1">{props.date}</p>
        {/* <img src={props.foodItems.img} className='card-img-top' alt="..." style={{height:"120px",objectFit:"fill"}} /> */}
        <div className="card-body">
            <h6 className="">{props.name}</h6>
            <div>
            <p className='d-inline'>{props.experience.substring(0,35)+"..."}</p>
            <Link to="/ExperiencePage/parameter-data" state={{company:props.company,name:props.name,experience:props.experience,date:props.date}}>Read More</Link>
            </div> 
            <hr></hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleRequest}>ContactRequest</button>
        </div>
        </div>
    </div>
    
  )
}

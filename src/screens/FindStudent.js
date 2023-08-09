import React from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function FindStudent() {
    let [usersSkills,setUsersSkills]=useState([]);
    let [Skills_data,setSkills]=useState([]);
    const [search,setSearch]=useState("");
    const fetchUser = async () => {
        await fetch("http://localhost:4000/api/getUsersSkills", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            let response= await res.json()
            await setUsersSkills(response)
        })}
        
        
    const fetchSkills=async ()=>{
      await fetch("http://localhost:4000/api/getSkills", {
              // credentials: 'include',
              // Origin:"http://localhost:3000/login",
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(async (res) => {
              let response= await res.json();
              await setSkills(response)
          })}
      useEffect(() => {
        fetchSkills();
        fetchUser();
    }, [])

  console.log(Skills_data)
  if(Skills_data.length==14)Skills_data.shift();
  return (
    <div>
        <div><Navbar /></div>
        <div className="d-flex m-3 justify-content-center ">
          <button className="btn btn-outline-success text-white bg-success" style={{'margin-right': '10px'}} >Search</button>
          <input className="form-control " type="search" placeholder="Search"  aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        </div>
     
      <div className='container'>
          {
            
            Skills_data!==[]
            ? Skills_data.filter((data,i)=>(String(data).toLowerCase().includes(String(search).toLowerCase())) ).map(filterItems=>{
              return(
                 <div className='row mb-3'>
                  <div  className="fs-3 m-3">
                    {filterItems}
                  </div>
                  <hr />
                  {usersSkills!== []
                    ?usersSkills.filter((item)=> (String(item.SkillData.skill1).toLowerCase()===(String(filterItems).toLowerCase())) 
                    || (String(item.SkillData.skill2).toLowerCase()===(String(filterItems).toLowerCase())) 
                    || (String(item.SkillData.skill3).toLowerCase()===(String(filterItems).toLowerCase()))  )
                    .map(filterItems=>{ 
                      return(
                        <div key={filterItems._id} className='col-9 col-md-6 col-lg-3 mt-1' >
                          <Card 
                            email={filterItems.email}
                            message={localStorage.getItem('userEmail').concat(" ,","wants to clear his doubts .")}
                            name='Intrests'
                            company={filterItems.SkillData.user}
                            experience={(filterItems.SkillData.skill1.concat(" ,",filterItems.SkillData.skill2)).concat(" ,",filterItems.SkillData.skill3)}
                          />
                        </div>
                      )
                    }
                    ): <div>No Such Data Found</div>
                  }
                 </div>
              )})
            
            :<div>No Such Data Found</div>
          }
      </div>
      <div><Footer /></div>
    </div>
  )
}

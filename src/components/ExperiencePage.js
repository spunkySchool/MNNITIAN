import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ExperiencePage() {
    const location=useLocation();
    
    return (
        <div className='container'>
        <nav className="navbar navbar-light bg-light ">
            <form className="form-inline">
                <h5>{location.state.company}</h5>
            </form>
        </nav>
        <div className='container'>
            <h6>{location.state.date}</h6>
            <h5>{location.state.name}</h5>
            <p style={{'white-space': 'pre-wrap'}}>{location.state.experience}</p>

        </div>
        </div>
    )
}

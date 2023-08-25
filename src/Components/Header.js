import React from 'react'
import AccountCircle from './AccountCircle'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <div className="logo" onClick={() => window.location.reload(false)} style={{cursor:'pointer'}}>
            <img src='typing.png' alt='logo'/>
        </div>
        <div className="user-icon">
           <AccountCircle />
        </div>
      
    </div>
  )
}

export default Header


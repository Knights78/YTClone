import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { useNavigate } from 'react-router-dom'
const Navbar = ({setSidebar}) => {
  const navigate=useNavigate()
  return (
    <nav className='flex-div'>
        <div className=" left-side flex-div">
            <img src={menu_icon} className='menu-icon' onClick={()=>setSidebar((prev)=>prev===false?true:false)}  alt="" />
            <img onClick={()=>navigate('/')} src={logo} className='logo' alt="" />
        </div>
         
         <div className="middle flex-div">
            <input type="text" placeholder='search' />
            <img src={search_icon} className='search' alt="" />
         </div>

         <div className="right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={profile_icon} alt="" className='user-icon' />
         </div>
    </nav>
  )
}

export default Navbar
import imaged from '../../style/njz.jpeg'
import './SidePanel.scss';
import Next from '../../shortcut/next'
import logo2 from '../../style/logo2.jpg';
import logOut from '../../style/logout.png'
import logIn from '../../style/login.jpg'
import register from '../../style/register.png'
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AuthContext } from '../../service/AuthContext';
import { useContext } from 'react';



const SidePanel = () => {
  const { utilisateur, logout } = useContext(AuthContext);

  const [showAccount, setShowAccount] = useState(true)
  const navigate = useNavigate();

  const handleToReservation = () => {
    localStorage.setItem("idUser", utilisateur.id)
    console.log(localStorage.getItem("idUser"))
    navigate('/myreservations')
  }
  const handleUserAccount = () => {
    localStorage.setItem("idUser", utilisateur.id)
    console.log(localStorage.getItem("idUser"))
    navigate('/accountdetail')

  }

  const toogleVisibility = () => {
    setShowAccount(prev => !prev)
  }

  return (
    <>
      <div className="header">
        <div className="part-1">
          <div className="logo">
            <div className="logo-image"></div>
            <div className="logo-titre">Bookavy</div>
          </div>
          <div className='link'>
            <div className="li">Hotel</div>
            <div className="li">Meeting</div>
            <div className="li">Ball</div>
            <div className="li">Room</div>
          </div>
        </div>

        <div className="part-2">
          <input type="text" />
          <div className="search"></div>
        </div>

        <div className="part-3">
          <div className="login">Log In</div>
          <div className="signup">Sign Up</div>
        </div>

      </div>


      {/* <div className={`nav${showAccount ? "" : "hidden"}`}>

        <span onClick={handleUserAccount}><NavLink to='/' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Account</NavLink></span>

        <span><NavLink to='/' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Notifications</NavLink></span>

        <span><NavLink to='/mycalendar' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Calendar</NavLink></span>

        <span><NavLink to='/favorites' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Favorites</NavLink></span>

        <span onClick={handleToReservation}><NavLink className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Reservations</NavLink></span>

        <h6 className={`accounted ${showAccount ? "" : "hidden"}`}></h6>
        

        <span className='log'>
          {utilisateur ? (
            <span className='logout'>
              <a onClick={logout} href=''><img src={logOut} alt='Logout' style={{ width: '40px', height: '40px', borderRadius: '50%' }} /><b>Logout</b></a>
            </span>
          ) : (
            <>

            </>
          )}
        </span>
      </div> */}

    </>
  )

}

export default SidePanel;
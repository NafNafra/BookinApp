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
    <div className='side-panel'>
      <div className="side">
        <div className="logo">
          <div className="logo-image"></div>
          <div className="logo-titre">Bookavy</div>
        </div>

        <div className="user">
          <div className="profil">
            <div className="pdp"></div>
            <div className="name">Dean Winchester</div>
          </div>
          <div className="option">
            <div className="options">
              <div className="icon account"></div>
              <div className="name">Account</div>
            </div>
            <div className="options">
              <div className="icon notification"></div>
              <div className="name">Notifications</div>
            </div>
            <div className="options">
              <div className="icon calendar"></div>
              <div className="name">My orders</div>
            </div>
            <div className="options">
              <div className="icon favorite"></div>
              <div className="name">Favorites</div>
            </div>
            <div className="options">
              <div className="icon setting"></div>
              <div className="name">Settings</div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className='login'>
          <div className="contact">
            <div className="icon facebook"></div>
            <div className="name">Facebook</div>
          </div>
          <div className="contact">
            <div className="icon instagram"></div>
            <div className="name">Instagram</div>
          </div>
          <div className="contact">
            <div className="icon whatsapp"></div>
            <div className="name">Whatsapp</div>
          </div>

          {/* <a href='/register'><img src={logIn} alt='Logout' style={{ width: '40px', height: '40px', borderRadius: '50%' }} /><b>Signin</b></a>
          <a href='/login'><img src={register} alt='Logout' style={{ width: '40px', height: '40px', borderRadius: '50%' }} /><b>Login</b></a> */}
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

    </div>

  )

}

export default SidePanel;
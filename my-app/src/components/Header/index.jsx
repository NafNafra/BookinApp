import './Header.scss';
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
    </>
  )

}

export default SidePanel;
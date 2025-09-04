import imaged from '../style/njz.jpeg'
import '../App.css';
import Next from '../shortcut/next'
import logo2 from '../style/logo2.jpg';
import logOut from '../style/logout.png'
import logIn from '../style/login.jpg'
import register from '../style/register.png'
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react';

import { AuthContext } from '../service/AuthContext';
import { useContext } from 'react';

export default function Layout() {
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
      <div className="App">
        <header >
          <span className='logo'>
            <img src={logo2} alt='Bookavy logo' />
            <label>  Bookavy</label>
            <input type='text' placeholder='What typeof room are you looking for?' />
          </span>
          <span className='link'>
            <h5><a href='/'>Home</a></h5>
            <h5><a href='/carte'>Meeting Hall</a></h5>
            <h5><a href='/carte'>Ball Room</a></h5>
            <h5><a href='s'>About us</a></h5>
          </span>
        </header>
        <article>
          <nav>
            <div className={`nav${showAccount ? "" : "hidden"}`}>
              {utilisateur ? (
                <>
                  <span className={`img accounted ${showAccount ? "" : "hidden"}`}><img src={utilisateur.photo || imaged} alt='Account' /> </span>

                  <>
                    <h6 className={`accounted ${showAccount ? "" : "hidden"}`}>{utilisateur.full_name} </h6>
                    <span onClick={handleUserAccount}><NavLink to='/' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Account</NavLink></span>
                    <span><NavLink to='/mycalendar' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Calendar</NavLink></span>
                    <span><NavLink to='/favorites' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Favorites</NavLink></span>
                    <span><NavLink to='/' className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Notifications</NavLink></span>
                    <span onClick={handleToReservation}><NavLink className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Reservations</NavLink></span>

                  </>
                </>
              ) : (
                <h6 className={`accounted ${showAccount ? "" : "hidden"}`}></h6>
              )}

              <span className='log'>
                {utilisateur ? (
                  <span className='logout'>
                    <a onClick={logout} href=''><img src={logOut} alt='Logout' style={{ width: '40px', height: '40px', borderRadius: '50%' }} /><b>Logout</b></a>
                  </span>
                ) : (
                  <>
                    <span className='login'>
                      <a href='/register'><img src={logIn} alt='Logout' style={{ width: '40px', height: '40px', borderRadius: '50%' }} /><b>Signin</b></a>
                      <a href='/login'><img src={register} alt='Logout' style={{ width: '40px', height: '40px', borderRadius: '50%' }} /><b>Login</b></a>
                    </span>
                  </>
                )}
              </span>
            </div>

            <div className='hideBtn' onClick={toogleVisibility}>
              <Next />
            </div>
          </nav>

          {/*
           onclick circle
            ->
           */}


          <section>
            <div className='fake-background'> </div>

            <div className='content'>
              <main>
                <Outlet />
              </main>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}

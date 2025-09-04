import '../App.css';
import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import email from '../style/email.png'
import lock from '../style/lock.png'


function Login() {
  const navigate = useNavigate();

  const [mail, setEmail] = useState('');
  const [password, setPsw] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail, mot_de_passe: password })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`${data.utilisateur.id}`)
        localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur));
        window.location.href = '/'
      } else {
        setMessage(`${data.message}`)
      }
    } catch (err) {
      console.error('401:  ' + err);
      setMessage('Network error');
    }
  };

  return (

    <div className='signin'>
      <h3>Welcome back</h3>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'><img src={email} className='loginIcon' /></label>
          <input type='email' id='email' className='email' name='email' placeholder='Your email' onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='password'><img src={lock} className='loginIcon' /></label>
          <input type='password' id='password' className='password' name='password' placeholder='Your password' onChange={(e) => setPsw(e.target.value)} required />
        </div>
        <p>Already have an account ?<a href='/register'>Register</a></p>
        <button className='btnReg' type='submit' >Login </button>
      </form>
    </div>

  );
}


export default Login;


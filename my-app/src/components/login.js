import '../App.css';
import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

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
        setMessage(`Errot ${data.message}`)
      }
    } catch (err) {
      console.error('401:  ' + err);
      setMessage('Erreur réseau');
    }
  };

  return (
    <div className='centerized'>
      <div className='signup'>
        <h3>Welcome back</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email: </label>
          <input type='email' id='email' className='email' name='email' value={mail} onChange={(e) => setEmail(e.target.value)} required /><br />

          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' className='password' name='password' value={password} onChange={(e) => setPsw(e.target.value)} required /><br />
          <button className='btnLog' onClick={()=>{window.location.href = '/'}}>Register</button><button className='btnReg' type='submit' >Login </button>
        </form>
      </div>
      {/* <p style={{marginLeft: '50px'}}>If you do not have an account, please register </p> */}
    </div>
  );
}


export default Login;


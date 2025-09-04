import '../App.css';
import React, { useState } from "react";
// import '../style/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import fullnameIcon from '../style/full_name.png'
import emailIcon from '../style/email.png'
import lockIcon from '../style/lock.png'
import phoneIcon from '../style/phone.png'
import retryIcon from '../style/retry.png'
import uploadImg from '../style/uploadImg.png'

function Register() {

  const navigate = useNavigate();

  const user_if = localStorage.getItem("idUser")
  const [user, setUser] = useState(null);
  const [full_name, setName] = useState("");
  // const [lastname, setLastname] = useState("");
  const [email, setMail] = useState("");
  const [cin, setCin] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState('')
  const [confirmPsw, setConfPsw] = useState('')

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", cin: "", photo: "" });
  const userId = user_if; // à remplacer par l’ID stocké en session/localStorage


  const pswMatch = password === confirmPsw

  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/` + user_if)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setForm(data)
        setUser(data)
      })
      .catch((err) => console.error(err));
  }, []);;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    // setForm({ ...form, photo: data.url });
    form.photo = data.url; // mettre à jour l'état du formulaire
    console.log(form.photo);
  };

  // Sauvegarder
  const handleSave = async (e) => {
    alert(form.photo + "et " + form.full_name, form.email, form.cin, form.phone)
    const res = await fetch(`http://localhost:5000/api/modify/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updated = await res.json();
    setUser(updated);
    setIsEditing(false);
  };

  if (!user) return <p>Chargement...</p>;

  return (


    <div className='modify'>

      <h3>Welcome</h3>

      {!isEditing ? (
        <div>
          <div className='img'>
            {/* <p>Image enregistrée :</p> */}
            <img src={fullnameIcon} alt={user[0].photo} width="200" />
          </div>

          <div className='notImage'>
            <div>
              <label htmlFor='full_name'><img className='registIcon' src={fullnameIcon} /></label>
              <input type='text' id='full_name' className='full_name' name='full_name' value={user[0].full_name} />
            </div>
            <div>
              <label htmlFor='email'><img className='registIcon' src={emailIcon} /></label>
              <input type='email' id='email' className='email' name='email' value={user[0].email} />
            </div>
            <div>
              <label htmlFor='phone'><img className='registIcon' src={phoneIcon} /></label>
              <input type='number' id='phone' className='phone' name='phone' value={user[0].phone} required />
            </div>
            <button className='btnReg' onClick={() => setIsEditing(true)}>Modifier</button>
          </div>
        </div >


      ) : (
        <div>
          <div className='img'>
            {form.photo ? (
              <img src={form.photo} alt="upload previewing" width="200" />

            ) : (
              <img src={fullnameIcon} alt="upload preview" width="200" />
            )}
            <input type="file" onChange={handleImageUpload} />

          </div>
          <div className='notImage'>
            <div>
              <label htmlFor='full_name'><img className='registIcon' src={fullnameIcon} /></label>
              <input type='text' id='full_name' className='full_name' name='full_name' value={user[0].full_name} onChange={form.full_name} required />
            </div>
            <div>
              <label htmlFor='email'><img className='registIcon' src={emailIcon} /></label>
              <input type='email' id='email' className='email' name='email' value={user[0].email} onChange={form.email} required />
            </div>
            <div>
              <label htmlFor='phone'><img className='registIcon' src={phoneIcon} /></label>
              <input type='number' id='phone' className='phone' name='phone' value={user[0].phone} onChange={handleChange} required />
            </div>
            <button className='btnReg' onClick={() => setIsEditing(false)}>Cancel</button>
            <button className='btnReg' onClick={() => handleSave()}>Modify</button>

          </div>

        </div>
      )}


      {/* {user.id} */}

      {/* <button className='btnReg'>Modify</button> */}
      {/* {message && <p>{message}</p>} */}
    </div>
  );
}
export default Register;


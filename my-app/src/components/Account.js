import '../App.css';
import React, { useState } from "react";
// import '../style/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

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
    alert(form.photo+"et "+ form.full_name , form.email, form.cin, form.phone)
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
          <div>
            <div className='img'>
              {/* <p>Image enregistrée :</p> */}
              <img src={user[0].photo} alt="upload preview" width="200" />
            </div>
            <div className='notImage'>
              <label htmlFor='full_name'>Full name: </label>
              <input type='text' id='full_name' className='full_name' name='full_name' value={user[0].full_name} /><br />


              <label htmlFor='email'>Email: </label>
              <input type='email' id='email' className='email' name='email' value={user[0].email} /><br />

              <label htmlFor='cin'>CIN: </label>
              <input type='text' id='cin' className='cin' name='cin' value={user[0].cin} /><br />

              <label htmlFor='phone'>Phone: </label>
              <input type='number' id='phone' className='phone' name='phone' value={user[0].phone} required /><br />

            </div>
          </div>
          <div>
            <button className='btnLog' onClick={() => navigate("/")}>Quit</button>
            <button className='btnReg' onClick={() => setIsEditing(true)}>Modifier</button>
          </div>
        </div>


      ) : (
        <div>
          <div style={{ display: 'block' }}>
            <div className='img'>
              {form.photo ? (
                <img src={form.photo} alt="upload preview" width="200" />

              ):(
              <img src={user[0].photo} alt="upload preview" width="200" />
              )}
              {/* <img src={form.photo || user[0].photo} alt="upload preview" width="200" /> */}
              <input type="file" onChange={handleImageUpload} />
              {/* {form.photo && <img src={form.photo} alt="preview" width={100} />} */}

            </div>
            <div className='notImage'>
              <label htmlFor='full_name'>Full name: </label>
              <input type='text' id='full_name' className='full_name' name='full_name' value={form.full_name} onChange={form.full_name} required /><br />


              <label htmlFor='email'>Email: </label>
              <input type='email' id='email' className='email' name='email' value={form.email} onChange={form.email} required /><br />

              <label htmlFor='cin'>CIN: </label>
              <input type='text' id='cin' className='cin' name='cin' value={form.cin} onChange={form.cin} required /><br />

              <label htmlFor='phone'>Phone: </label>
              <input type='number' id='phone' className='phone' name='phone' value={form.phone} onChange={handleChange} required /><br />

            </div>
          </div>
          <div>

            <button className='btnLog' onClick={() => setIsEditing(false)}>Annuler</button>
            <button className='btnReg' onClick={() => handleSave()}>Sauvegarder</button>
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


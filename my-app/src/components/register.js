import '../App.css';
import React, { useState } from "react";
// import '../style/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register() {
	const navigate = useNavigate();

	const [full_name, setName] = useState("");
	const [photo, setPhoto] = useState("");
	const [email, setMail] = useState("");
	const [cin, setCin] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState('')
	const [confirmPsw, setConfPsw] = useState('')

	const [file, setFile] = useState(null);
	const [uploadedUrl, setUploadedUrl] = useState("");


	const pswMatch = password === confirmPsw
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {

		e.preventDefault();
		const formData = {
			name: full_name,
			email: email,
			cin: cin,
			phone: phone,
			photo: uploadedUrl,
			mot_de_passe: password
		}
		try {
			if (pswMatch) {

				const res = await fetch('http://localhost:5000/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				});

				const data = await res.json();
				if (res.ok) {
					setMessage(`${data.message}`)
				} else {
					setMessage(`Error be :  + ${data.message}`)
				}
			} else { setMessage(`Your inputed passwords don't match`) }
			// alert(message)

		} catch (error) {
			console.error(error);
			setMessage('Network error', error);
			// alert(error)

		}
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const res = await fetch("http://localhost:4000/upload", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();
			setUploadedUrl(data.url);

			// 👉 ici tu envoies data.url à ton backend principal
			// pour l'enregistrer dans la BDD (table `users.photo`)
			console.log("Lien de l'image :", data.url);
		} catch (err) {
			console.error("Erreur upload :", err);
		}
	};

	return (

		<div className='signup'>
			<h3>Welcome</h3>
			<form onSubmit={handleSubmit}>
				<div>
					<h2>Uploader une image</h2>
					<input type="file" onChange={handleFileChange} />
					<button onClick={handleUpload}>Uploader</button>

					{uploadedUrl && (
						<div>
							<p>Image enregistrée :</p>
							<img src={uploadedUrl} alt="upload preview" width="200" />
						</div>
					)}
				</div>
				<div>

					<label htmlFor='full_name'>Full name: </label>
					<input type='text' id='full_name' className='full_name' name='full_name' value={full_name} onChange={(e) => setName(e.target.value)} required /><br />

					{/* <label htmlFor='lastname'>Lastame: </label>
				<input type='text' id='lastname' className='lastname' name='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} required /><br /> */}

					<label htmlFor='email'>Email: </label>
					<input type='email' id='email' className='email' name='email' value={email} onChange={(e) => setMail(e.target.value)} required /><br />

					<label htmlFor='cin'>CIN: </label>
					<input type='text' id='cin' className='cin' name='cin' value={cin} onChange={(e) => setCin(e.target.value)} required /><br />

					<label htmlFor='phone'>Phone: </label>
					<input type='number' id='phone' className='phone' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required /><br />

					<label htmlFor='password'>Password: </label>
					<input type='password' id='password' className='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
					<label htmlFor='retry'>Reenter : </label>
					<input type='password' id='retry' className='retry' name='retry' value={confirmPsw} onChange={(e) => setConfPsw(e.target.value)} style={{ borderColor: confirmPsw && !pswMatch ? 'red' : '', borderWidth: '2px' }} required />
					{confirmPsw && !pswMatch && (
						<span style={{
							color: 'red'
						}}>❌</span>
					)}<br />

					<button className='btnLog' onClick={() => navigate("/login")}>Logon</button><button className='btnReg' type='submit'>Register</button>

				</div>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
export default Register;


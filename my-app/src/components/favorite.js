import Carte from '../shortcut/room_carte'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Next from '../shortcut/next'
import imaged from '../style/njz.jpeg'
import logo2 from '../style/logo2.jpg';



function Favorites() {
  const [rooms, setRooms] = useState([])
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));


  useEffect(() => {
    axios.get('http://localhost:5000/api/favorites/'+ 1)
      .then(res => setRooms(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room, index) => (
          <div key={index} className='panopli'>
            <Carte key={index} data={room}/>
          </div>
        ))
      ):(<p>Chargement</p>)}
      
      

    </>
  );
}

export default Favorites;
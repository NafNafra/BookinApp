import Carte from '../shortcut/room_carte'
import axios from 'axios'
import '../App.css'
import React, { useEffect, useState } from 'react'
import Next from '../shortcut/next'
import imaged from '../style/njz.jpeg'
import logo2 from '../style/logo2.jpg';



function Prospectus() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
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

export default Prospectus;
import { useNavigate } from 'react-router-dom';
import '../App.css'
import tofav from '../style/tofav.png'

import axios from 'axios';
import { useEffect, useState } from 'react';
function RoomCarte({ data }) {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms/dispo/' + [data.id])
      .then(res => {
        setRooms(res.data)
        console.log(res.data)
      }
      )
      .catch(err => console.error(err))
  }, [])


  const navigate = useNavigate();
  // console.log([data.id])
  return (
    <>
      {rooms.length == 1 ? (
        rooms.map((room, index) => (
          <span key={index} className='carte' >

            <div className='img'><img src={room.url_image} alt={room.alternative} /></div>
            <div className='info'>
              <div className='Details'>
                <h5><i>{[data.room_name]}</i></h5>
                <p ><strong>Location :</strong><em> {[data.location]}, {[data.roof]}</em></p>
                <p ><strong>Places :</strong><em> {room.capacity} seats</em></p>
                <p ><strong>Equipement :</strong><em> {room.equipements}</em></p>
                <p ><strong>Room disposal :</strong><em> {room.disposition} ...</em></p>
              </div>
              <button onClick={() => navigate('/booking/' + room.id)}>Book</button>
              <button onClick={() => navigate('/details/' + data.id)}>Details</button>
            </div>
          </span>

        ))
      ) : (
        <span className='carte' >
          <p>Chargement</p>
        </span>
      )
      }
    </>
  );
}

export default RoomCarte;


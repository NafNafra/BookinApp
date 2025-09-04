import '../App.css';
import React, { useEffect, useState } from "react";
import imaged from '../style/njz.jpeg'
import Btn from '../shortcut/button'
import Next from '../shortcut/next'
import logo2 from '../style/logo2.jpg';
import { useParams, useNavigate } from 'react-router-dom';
import tofav from '../style/tofav.png'
import { useAuth } from '../service/AuthContext';
import book_the_room from '../style/book_the_room.jpeg'



function Booking() {


  const { room_id } = useParams();
  const [room, setRoom] = useState([])
  const [dispos, setDispos] = useState([])
  const [images, setImages] = useState([])
  const [selectedDispo, setSelectedDispo] = useState(null)
  const [listImage, setShowedImage] = useState(null);
  const [topImage, setTopImage] = useState();
  const navigate = useNavigate()


  useEffect(() => {
    fetch('http://localhost:5000/api/' + room_id + '/details')
      .then(res => res.json())
      .then(data => {
        setRoom(data)
        localStorage.setItem("room_id", data[0].id_room);
      })
      .catch(error => console.error("Error fetching data: ", error)
      )
    fetch('http://localhost:5000/api/' + room_id + '/dispos')
      .then(res => res.json())
      .then(data => {
        setDispos(data)
        if (data.length > 0) {
          setSelectedDispo(data[0]);
        }
      })
      .catch(error => console.error("Error fetching data: ", error)
      )

    fetch('http://localhost:5000/api/' + room_id + '/images')
      .then(res => res.json())
      .then(data => {
        setImages(data)
        if (data.length > 0) {
          setShowedImage(data[0]); // par defaut le premier image 
        }
      })
      .catch(error => console.error("Error fetching data: ", error)
      )
  }, []);

  const handleBookingStart = (id_room_dispositions, id_room, id_disposition) => {
    alert(id_room_dispositions)
    alert(id_room)
    alert(id_disposition)
    // /bookit/

  }

  const addFavorite = () => {
    const user = JSON.parse(localStorage.getItem('utilisateur'));
    const user_it = user.id
    fetch('http://localhost:5000/api/addfavorite/' + room_id + '/' + user_it)
      .then((res) => res.json())
      .then((data) => {
        alert(data.message)
        // setBookedForDay((prev =>
        //   prev.map((r) => (r.id === id ? { ...r, status: data.status } : r)))
        // )  
      })
    // alert(user.id)
  }

  if (!room) {
    return <p>Chargement...</p>
  }

  return (
    <>

      <div className='roomInfo'>
        <div className='roomDescrip'>
          <span className='carte1' >
            {room.map(salle => (
              <div key={salle.id_room} className='info'>
                <h2><i>{salle.room_name}</i></h2>
                <p ><strong>Location :</strong> {salle.location}, {salle.roof}</p>
                <p ><strong>Room type :</strong> {salle.room_type}</p>
                <p ><strong>Description :</strong>{salle.description}</p>
                <p ><strong>Equipement :</strong><em> {salle.equipements}</em></p>
              </div>
            ))}
            <div className='img1' >
              <img src={listImage ? [listImage.url_image] : imaged} alt={listImage ? [listImage.alternative] : "image not loaded"} />
              < div className='imageBlock'  >
                <div className='fav' onClick={addFavorite}><img src={tofav} style={{ width: '20px', height: '20px', borderRadius: '50px' }} /></div>

                {images.map(image => (
                  <div key={image.id} className='circle' onClick={() => setShowedImage(image)}></div>
                ))}
              </div>

            </div>
          </span>
        </div>
        <div className='bookingDisplay' onClick={() => navigate('/bookit/' + [selectedDispo.id])}><img src={book_the_room}/></div>
        <div className='roomDisplay'>
          <h4>Room disposition and prices</h4>
          <div className='dispositions'>
            {dispos.map(dispo => ( // id, id_room, id_disposition, capacity, price, disposition
              <div key={dispo.id} className='dispo' onClick={() => setSelectedDispo(dispo)}></div>
            ))}
            <div>
              {/* <p>ID : <em className='dispoEm'> {selectedDispo ? [selectedDispo.id] : ""}</em></p> */}
              <p>Disposition : <em className='dispoEm'> {selectedDispo ? "en " +  [selectedDispo.disposition] : ""}</em></p>
              <p>Place number: <em className='placeEm'> {selectedDispo ? [selectedDispo.capacity] +" persons" : ""} </em></p>
              <p>Hourly price: <em className='priceEm'> {selectedDispo ? [selectedDispo.price] + " €/h" : ""}</em></p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Booking;
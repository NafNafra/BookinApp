import '../App.css';
import React, { useState, useEffect, useContext, useCallback } from "react";
import { data, useParams } from 'react-router-dom';
import imaged from '../style/njz.jpeg'
import Calendar from 'react-calendar'
import { AuthContext } from '../service/AuthContext';
import verify from '../style/verify.png'
import bookit from '../style/bookit.png'
import search from '../style/searchforme.png'

function Booking_page() {
  const { utilisateur } = useContext(AuthContext);
  const { id_bp } = useParams();
  const [room, setRoom] = useState([])
  const [dispos, setDispos] = useState([])
  const [images, setImages] = useState([])
  const [selectedDispo, setSelectedDispo] = useState(null)
  const [listImage, setShowedImage] = useState(null);
  // const [raid, setRaid] = useState([])
  const rid = localStorage.getItem("room_id");


  const [topImage, setTopImage] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const [hours, setHours] = useState({});

  const handleDateClick = (date) => {
    const dateString = date.toDateString()
    if (selectedDates.some(d => d.toDateString() === dateString)) {
      setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateString))
    } else {
      if (selectedDates.length > 4) {
        selectedDates.shift()
      }
      setSelectedDates([...selectedDates, date]);
    }
  }

  const titleClassName = ({ date, view }) => {
    if (view === 'month' && selectedDates.some(d => d.toDateString() === date.toDateString())) {
      return 'selected-date';
    }
    return null;
  }

  const toMinutes = (time) => {
    if (!time) return null
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes;
  }

  const isValidTime = (dateKey) => {
    const dateHours = hours[dateKey];
    if (!dateHours) return false
    const start = toMinutes(dateHours.start);
    const end = toMinutes(dateHours.end);
    if (start === null || end === null) return false
    return end - start >= 60 && end - start <= 240
  }

  const handleVerify = async (dateKey) => {
    const dateHours = hours[dateKey];
    if (!dateHours) return alert("Veuillez entrer les heures");
    console.log(selectedDispo.id + " " + dateKey + " " + dateHours.start + " " + dateHours.end + " .")
    try {
      // console.log(selectedDispo.id)
      const res = await fetch("http://localhost:5000/api/check-dispo", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
        ,
        body: JSON.stringify({
          roomdisposition_id: selectedDispo.id,
          date: dateKey,
          start_time: dateHours.start,
          end_time: dateHours.end,
        }),
      });

      const data = await res.json();

      if (res.ok && data.available) {
        alert(`✅ ${dateKey} de ${dateHours.start} à ${dateHours.end}`);
        return true;
      }
      else {
        alert(`❌ : ${data.message + "créneau déjà réservé"}`);
        return false;
      }
    } catch (err) {
      console.error("Erreur de vérification :", err);
      alert("Erreur serveur lors de la vérification");
      // return false;
    }
  };
  const handleReserve = async (dateKey) => {
    const ok = await handleVerify(dateKey);
    if (!ok) return; // si pas dispo → on arrête

    const dateHours = hours[dateKey];
    console.log(selectedDispo.id + " " + utilisateur.id + " " + rid)

    const bookingPayload = {
      room_id: rid,
      roomdisposition_id: selectedDispo.id,
      user_id: utilisateur.id,
      dates: [
        {
          date: dateKey,
          start_time: dateHours.start,
          end_time: dateHours.end,
        },
      ],
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookingdates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Réservation réussie !");
        console.log("Booking saved:", data);

        // Marquer comme réservé → ex : remplacer boutons par "Fini"
        setHours((prev) => ({
          ...prev,
          [dateKey]: { ...prev[dateKey], reserved: true },
        }));
      } else {
        alert(`Erreur : ${data.message}`);
      }
    } catch (err) {
      console.error("Erreur de réservation :", err);
      alert("Impossible de contacter le serveur");
    }
  };


  function appel(callback) {

    fetch('http://localhost:5000/api/' + id_bp + '/roomdispo') // to get room_disposition.id_room
      .then(res => res.json())
      .then((data1) => {
        // const [anne] = [data1[0].id, data1[0].id_room, data1[0].id_disposition, data1[0].capacity, data1[0].price]
        callback(data1[0].id_room)
      })
  }

  function appel1(callback1) {
    fetch('http://localhost:5000/api/' + id_bp + '/roomdispo') // to get room_disposition.id_disposition
      .then(res => res.json())
      .then((data1) => {
        // const [anne] = [data1[0].id, data1[0].id_room, data1[0].id_disposition, data1[0].capacity, data1[0].price]
        callback1(data1[0].id_disposition)
      })
  }

  useEffect(() => {
    appel((val) => {
      console.log("Work? " + val)
      fetch('http://localhost:5000/api/' + val + '/details')
        .then(res => res.json())
        .then(data => setRoom(data)) // get detail of the room
        .catch(error => console.error("Error fetching data: ", error)
        )
      fetch('http://localhost:5000/api/' + val + '/images')
        .then(res => res.json())
        .then(data => {
          setImages(data) // get images of room
          if (data.length > 0) {
            setShowedImage(data[0]); // par defaut le premier image 
          }
        })
        .catch(error => console.error("Error fetching data: ", error)
        )
    });

    appel1((val1) => {
      console.log(val1)
      fetch('http://localhost:5000/api/' + val1 + '/disposition')
        .then(res => res.json())
        .then(data => {
          setDispos(data) //show 
          if (data.length > 0) {
            // console.log("data.length"+ data.length)
            setSelectedDispo(data[0]);
          }
        })
        .catch(error => console.error("Error fetching data: ", error)
        )
    })

  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    alert(id_bp)
    if (!selectedDispo) {
      alert("Veuillex selectionner une disposition de salle")
      return
    }
    if (selectedDates.length === 0) {
      alert("Veuillez selectionner au moins une date")
      return
    }
    if (!isValidTime()) {
      alert("L'heure de fin doit etre un heure plus grande que que le debut")
      return
    }

    const bookingDate = {
      // : id_bp,
      disposition_id: selectedDispo.id,
      user_id: utilisateur.id,
      dates: selectedDates.map(d => {
        const dataKey = d.toISOString().split("T")[0];
        return {
          data: dataKey,
          start_time: hours[dataKey]?.start,
          end_time: hours[dataKey]?.end,
        }
      })
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingDate)
      });
      if (res.ok) {
        const data = await res.json();
        alert("Reservation reussie");
        console.log("Booking created", data);
      } else {
        const err = res.json()
        alert("Erreur : " + err.message);
      }
      // alert(bookingDate.dates.length)
    } catch (error) {
      console.error("Booking error : ", error)
      alert("Impossible de contacter le serveur")
    }
  }


  if (!room) {
    return <p>Chargement...</p>
  }


  return (
    <>
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
                  {/* <p ><strong>Room Disposition :</strong><em> {selectedDispo ? [selectedDispo.id] : "null"}</em></p> */}
                  <p ><strong>Disposition :</strong><em> {selectedDispo ? [selectedDispo.disposition] : "null"}</em></p>
                  <p ><strong>Capacity :</strong><em> {selectedDispo ? [selectedDispo.capacity] : "null"}</em></p>
                  <p ><strong>Hourly price :</strong><em> {selectedDispo ? [selectedDispo.price] : "null"}</em></p>
                </div>
              ))}
              {/* {raid.map(doc => (
                <>
                  {doc.id} {doc.id_room} {doc.id_disposition} {doc.id}

                </>
              ))} */}
              <div className='img1' >

                <img src={listImage ? [listImage.url_image] : imaged} alt={listImage ? [listImage.alternative] : "image not loaded"} />
                < div className='imageBlock' >

                  {images.map(image => (
                    <div key={image.id} className='circle' onClick={() => setShowedImage(image)}></div>
                  ))}</div>
              </div>
            </span>
          </div>
          {/* <div className='bookingDisplay'></div> */}

        </div>

      </>
      <div className='bookinCalendar' >
        <div className='bookingCalendar'>
          <h4>Calendar Section</h4>
          <Calendar onClickDay={handleDateClick}
            tileClassName={titleClassName}
          />
          <div>
            {selectedDates.length > 0 ? (
              <p><strong>NB : </strong>{rid}. Curabitur iaculis torquent urna faucibus imperdiet commodo eu.</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div className='bookingHourSection'>
          <h4>Hours selection</h4>
          <div className='item'>
            {selectedDates.length > 0 ?
              selectedDates.map((d, i) => {
                const dateKey = d.toLocaleDateString("fr-CA") //d.toISOString().split("T")[0];
                return (
                  <div key={i} className='container'>
                    <div>
                      <strong style={{ fontSize: 'x-large' }}>Date : </strong>
                      {dateKey}
                    </div>
                    <div>
                      <span>
                        <label>Start</label>
                        <input type='time' style={{ width: '130px' }} value={hours[dateKey]?.start || ""} onChange={(e) => setHours({ ...hours, [dateKey]: { ...hours[dateKey], start: e.target.value } })} /> </span>
                      <span>
                        <label>End</label>
                        <input type='time' style={{ width: '130px' }} value={hours[dateKey]?.end || ""} onChange={(e) => setHours({ ...hours, [dateKey]: { ...hours[dateKey], end: e.target.value } })} /> </span>
                      {/* <input type='time'  style={{ width: '130px' }} /> */}
                    </div>
                    <div className='bookingBtn'>
                      {isValidTime(dateKey) ? (
                        hours[dateKey].reserved ? (
                          <p><strong>Fini ✅</strong></p>
                        ) : (
                          <>
                            <button><img src={verify} className='icons' alt='Verify' onClick={() => handleVerify(dateKey)} />Verify</button>
                            <button><img src={bookit} className='icons' alt='Book it' onClick={() => handleReserve(dateKey)} />Book it</button>
                          </>
                        )
                      ) : (
                        <>
                          <button>Choose valide hours</button>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              ) : (
                <div>
                  <p><strong>NB : </strong>Pharetra cum quisque accumsan mus vitae nostra vulputate. Curabitur iaculis torquent urna faucibus imperdiet commodo eu.</p>
                </div>)}
          </div>
        </div>
        {/* <div> <button type='submit' onClick={handleBooking}>Reserver</button>  </div> */}
      </div>
    </>
  );
}

export default Booking_page;
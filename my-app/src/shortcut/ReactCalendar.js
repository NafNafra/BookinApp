import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../App.css'

import verify from '../style/verify.png'
import bookit from '../style/bookit.png'
import search from '../style/searchforme.png'
import {  useNavigate } from 'react-router-dom';

function ReactCalendar() {
  const navigate = useNavigate();


  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));


  const [booking, setBooking] = useState([])

  const [selectedDates, setSelectedDates] = useState(null);
  const [bookedForDay, setBookedForDay] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/mybooking/" + utilisateur.id)
      .then((res) => res.json())
      .then(data => {
        setBooking(data)
      })
      .catch((error) => console.error(error))
  }, [utilisateur.id]);

  const getStatus = (date) => {
    const book = booking.find(
      (r) => new Date(r.date).toLocaleDateString() === date.toLocaleDateString()
    );
    return book ? book.status : null
  }

  const handleUse = (id, status) => {
    fetch('http://localhost:5000/update/booking/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
      .then((res) => res.json())
      .then((data) => {
        // window.location.href = '/mycalendar'
        setBooking((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: data.status } : r))
        );
        setBookedForDay((prev =>
          prev.map((r) => (r.id === id ? { ...r, status: data.status } : r)))
        )
      })
  }

  const handleDetails = (idA) => {
    localStorage.setItem("bookingId", idA)
    navigate('/bookingdetail')
    // alert(idA)
  }

  const handleModify = (idA) => {
    localStorage.setItem("bookingId", idA)
    navigate('/bookingmodify')
    // alert(idA)
  }

  const handleDateClick = (date) => {
    setSelectedDates(date);

    const dayReservation = booking.filter(
      (r) => new Date(r.date).toLocaleDateString() === date.toLocaleDateString()
    )
    setBookedForDay(dayReservation);
  }

  const toBeatifulDate = (dateRes) => {
    let date1 = new Date(dateRes);
    date1 = date1.toLocaleDateString("eg-EG", { day: "numeric", month: "long", year: "numeric" });
    console.log(date1)
    return date1
  }

  return (
    <div>
      <div className='bookingCalendar'>
        <h4>Calendar Section</h4>
        <Calendar
          onClickDay={handleDateClick}
          tileContent={({ date }) => {
            const status = getStatus(date);
            if (status === "reserved") return <div className='bookedDayReserved'></div>
            if (status === "in_use") return <div className='bookedDayInUse'> </div>
            if (status === "completed") return <div className='bookedDayComplet'></div>
            if (status === "canceled") return <div className='bookedDayCancel'></div>
            return null
          }}
        />
      </div>

      <div className='bookingHourSection'>
        <h4>Hours selection </h4>
        <div className='bookInfo'>
          <div className='containerInfo'>
            {bookedForDay.length > 0 ? (
              <div>
                {bookedForDay.map((res) => (
                  <div key={res.id} >
                    <div className='detailSchedule'>
                      <p><strong style={{ fontSize: 'large' }}> {toBeatifulDate(res.date)} at {res.id} </strong></p>
                      <p><strong>From {res.start_time} to {res.end_time}</strong></p>
                      <p><strong>Place : {res.location} , {res.id}</strong></p>
                      <p><strong>Status :   {res.status}</strong></p>
                    </div>
                    <div className='bookingBtn modifSchedule'>
                      {res.status === "reserved" ? (
                        <>
                          <button onClick={() => handleUse(res.id, "in_use")}><img src={bookit} className='icons' alt='Book it' /><b >Use </b></button>

                          <button onClick={() => handleDetails(res.id_booking)}><img src={verify} className='icons' alt='Verify' /><b>Details</b></button>
                          <button onClick={() => handleModify(res.id_booking)}><img src={bookit} className='icons' alt='Book it' /><b>Modify </b></button>

                          <button onClick={() => handleUse(res.id, "canceled")}><img src={search} className='icons' alt='Search' /><b>Cancel </b></button>
                        </>
                      ) : (
                        null
                      )}
                      {res.status === "in_use" ? (
                        <>
                          <button onClick={() => handleUse(res.id, "completed")}><img src={bookit} className='icons' alt='Book it' /><b>Finish</b></button>

                          <button onClick={() => handleDetails(res.id_booking)}><img src={verify} className='icons' alt='details' /><b>Details</b></button>
                        </>
                      ) : (
                        null
                      )}
                      {res.status === "completed" || res.status === "canceled" ? (
                        <>
                          <button onClick={() => handleDetails(res.id_booking)}><img src={verify} className='icons' alt='Verify' /><b>Details</b></button>
                        </>
                      ) : (
                        null
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Affichage en cours</p>
            )}
          </div>
        </div>
      </div>

      {/* <div className='price'></div> */}

    </div>
  );
}

export default ReactCalendar;
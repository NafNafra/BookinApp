import React, { useEffect, useState , useContext} from "react";
import { AuthContext } from '../service/AuthContext';


function MyReservations() {
  const user= localStorage.getItem("idUser")
  
  const [reservations, setReservations] = useState([]);

  useEffect(() => {

    fetch(`http://localhost:5000/api/users/`+ user+`/reservations`)
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mes réservations</h2>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée</p>
      ) : (
        <ul>
          {reservations.map((r) => (
            <li key={r.booking_id}>
              {r.room_name} - {r.disposition} <br />
              📅 {r.date} ⏰ {r.start_time} → {r.end_time} <br />
              Statut: {r.booking_date_status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyReservations;

// backend/server.js
import mysqlPromise from "mysql2/promise"
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'


// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')
// const bodyParser = require('body-parser')

import mypromse from "mysql2/promise";



const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON

const db = mysql.createConnection({
  host: "localhost",
  user: "nodeuser1",
  password: "MOTdepasseforte09877890987789?",
  database: "greattour"
});

const promise = await mysqlPromise.createConnection({
  host: "localhost",
  user: "nodeuser1",
  password: "MOTdepasseforte09877890987789?",
  database: "greattour"
})
const pool = mypromse.createPool({
  host: "localhost",
  user: "nodeuser1",
  password: "MOTdepasseforte09877890987789",
  database: "greattour",
});





db.connect(err => {
  if (err) {
    console.error("Connexion echouee " + err.stack);
    return;
  }
  console.log("Base de donnees connectee");
});

app.get('/api/:rd_id/roomdispo', (req, res) => {
  const rd_id = req.params.rd_id;
  const sql = 'select * from room_disposition where id = ? LIMIT 1;'; //id de la roomdisposition

  db.query(sql, [rd_id], (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(result);
  })
})

app.get('/api/:booking_id/booking', (req, res) => {
  const booking_id = req.params.booking_id;
  const sql = 'select * from booking b JOIN room r ON b.id_room = r.id JOIN room_disposition rd ON r.id = rd.id_room WHERE b.id = ? LIMIT 1;'; //id de la roomdisposition

  db.query(sql, [booking_id], (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(result);
  })
})



app.get('/api/:roomId/details', (req, res) => {
  const roomId = req.params.roomId;

  const sql = "SELECT \
    r.room_name, \
    r.location, \
    r.roof, \
    r.description, \
    rt.room_type, \
    re.id_room, \
    GROUP_CONCAT(DISTINCT e.nom ORDER BY e.nom SEPARATOR ', ') AS equipements \
    FROM room r \
    JOIN room_equipment re ON r.id = re.id_room \
    JOIN equipment e ON re.id_equipment = e.id \
    JOIN room_type rt ON r.room_type = rt.id \
    WHERE r.id = ? \
    GROUP BY r.room_name, r.location, r.roof, r.description, rt.room_type, re.id_room \
    ORDER BY r.room_name DESC \
    LIMIT 1;";

  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(result);
  });

})

app.get('/api/:roomId/dispos', (req, res) => {
  const roomId = req.params.roomId;

  const sql = "SELECT * \
      FROM room_disposition rd \
      JOIN dispositions d ON rd.id_disposition = d.id \
      WHERE rd.id_room = ?;"
  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(result);
  });

})


app.get('/api/:roomId/disposition', (req, res) => {
  const roomId = req.params.roomId;

  const sql = "SELECT * \
      FROM room_disposition rd \
      JOIN dispositions d ON rd.id_disposition = d.id \
      WHERE rd.id_disposition = ?;"
  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(result);
  });

})
app.get('/api/:roomId/images', (req, res) => {
  const roomId = req.params.roomId;

  const sql = "SELECT * \
      FROM room r \
      JOIN images i ON r.id = i.id_room \
      WHERE r.id = ?;";
  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(result);
  });

})
// 
// Use room
app.post('/update/booking/:id_booking', async (req, res) => {
  const id_booking = req.params.id_booking;
  const { status } = req.body
  const sql = "update booking_dates set status = ? where id = ?;"
  db.query(sql, [status, id_booking], (error) => {
    if (error) {
      console.error('Erreur d insertion :', error);
      return res.status(500).json({ message: "Server error" });
    }
    else {
      console.log(id_booking)
      res.status(201).json({ message: "Update successful" });
      console.log(status)

    }
    return
  })
})

// Register :
app.post('/register', async (req, res) => {
  const { name, email, cin, phone, photo, mot_de_passe } = req.body;

  // 1. Hachage du mot de passe
  const saltRounds = 10;
  // await   
  const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);


  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Query verification error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (results.length > 0) {
      return res.status(201).json({ message: 'Utilisateur déjà existant' });
    }
    if (results.length == 0) {

      // 2. Insertion dans la base de données
      const sqlin = `INSERT INTO users (full_name, email, cin, phone,photo , password) VALUES (?, ?, ?, ?, ?, ?)`;

      const values = [name, email, cin, phone, photo, hashedPassword];

      db.query(sqlin, values, (error) => {
        if (error) {
          console.error('Erreur d insertion :', error);
          return res.status(500).json({ message: "Server error" });
        }
        else {
          console.log('yeh')
          return res.status(201).json({ message: "Yes" });
        }
      });

    }
  });
});

app.post('/modify', async (req, res) => {
  const { name, email, cin, phone, photo, mot_de_passe } = req.body;

  // 1. Hachage du mot de passe
  const saltRounds = 10;
  // await   
  const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);


  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Query verification error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (results.length > 0) {
      return res.status(201).json({ message: 'Utilisateur déjà existant' });
    }
    if (results.length == 0) {

      // 2. Insertion dans la base de données
      const sqlin = `INSERT INTO users (full_name, email, cin, phone,photo , password) VALUES (?, ?, ?, ?, ?, ?)`;

      const values = [name, email, cin, phone, photo, hashedPassword];

      db.query(sqlin, values, (error) => {
        if (error) {
          console.error('Erreur d insertion :', error);
          return res.status(500).json({ message: "Server error" });
        }
        else {
          console.log('yeh')
          return res.status(201).json({ message: "Yes" });
        }
      });

    }
  });
});

// Login: 
app.post('/login', (req, res) => {
  const { mail, mot_de_passe } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [mail], (err, results) => {

    if (results.length == 0) {
      return res.status(401).json({ message: 'User not found' });
    }
    else {
      const utilisateur = results[0];

      console.log(utilisateur.id, utilisateur.password)
      // Comparer le mot de passe saisi avec le hash en base
      bcrypt.compare(mot_de_passe, utilisateur.password, (error, isMatch) => {
        if (!isMatch) {
          console.error('Erreur de bcrypt :', error);
          return res.status(401).json({ message: 'Password incorrect' });
        }

        return res.status(200).json({
          message: 'Connexion réussie',
          utilisateur: {
            id: utilisateur.id,
            full_name: utilisateur.full_name,
            email: utilisateur.email,
            cin: utilisateur.cin,
            phone: utilisateur.phone,
            photo: utilisateur.photo
          }
        });
      });
    }
  });
});

// app.post('/userinfo', (req, res) => {
//   const { id } = req.body;

//   console.log(id)
//   const sql = 'SELECT * FROM users WHERE id = ?';
//   db.query(sql, [id], (err, results) => {

//     if (results.length == 0) {
//       return res.status(401).json({ message: 'User not found' });
//     }
//     if(err) console.log(err)
//     else {
//       const utilisateur = results[0];
//       return res.status(200).json(results);
//       // 
//     }
//   });
// });

app.get('/api/rooms', (req, res) => {
  const sql = 'select * from room;';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(result);
  });
});

//select * from room r JOIN favorite f ON r.id = f.id_room JOIN users u ON f.id_user = u.id where u.id = ?;
app.get('/api/favorites/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sql = 'select * from room r JOIN favorite f ON r.id = f.id_room JOIN users u ON f.id_user = u.id where u.id = ?;';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(
      result
    );
  });
});

app.get('/api/addfavorite/:id_room/:user_it', (req, res) => {
  const id_room = req.params.id_room;
  const id_user = req.params.user_it

  const sqlf = 'SELECT * FROM favorite WHERE id_user = ? AND id_room = ?';
  db.query(sqlf, [id_user, id_room], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if(results.length > 0) return res.status(500).json({ message: 'Already favorite' });

    const sql = 'INSERT INTO favorite(id_user, id_room) VALUES (?,?);';
    db.query(sql, [id_user, id_room], (err, result) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      return res.json({ message: "Added to favorites" });
    });
  })


})


app.post('/api/bookings', (req, res) => {
  const { room_id, disposition_id, user_id, dates } = req.body;

  if (!room_id || !disposition_id || !user_id || !dates || dates.length === 0) {
    return res.status(400).json({ error: "Champs manquant" })
  }
  if (dates.length > 0) {
    const sql = 'INSERT INTO booking(id_room, id_room_disposition,id_user) VALUES (?,?,?)'

    db.query(sql, [room_id, disposition_id, user_id], async (err) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      else {
        const [getId] = await promise.execute('SELECT * from booking WHERE id_room = ' + room_id + ' AND id_room_disposition = ' + disposition_id + ' AND id_user = ' + user_id + ' LIMIT 1; ');
        let users = getId;
        let realId = users.map(user => ({
          id: user.id
        }))
        if (realId.length > 0) {
          for (const r of dates) {
            const { date, start_time, end_time } = r
            const sqlDate = 'INSERT INTO booking_dates(id_booking, date , start_time , end_time) VALUES(?,?,?,?);'

            db.query(sqlDate, [realId[0].id, date, start_time, end_time], (error) => {
              if (error) {
                console.error('Erreur d insertion :', error);
                return res.status(500).json({ message: "Server error" });
              }
              else {
                console.log('yeh')
                return res.status(201).json({ message: "Reservation efectuee avec succes" });
              }
            })
          }
        }
      }
    })
  }
})



app.get('/insert', async (req, res) => {
  const find = '1452'
  const [rows] = await promise.execute('SELECT * FROM users WHERE full_name = "Olivier McDonnagual" AND email= "mc@olivier.co" AND cin= "1452" AND phone= "' + find + '" AND photo= "' + find + '" AND password=  "' + find + '";',);
  let users = rows;

  let resultatTraite = users.map(user => ({
    id: user.id
  }))

  res.json(resultatTraite)

  console.log("NOuvelle utilisateur : ", resultatTraite[2].id)
})


app.get('/api/rooms/dispo/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT \
                rd.id, \
                rd.capacity, \
                rd.price, \
                d.disposition, \
                i.id_room, \
                i.url_image, \
                i.alternative,\
                re.id_room, \
                GROUP_CONCAT(DISTINCT e.nom ORDER BY e.nom SEPARATOR ', ') as equipements \
                FROM room_disposition rd \
                JOIN dispositions d ON rd.id_disposition = d.id JOIN images i \
                JOIN room_equipment re \
                JOIN equipment e ON re.id_equipment = e.id \
                WHERE rd.id_room = ? AND i.id_room = ? \
                GROUP BY rd.id, rd.capacity, rd.price, d.disposition, i.id_room, i.url_image, i.alternative, re.id_room \
                ORDER BY rd.id ASC \
                LIMIT 1;"

  db.query(sql, [id, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database fetch error" });
    }
    return res.json(result);
  })
})

app.get('/mybooking/:id', (req, res) => {
  const id = req.params.id;
  const sql = "select * from room r JOIN booking b ON r.id = b.id_user  JOIN booking_dates bd ON bd.id_booking = b.id WHERE b.id_user = ? ;"; //select * from booking_dates bd JOIN booking b ON bd.id_booking = b.id WHERE b.id_user= ? ;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database fetch error" });
    }
    return res.json(result);
  });
})

app.get('/mybookinghour/:booking_id', (req, res) => {
  const booking_id = req.params.booking_id;
  const sql = "select * \
  from room r \
  JOIN booking b ON r.id = b.id_user  \
  JOIN booking_dates bd ON bd.id_booking = b.id \
  JOIN room_disposition rd ON r.id = rd.id_room \
  JOIN dispositions d ON d.id = rd.id_disposition \
  WHERE bd.id_booking = ? ;"; //select * from booking_dates bd JOIN booking b ON bd.id_booking = b.id WHERE b.id_user= ? ;

  db.query(sql, [booking_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database fetch error" });
    }
    return res.json(result);
  });
})



app.get("/api/room/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM room r JOIN room_type rt ON r.room_type = rt.id  WHERE r.id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database fetch error" });
    }
    return res.json(result);
  });
});


app.post("/api/check-dispo", (req, res) => {
  const { roomdisposition_id, date, start_time, end_time } = req.body;
  console.log(roomdisposition_id + " " + date + " " + start_time + " " + end_time)
  try {
    const sql = " SELECT bd.* \
                  FROM booking_dates bd \
                  JOIN booking b ON b.id = bd.id_booking \
                  WHERE b.id_room_disposition = ? \
                  AND  bd.date = ? \
                  AND ( \
                    (bd.start_time BETWEEN ? AND ?) \
                    OR (bd.end_time BETWEEN ? AND ?) \
                  ) AND bd.status != 'canceled' \
                  ; "

    // AND ((bd.start_time BETWEEN '08:00:00' AND '10:00:00')\

    db.query(sql, [roomdisposition_id, date, start_time, end_time, start_time, end_time, start_time, end_time], (err, result) => {
      if (err) {
        console.log(err)

        return res.status(500).json({ error: "Database fetch error" });
      }
      if (result.length > 0) {
        console.log(result.length)
        return res.status(200).json({ available: false, message: "Already booked " });
      }
      console.log(result.length)
      // return res.json(result);
      return res.status(200).json({ available: true, message: "Embrasure free" });
    });
  } catch (err) {
    console.error("Erreur check-dispo :", err);
    return res.status(500).json({ message: "Serveur not valable " });
  }
});

// ---------------------
// Créer une réservation
// ---------------------
app.post("/api/bookingdates", async (req, res) => {
  const { room_id, roomdisposition_id, user_id, dates } = req.body;

  console.log(room_id + "  " + roomdisposition_id + " " + user_id)
  // const conn = await pool.getConnection();
  try {
    // await conn.beginTransaction();

    // 1) Créer le booking principal
    const [result] = await promise.execute("INSERT INTO booking (id_room, id_room_disposition, id_user) VALUES (?, ?, ?)",
      [room_id, roomdisposition_id, user_id]
    );
    let uniqueId = result.insertId;

    // console.log("oklahoma " + uniqueId)
    // 2) Insérer les dates choisies
    for (const d of dates) {
      db.query(
        "INSERT INTO booking_dates (id_booking, date, start_time, end_time, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
        [uniqueId, d.date, d.start_time, d.end_time, "reserved"]
      );
    }
    console.log('Finit ' + uniqueId)
    res.status(201).json({ message: "Réservation réussie", booking_id: uniqueId });
  } catch (err) {
    // await conn.rollback();
    console.error("Erreur réservation :", err);
    res.status(500).json({ message: "Erreur lors de la réservation" });
  }
});

///api/bookingdatesmodif

app.post("/api/bookingdatesmodif", async (req, res) => {
  const { booking_id, dates } = req.body;

  // booking_id: bookingId,
  //     dates: [
  //       {
  //         date: dateKey,
  //         start_time: dateHours.start,
  //         end_time: dateHours.end,
  //       },
  //     ],
  console.log(room_id + "  " + roomdisposition_id + " " + user_id)
  // const conn = await pool.getConnection();
  // try {
  // await conn.beginTransaction();

  // 1) Créer le booking principal
  // const [result] = await promise.execute("INSERT INTO booking (id_room, id_room_disposition, id_user) VALUES (?, ?, ?)",
  //   [room_id, roomdisposition_id, user_id]
  // );
  // let uniqueId = result.insertId;

  // console.log("oklahoma " + uniqueId)
  // 2) Insérer les dates choisies
  for (const d of dates) {
    db.query(
      "UPDATE booking_dates set start_time = ? , end_time = ? WHERE id_booking = ?",
      [d.start_time, d.end_time, booking_id]
    );
  }
  console.log('Finit ' + uniqueId)
  res.status(201).json({ message: "Réservation réussie", booking_id: uniqueId });
  // } catch (err) {
  //   // await conn.rollback();
  //   console.error("Erreur réservation :", err);
  //   res.status(500).json({ message: "Erreur lors de la réservation" });
  // }
});

app.get("/api/users/:id/reservations", (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT 
        b.id AS booking_id,
        r.room_name,
        d.disposition,
        bd.date,
        bd.start_time,
        bd.end_time,
        bd.status AS booking_date_status
    FROM booking b
    JOIN booking_dates bd ON b.id = bd.id_booking
    JOIN room r ON b.id_room = r.id
    JOIN room_disposition rd ON b.id_room_disposition = rd.id
    JOIN dispositions d ON rd.id_disposition = d.id
    WHERE b.id_user = ?
    ORDER BY bd.date, bd.start_time
  `;

  try {
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      return res.json(result);
    });
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération réservations" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;

  const sql = `SELECT id, full_name, email, cin, phone, photo 
               FROM users WHERE id = ?`;

  try {
    db.query(sql, [userId], (err, result) => {
      if (err) return res.status(404).json({ error: "Erreur de chargement " + err });
      if (result.length === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      console.log("OK")
      res.json(result);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération utilisateur" });
  }
});

app.put("/api/modify/:id", async (req, res) => {
  const { full_name, email, phone, photo } = req.body;
  const id = req.params.id;
  if (full_name) {
    try {
      await db.query(
        "UPDATE users SET full_name=? WHERE id=?",
        [full_name, id]
      );
      const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erreur mise à jour utilisateur" });
    }
  }

  if (email) {
    try {
      await db.query(
        "UPDATE users SET email=? WHERE id=?",
        [email, id]
      );
      const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erreur mise à jour utilisateur" });
    }
  }
  if (phone) {
    try {
      await db.query(
        "UPDATE users SET phone=? WHERE id=?",
        [phone, id]
      );
      const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erreur mise à jour utilisateur" });
    }
  }
  if (photo) {
    try {
      await db.query(
        "UPDATE users SET photo=? WHERE id=?",
        [full_name, id]
      );
      const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
      return res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erreur mise à jour utilisateur" });
    }

  }
  // try {
  //   await db.query(
  //     "UPDATE users SET full_name=?, email=?, phone=?, photo=? WHERE id=?",
  //     [full_name, email, phone, photo, id]
  //   );
  //   const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
  //   res.json(rows[0]);
  // } catch (err) {
  //   res.status(500).json({ error: "Erreur mise à jour utilisateur" });
  // }
});


app.get("/api/:bookingId/booking_dates", (req, res) => {
  const bookingId = req.params.bookingId;
  const sql = "select * from booking b JOIN booking_dates db ON b.id = db.id_booking WHERE b.id = ?;"

  try {
    db.query(sql, [bookingId], (err, result) => {
      if (err) return res.status(404).json({ error: "Erreur de chargement " + err });
      if (result.length === 0) {
        return res.status(404).json({ error: "Data failed to updload" });
      }
      console.log("OK")
      res.json(result);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération utilisateur" });
  }

})
// 


// Modification des heures de reservations
app.put("/api/bookinghours/:bookingId", async (req, res) => {
  const bookingId = req.params.bookingId;
  const { date, start_time, end_time } = req.body;
  console.log("Modif booking ID:", bookingId, start_time, end_time, date);

  if (!start_time || !end_time) {
    return res.status(400).json({ message: "Champs manquants !" });
  }

  try {
    // Vérifier si la réservation existe
    db.query(
      `SELECT * FROM booking_dates WHERE id_booking = ? `,
      [bookingId], (e, resu) => {
        if (resu.length === 0) {
          return res.status(404).json({ message: "Booking not found !" });
        }
        console.log(date, '\n', resu[0].id);

        db.query(
          `SELECT * FROM booking_dates bd
          JOIN booking b ON bd.id_booking = b.id
          WHERE bd.date = ?
          AND b.id != ?
          AND (bd.end_time BETWEEN ? AND ? 
          AND bd.start_time BETWEEN ? AND ?)`,
          [date, resu[0].id, start_time, end_time, start_time, end_time],
          (err, resul) => {
            if (resul.length > 0) {

              return res.status(409).json({ message: "Conflit with another booking !" });
            }
            console.log(date, resu);

            db.query(
              `UPDATE booking_dates
                SET start_time = ?, end_time = ?
                WHERE id = ? AND date = ?`,
              [start_time, end_time, resu[0].id, date]
            );

            return res.json(
              {
                message: "Heures mises à jour avec succès ✅",
                start_time,
                end_time,
                date,
              });
          }
        );
      }
    );



    // Vérifier si les nouvelles heures chevauchent une autre réservation sur la même salle



    // Mise à jour des heures

  } catch (err) {
    console.error("Erreur update réservation:", err);
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
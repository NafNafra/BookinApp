
// const express = require('express');
// const http = require('http');
// const { Server } = require("socket.io");
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// io.on('connection', (socket) => {
//   console.log("Client connected");

//   socket.on("audio", (audioBuffer) => {
//     // Forward to all other clients
//     socket.broadcast.emit("audio", audioBuffer);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });





////VRAI CODE DE CE PROJET
require("dotenv").config();
const mysql = require("mysql");
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

//  Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // Change if necessary
  password: "",       // Default is empty in XAMPP
  database: "greattour"  // Replace with your DB name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error("Connexion echouee " + err.stack);
    return;
  }
  console.log("Base de donnees connectee");
});


app.post('/register', async (req, res) => {
  const { mail, mot_de_passe, name,lastname,  task, cind, phone } = req.body;

  // 1. Hachage du mot de passe
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds); // await   

  try {
    const sqli = 'SELECT * FROM utilisateurs WHERE email = ?';
    db.query(sqli, [mail], (err, results) => {
      if (err) {
        console.error('Erreur de requête de selection:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      // si l'utilisateur nexiste pas encore?
      if (results.length === 0) {


        // 2. Insertion dans la base de données
        const sql = `
        INSERT INTO utilisateurs (email, mot_de_passe, nom, prenom, role, created_at, cin, telephone)
        VALUES (?, ?, ?, ?, ?, NOW(), ?,?)
      `;

        const values = [mail, hashedPassword, name, lastname, task, cind, phone];

        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Erreur lors de l’insertion :', err);
            return res.status(500).json({ message: "Erreur serveur" });
          }
          res.status(201).json({ message: "Utilisateur inscrit avec succès" });
        });

        // res.status(200).json({
        //   utilisateur: {
        //     id: utilisateur.id_utilisateur,
        //     email: mail,
        //     nom: name,
        //     prenom: prenom,
        //     role: task
        //   }
        // });

      }else{
        res.status(201).json({ message: "Utilisateur deja inscrit" });
      }


    });

  } catch (err) {
    console.error('Erreur serveur :', err);
    res.status(500).json({ message: "Erreur lors du traitement" + mot_de_passe });
  }
});


app.post('/login', (req, res) => {
  const { email, mot_de_passe } = req.body;

  const sql = 'SELECT * FROM utilisateurs WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Erreur de requête de selection:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const utilisateur = results[0];

    // Comparer le mot de passe saisi avec le hash en base
    bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, (err, isMatch) => {
      if (err) {
        console.error('Erreur de bcrypt :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou mot de passe mismatch' });
      }

      res.status(200).json({
        message: 'Connexion réussie',
        utilisateur: {
          id: utilisateur.id_utilisateur,
          email: utilisateur.email,
          nom: utilisateur.nom,
          prenom: utilisateur.prenom,
          role: utilisateur.role
        }
      });
    });
  });
});


app.post('/reserver', (req, res) => {
  const { id_utilisateur, id_salle, date_debut, date_fin } = req.body;

  // Vérifier les conflits de réservation
  const verifSql = `
      SELECT * FROM reservation 
      WHERE id_salle = ? 
        AND (
          (date_debut < ? AND date_fin > ?) -- chevauchement
          OR (date_debut < ? AND date_fin > ?)
          OR (date_debut >= ? AND date_fin <= ?)
        )
    `;

  db.query(verifSql, [id_salle, date_fin, date_debut, date_debut, date_fin, date_debut, date_fin], (err, results) => {
    if (err) {
      console.error('Erreur SQL vérif:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'La salle est déjà réservée sur ce créneau.' });
    }

    // Insérer la réservation
    const insertSql = `
        INSERT INTO reservation (id_utilisateur, id_salle, date_debut, date_fin)
        VALUES (?, ?, ?, ?)
      `;
    db.query(insertSql, [id_utilisateur, id_salle, date_debut, date_fin], (err, result) => {
      if (err) {
        console.error('Erreur insertion:', err);
        return res.status(500).json({ message: 'Erreur lors de la réservation.' });
      }

      res.status(200).json({ message: 'Réservation confirmée ✅' });
    });
  });
});


app.get('/salles', (req, res) => {
  const sql = 'SELECT * FROM salles';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(result);
  });
});



// 📌 API Route to get all data
app.get("/data", (req, res) => {
  db.query("SELECT *,nombreHeure*tauxHoraire as prestation FROM enseignant ORDER BY matricule DESC", (err, result) => {
    if (err) {
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(result);
    }
  });
});

app.get("/dataChart", (req, res) => {
  db.query("SELECT MIN(nombreHeure*tauxHoraire) as miny,MAX(nombreHeure*tauxHoraire) as maxy,SUM(nombreHeure*tauxHoraire) as sumy FROM enseignant", (err, result) => {
    if (err) {
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(result);
    }
  });
});



app.post("/update/:matricule", (req, res) => {
  console.log("update")
  const matricule = req.params.matricule;
  const { matr, nom, tauxHoraire, nombreHeure } = req.body;
  //var matriculeChanged = 9;
  const sql = "UPDATE enseignant SET matricule= ? , nom= ?, tauxHoraire= ?, nombreHeure= ? WHERE matricule= ? ";
  db.query(sql, [matr, nom, tauxHoraire, nombreHeure, matricule], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database updating error" });
    }

    console.log(matricule + " post" + matr + "  " + nom);
    res.json({ message: "Data changed successfully!" });
    console.log("Data changed successfully!");
  });
});


// Update de donnees MARCHE
app.get("/update/:matricule", (req, res) => {
  const matricule = req.params.matricule;
  //const { matriculeChanged, nom, tauxHoraire, nombreHeure } = req.body;
  var matriculeChanged = 9090;
  const sql = "UPDATE enseignant SET matricule= ? WHERE matricule= ?"; //, nom= ?, tauxHoraire= ?, nombreHeure= ?
  db.query(sql, [matriculeChanged/*, nom, tauxHoraire, nombreHeure,*/, matricule], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database updating error" });
    }
    res.json({ message: "Data changed successfully!" });
  });
  console.log(matricule + " get")
});




// Ajout de donnees MARCHE
app.post("/add", (req, res) => {
  const { matricule, nom, tauxHoraire, nombreHeure } = req.body;
  const sql = "INSERT INTO enseignant (matricule, nom, tauxHoraire, nombreHeure) VALUES (?, ?, ?, ?)";

  db.query(sql, [matricule, nom, tauxHoraire, nombreHeure], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database insert error" });
    }
    res.json({ message: "Data inserted successfully!" });
    console.log("Data inserted successfully!");
  });
});

// Selection d'une seule donnee MARCHE
app.get("/data/:idSalle", (req, res) => {
  const idSalle = req.params.idSalle;
  const sql = "SELECT * FROM salles WHERE id_salle=?";

  db.query(sql, [idSalle], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(result);
  });
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

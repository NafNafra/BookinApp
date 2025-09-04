const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 4000;

// Configuration de Multer pour stocker les images dans /images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Servir les images en statique
app.use("/images", express.static(path.join(__dirname, "images")));

// Autoriser CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ✅ Route pour uploader une image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier uploadé" });
  }

  // Lien accessible publiquement
  const imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;
  res.json({ url: imageUrl });
});

app.listen(PORT, () => {
  console.log(`Serveur d'images en ligne sur http://localhost:${PORT}/images`);
});





// const express = require('express');
// // const multer = require("multer")
// const path = require('path');

// const app = express();
// const PORT = 4000;

// // Dossier public pour servir les images
// app.use('/images', express.static(path.join(__dirname, 'images')));

// // Optionnel : autoriser d'autres sites à accéder (CORS)
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // autorise toutes les origines
//   next();
// });




// app.listen(PORT, () => {
//   console.log(`Serveur d'images en ligne sur http://localhost:${PORT}/images`);
// });

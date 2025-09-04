// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

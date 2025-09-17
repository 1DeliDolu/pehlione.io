const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/garten", (req, res) => {
  // Handle the upload logic
  res.send("Upload successful");
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

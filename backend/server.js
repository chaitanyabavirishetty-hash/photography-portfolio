const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, "data", "photos.json");
const messagesFile = path.join(__dirname, "data", "messages.json");

app.use(cors());
app.use(express.json());

function read(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function save(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get("/api/photos", (req, res) => res.json(read(dataFile)));

app.post("/api/photos", (req, res) => {
  const { title, category, image } = req.body;
  if (!title || !category || !image) {
    return res.status(400).json({ message: "Title, category and image are required." });
  }
  const photos = read(dataFile);
  const photo = { id: Date.now(), title, category, image };
  photos.unshift(photo);
  save(dataFile, photos);
  res.status(201).json(photo);
});

app.delete("/api/photos/:id", (req, res) => {
  const photos = read(dataFile);
  const updated = photos.filter(photo => photo.id !== Number(req.params.id));
  if (updated.length === photos.length) {
    return res.status(404).json({ message: "Photo not found." });
  }
  save(dataFile, updated);
  res.json({ message: "Photo deleted." });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please complete every field." });
  }
  const messages = read(messagesFile);
  messages.push({ id: Date.now(), name, email, message, date: new Date().toISOString() });
  save(messagesFile, messages);
  res.status(201).json({ message: "Thanks! Your message has been saved." });
});

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));

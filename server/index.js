const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Room = require("./models/Room");
const Message = require("./models/Message");
const Gallery = require("./models/Gallery"); // Pastikan path ini benar
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- KONEKSI DATABASE (VERSI AMAN) ---
// Kita ambil link dari Environment Variable, bukan ditulis langsung
// ... kode sebelumnya ...

const uri = process.env.MONGO_URI;

// Opsi tambahan supaya koneksi lebih stabil di Vercel (Serverless)
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  connectTimeoutMS: 10000, // Tunggu 10 detik sebelum nyerah
};

if (!uri) {
  console.error("❌ ERROR: MONGO_URI belum di-set!");
}

mongoose
  .connect(uri, clientOptions)
  .then(() => console.log("✅ Berhasil konek ke Database MongoDB!"))
  .catch((err) => {
    console.error("❌ Gagal konek database:", err);
    // Penting: Di Vercel, console.error akan muncul di Logs
  });

// Konfigurasi AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Gunakan model yang stabil
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Route Utama
app.get("/", (req, res) => res.send("Backend Syzen Hotel Siap (Vercel)!"));

// --- ROUTES ---

// Rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/rooms", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Pesan berhasil dikirim!", data: newMessage });
  } catch (error) {
    res.status(400).json({ message: "Gagal mengirim pesan", error: error.message });
  }
});

// Gallery
app.get("/api/gallery", async (req, res) => {
  try {
    const photos = await Gallery.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/gallery", async (req, res) => {
  try {
    const newPhoto = new Gallery(req.body);
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Chat AI
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const context = `
      Kamu adalah Customer Service virtual untuk "Syzen Hotel".
      Gunakan bahasa Indonesia yang sopan, ramah, dan profesional.
      Informasi Hotel:
      - Lokasi: Jl. Informatika No. 3, Jakarta Selatan.
      - Tipe Kamar: Deluxe Ocean View (1.2jt), Family Garden Suite (2.5jt), Executive City (950rb).
      - Fasilitas: Infinity Pool, Gym 24 Jam, Spa, Restoran Bintang 5, Free Wi-Fi.
      - Kontak: WhatsApp di 0812-3456-7890.
      Tugasmu: Jawab pertanyaan user berdasarkan info di atas.
      Jawab dengan ringkas (maksimal 3 kalimat).
      Pertanyaan User: ${message}
    `;
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Error AI:", error);
    res.status(500).json({ reply: "Maaf, otak AI saya sedang gangguan." });
  }
});

// --- LOGIC VERCEL ---
if (process.env.NODE_ENV === "production") {
  module.exports = app;
} else {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
}

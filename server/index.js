const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Room = require("./models/Room");
const Message = require("./models/Message");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Gallery = require("./models/Gallery");
require("dotenv").config();

const app = express();
const PORT = 5001; // Kita pakai 5001 biar aman dari error "Access Denied"

// Middleware
app.use(cors());
app.use(express.json());

// --- KONEKSI DATABASE ---
const uri = "mongodb+srv://sajid:sajid123@cluster0.xlbevvu.mongodb.net/syzenhotel?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("✅ Berhasil konek ke Database MongoDB (via Mongoose)!"))
  .catch((err) => console.error("❌ Gagal konek database:", err));

// Konfigurasi AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" }); // Model yang cepat & gratis

// Route Utama
app.get("/", (req, res) => res.send("Backend Syzen Hotel Siap!"));

// Rooms
// GET
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find(); // Cari semua di database
    res.json(rooms); // Kirim ke frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
app.post("/api/rooms", async (req, res) => {
  try {
    const newRoom = new Room(req.body); // Terima data dari kiriman
    await newRoom.save(); // Simpan ke database
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Message
// GET
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find(); // Ambil semua pesan dari database
    res.json(messages); // Tampilkan di browser
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
app.post("/api/messages", async (req, res) => {
  try {
    const newMessage = new Message(req.body); // Terima data nama, email, dll
    await newMessage.save(); // Simpan ke MongoDB
    res.status(201).json({ message: "Pesan berhasil dikirim!", data: newMessage });
  } catch (error) {
    res.status(400).json({ message: "Gagal mengirim pesan", error: error.message });
  }
});

// Gallery
// GET
app.get("/api/gallery", async (req, res) => {
  try {
    const photos = await Gallery.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
app.post("/api/gallery", async (req, res) => {
  try {
    const newPhoto = new Gallery(req.body);
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API CHAT AI
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // 1. Definisikan Karakter AI (Prompt Engineering)
    // Ini memberi tahu AI "siapa dia" dan "apa yang boleh dijawab"
    const context = `
      Kamu adalah Customer Service virtual untuk "Syzen Hotel".
      Gunakan bahasa Indonesia yang sopan, ramah, dan profesional.
      
      Informasi Hotel:
      - Lokasi: Jl. Informatika No. 3, Jakarta Selatan.
      - Tipe Kamar: Deluxe Ocean View (1.2jt), Family Garden Suite (2.5jt), Executive City (950rb).
      - Fasilitas: Infinity Pool, Gym 24 Jam, Spa, Restoran Bintang 5, Free Wi-Fi.
      - Kontak: WhatsApp di 0812-3456-7890.
      
      Tugasmu: Jawab pertanyaan user berdasarkan info di atas.
      Jika user bertanya di luar topik hotel (misal: PR matematika, coding, politik), tolak dengan sopan.
      Jawab dengan ringkas (maksimal 3 kalimat).

      Pertanyaan User: ${message}
    `;

    // 2. Kirim ke Google Gemini
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();

    // 3. Kirim jawaban AI ke Frontend
    res.json({ reply: text });
  } catch (error) {
    console.error("Error AI:", error);
    res.status(500).json({ reply: "Maaf, otak AI saya sedang gangguan. Hubungi resepsionis manual ya!" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

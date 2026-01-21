// server/models/Room.js
const mongoose = require("mongoose");

// Kita bikin aturan (Schema) data kamar
const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true }, // Contoh: Luxury, Family
  rating: { type: Number, default: 4.5 },
  img: { type: String, required: true },
  desc: { type: String }, // Deskripsi bebas
});

// Export modelnya biar bisa dipanggil di index.js
module.exports = mongoose.model("Room", RoomSchema);

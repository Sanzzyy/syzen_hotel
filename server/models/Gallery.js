const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Contoh: 'Rooms', 'Dining', 'Facilities'
  src: { type: String, required: true }, // Link Gambar (Unsplash)
  desc: { type: String }, // Deskripsi pendek
});

module.exports = mongoose.model("Gallery", GallerySchema);

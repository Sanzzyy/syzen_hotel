const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Otomatis catat tanggal kirim
});

module.exports = mongoose.model("Message", MessageSchema);

const mongoose = require("mongoose");

DiarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: [true, "Günlük İçeriği Giriniz"],
  },
  date: {
    type: Date,
    required: [false, "Tarih Girilmesi Zorunludur."],
    default: Date.now,
  },
  subject: {
    type: String,
    required: false,
  },
});

const Diary = mongoose.model("Diary", DiarySchema);

module.exports = Diary;

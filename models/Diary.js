const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

DiarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: [true, "Please provide a diary"],
  },
  date: {
    type: Date,
    required: [false, "please provide a date"],
    default: Date.now,
  },
  subject: {
    type: String,
    required: false,
  },
});

const Diary = mongoose.model("Diary", DiarySchema);

module.exports = Diary;

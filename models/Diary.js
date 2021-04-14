const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const md5 = require("md5");

DiarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required:true
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

DiarySchema.pre("save", async function (next) {
  if (!this.isModified("text")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.text = await bcrypt.hash(this.text, salt);
  next();
});

const Diary = mongoose.model("Diary", DiarySchema);

module.exports = Diary;

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  forgotpassword,
  register,
  login,
  resetpassword,
  submitdiary,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/submitdiary").post(submitdiary);

module.exports = router;

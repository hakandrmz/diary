const express = require("express");

const router = express.Router();

const { getPrivateData,getMyDiaries } = require("../controllers/private");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateData);

router.route("/mydiaries").get(protect,getMyDiaries)

module.exports = router;

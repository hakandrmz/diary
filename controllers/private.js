const Diary = require("../models/Diary");
exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "you are authorized use1r",
    id: req.user.id,
  });
};


exports.getMyDiaries = (req,res,next) => {
  console.log("test")
}
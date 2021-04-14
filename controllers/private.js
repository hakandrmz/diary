const Diary = require("../models/Diary");
exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "you are authorized user",
    id: req.user.id,
  });
};


exports.getMyDiaries = (req,res,next) => {

  Diary.find({})
  res.status(200).json({
    success:true,
    data: "you are authorized user",
    id: req.user.id,

  })
}
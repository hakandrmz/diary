const Diary = require("../models/Diary");

exports.getPrivateData = (req, res, next) => {
  Diary.find({ userId: req.user._id }, function (err, result) {
    if (err) throw err;

    res.status(200).json({
      success: true,
      data: result,
      id: req.user.id,
    });
  });
};

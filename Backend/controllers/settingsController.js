const Setting = require('../models/settingModel');

exports.getSetting = async (req, res, next) => {
  const setting = await Setting.find();
  res.status(200).json({
    status: 'success',
    data: {
      setting,
    },
  });
};
exports.updateSetting = async (req, res, next) => {
  const setting = await Setting.findOneAndUpdate(
    { minBookingLength: { $gt: 0 } },
    req.body
  );
  res.status(200).json({
    status: 'update',
    data: {
      setting,
    },
  });
};

const Cabin = require('../models/cabinModel');

exports.getAllCabins = async (req, res, next) => {
  const cabins = await Cabin.find();

  res.status(200).json({
    status: 'success',
    data: {
      cabins,
    },
  });
};
exports.deleteCabin = async (req, res, next) => {
  await Cabin.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
};
exports.createCabin = async (req, res, next) => {
  const newCabin = await Cabin.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newCabin,
    },
  });
};
exports.updateCabin = async (req, res, next) => {
  const newCabin = await Cabin.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: 'update successfully',
    data: {
      newCabin,
    },
  });
};

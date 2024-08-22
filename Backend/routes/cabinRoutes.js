const express = require('express');
const {
  getAllCabins,
  deleteCabin,
  createCabin,
  updateCabin,
} = require('../controllers/cabinController');
const router = express.Router();
router.route('/').get(getAllCabins).post(createCabin);
router.route('/:id').delete(deleteCabin).patch(updateCabin);
module.exports = router;

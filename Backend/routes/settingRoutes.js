const express = require('express');
const {
  getSetting,
  updateSetting,
} = require('../controllers/settingsController');

const router = express.Router();
router.route('/').get(getSetting).patch(updateSetting);
module.exports = router;

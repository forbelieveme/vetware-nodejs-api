const express = require('express');
const router = express.Router();

const { newAppointment } = require('../controllers/appointments.controller');

router.route('/api/appointments').post(newAppointment);

module.exports = router;
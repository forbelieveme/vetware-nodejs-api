const express = require('express');
const router = express.Router();

const { newAppointment , updateAppointmentStatus} = require('../controllers/appointments.controller');

router.route('/api/appointments/newAppointment').post(newAppointment);
router.route('/api/appointments/updateAppointmentStatus').put(updateAppointmentStatus);

module.exports = router;
const express = require('express');
const router = express.Router();

const { newService, getServices } = require('../controllers/services.controller');

router.route('/api/services').get(getServices);
router.route('/api/services').post(newService);

module.exports = router;
const express = require('express');
const router = express.Router();

const { newService, getServices } = require('../controllers/services.controller');

router.route('/api/services/getServices').get(getServices);
router.route('/api/services/newService').post(newService);

module.exports = router;
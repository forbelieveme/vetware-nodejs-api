const express = require('express');
const router = express.Router();

const { getUser, getAllUsers, newUser } = require('../controllers/users.controller');

router.route('/api/users/:email').get(getUser);
router.route('/api/users').get(getAllUsers);
router.route('/api/users').post(newUser);


module.exports = router;

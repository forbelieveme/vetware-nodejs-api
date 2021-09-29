const express = require('express');
const router = express.Router();

const { getUser, getAllUsers, newUser } = require('../controllers/users.controller');

router.route('/api/users/getUser').post(getUser);
router.route('/api/users/getAllUsers').get(getAllUsers);
router.route('/api/users/newUser').post(newUser);


module.exports = router;

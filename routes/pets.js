const express = require('express');
const router = express.Router();

const { newPet } = require('../controllers/pets.controller');

// router.route('/api/pets/:email/:pet_id').get(getUserPet);
// router.route('/api/pets').get(getAllUserPets);
router.route('/api/pets/newPet').post(newPet);

//utilities
// router.route('/api/pets/breeds').get(getAllBreeds);



module.exports = router;

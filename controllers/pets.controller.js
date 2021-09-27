require('dotenv').config();
const client = require('../database');

const petsController = {};

petsController.newPet = async (req, res) => {
    // const { owner_email, name, date_birth, species, breed } = req.body;
    const { owner_email, name, species, breed } = req.body;
    try {
        await client.connect();

        const database = client.db(process.env.DB_NAME);
        const pets = database.collection('pets');
        const users = database.collection('users');

        // // create a document to insert
        const pet = {
            name,
            // date_birth,
            species,
            breed,
            history: []
        };

        const result_1 = await pets.insertOne(pet);

        const query = { email: owner_email }
        const updateOwner = {
            $push: { pets: result_1.insertedId }
        }

        const result_2 = await users.updateOne(query, updateOwner);
        res.json({ message: `A document was inserted with the _id: ${result_1.insertedId}` });
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
};

module.exports = petsController;
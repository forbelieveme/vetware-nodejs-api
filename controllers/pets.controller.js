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
            breed
        };

        const result = await pets.insertOne(pet);

        const query = { email: owner_email }
        const updateOwner = {
            $push: { pets: result.insertedId }
        }

        const resultUpdate = await users.updateOne(query, updateOwner);
        res.json({ message: `A document was inserted with the _id: ${result.insertedId}` });
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
};

module.exports = petsController;
require("dotenv").config();
const client = require("../database");

const petsController = {};

petsController.getUserPets = async (req, res) => {
  const { owner_id } = req.body;
  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const pets = database.collection("pets");

    const query = { owner_id };

    const result = await pets.find(query).project({ owner_id: 0 }).toArray();

    res.json(result);
  } catch (err) {
    console.log(err.stack);
    res.json(err.stack);
  } finally {
    await client.close();
  }
};

petsController.newPet = async (req, res) => {
  const { owner_id, date_birth, name, species, breed } = req.body;
  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const pets = database.collection("pets");

    // // create a document to insert
    const pet = {
      name,
      owner_id,
      date_birth,
      species,
      breed,
    };

    const result_1 = await pets.insertOne(pet);

    res.json({
      message: `A new pet was created with the _id: ${result_1.insertedId}`,
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

module.exports = petsController;

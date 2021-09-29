require("dotenv").config();
const client = require("../database");

const petsController = {};

petsController.newPet = async (req, res) => {
  // const { owner_email, name, date_birth, species, breed } = req.body;
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

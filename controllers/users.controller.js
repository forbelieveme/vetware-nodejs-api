require('dotenv').config();
const client = require('../database');

const usersController = {};

usersController.getAllUsers = async (req, res, next) => {
  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const users = database.collection('users');

    const allUsers = await users.find().toArray();

    res.json(allUsers);
  } catch (err) {
    res.json(err.stack);
  } finally {
    await client.close();
  }
};

usersController.getUser = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const users = database.collection('users');

    const query = { email };

    const user = await users.findOne(query);

    console.log(user);

    res.json(user);
  } catch (err) {
    res.json(err.stack);
  } finally {
    await client.close();
  }
};

usersController.newUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const users = database.collection('users');

    // create a document to insert
    const user = {
      name,
      email,
      password
    };

    const result = await users.insertOne(user);

    res.json({ message: `A new user has been created with _id: ${result.insertedId}` });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

module.exports = usersController;

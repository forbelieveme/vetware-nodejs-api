require('dotenv').config();
const client = require('../database');

const servicesController = {};

servicesController.getServices = async (req, res) => {
    try {
        await client.connect();

        const database = client.db(process.env.DB_NAME);
        const services = database.collection('services');

        const allServices = await services.find().toArray();

        res.json(allServices);
    } catch (err) {
        res.json(err.stack);
    } finally {
        await client.close();
    }
}

servicesController.newService = async (req, res) => {
    const { name, duration } = req.body;
    try {
        await client.connect();

        const database = client.db(process.env.DB_NAME);
        const services = database.collection('services');

        // create a document to insert
        const service = {
            name,
            duration
        };

        const result = await services.insertOne(service);

        res.json({ message: `A new service was created with the _id: ${result.insertedId}` });
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

module.exports = servicesController;
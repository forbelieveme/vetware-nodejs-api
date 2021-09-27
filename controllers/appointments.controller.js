require('dotenv').config();
const { ObjectId } = require('mongodb');
const client = require('../database');

const appointmentsController = {};

appointmentsController.newAppointment = async (req, res) => {
    const { pet_id, service_id, start_date, end_date, status_id } = req.body;
    try {
        await client.connect();

        const database = client.db(process.env.DB_NAME);
        const appointments = database.collection('appointments');
        const pets = database.collection('pets');

        // create a document to insert
        const appointment = {
            pet_id,
            service_id,
            // start_date,
            // end_date,
            // status_id
        };

        const result_1 = await appointments.insertOne(appointment);

        const query = { _id: ObjectId("61512f9559661079fc68db30") }
        const updatePet = {
            $push: { history: result_1.insertedId }
        }

        const result_2 = await pets.updateOne(query, updatePet);
        res.json({ message: `A document was inserted with the _id: ${result_1.insertedId}` });
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

module.exports = appointmentsController;
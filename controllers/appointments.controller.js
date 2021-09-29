require('dotenv').config();
const client = require('../database');

const appointmentsController = {};

appointmentsController.newAppointment = async (req, res) => {
    const { pet_id, service_id, start_date, end_date, status } = req.body;
    try {
        await client.connect();

        const database = client.db(process.env.DB_NAME);
        const appointments = database.collection('appointments');

        // create a document to insert
        const appointment = {
            pet_id,
            service_id,
            start_date,
            end_date,
            status
        };

        const result_1 = await appointments.insertOne(appointment);

        res.json({ message: `A new appointment was created with the _id: ${result_1.insertedId}` });
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

module.exports = appointmentsController;
require("dotenv").config();
const { ObjectId } = require("mongodb");
const client = require("../database");

const appointmentsController = {};

appointmentsController.updateAppointmentStatus = async (req, res) => {
  const { appointment_id, status } = req.body;
  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const appointments = database.collection("appointments");

    const query = { _id: ObjectId(appointment_id) };

    const update = {
      $set: {
        status,
      },
    };
    // create a document to insert

    const result_1 = await appointments.updateOne(query, update);

    res.json({
      message: `A new appointment was created with the _id: ${result_1.insertedId}`,
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

appointmentsController.newAppointment = async (req, res) => {
  const { pet_id, service_id, appointment_date, end_date, status } = req.body;
  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const appointments = database.collection("appointments");

    // create a document to insert
    const appointment = {
      pet_id,
      service_id,
      appointment_date,
      creation_date: new Date(Date.now()),
      status,
    };

    const result_1 = await appointments.insertOne(appointment);

    res.json({
      message: `A new appointment was created with the _id: ${result_1.insertedId}`,
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

module.exports = appointmentsController;

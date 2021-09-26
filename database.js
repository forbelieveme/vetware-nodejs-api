require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.DB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
// async function run() {
//   try {
//     await client.connect();

//     console.log('Connected correctly to server');
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);

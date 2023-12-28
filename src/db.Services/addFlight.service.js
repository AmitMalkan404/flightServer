import { clientInstance } from '../dbConnect.js';
import dotenv from 'dotenv';

dotenv.config();

async function addFlightToDatabase(flightData) {
  try {
    // Use the existing client instance from dbConnect.js
    const client = clientInstance;
    // Ensure that the client is connected to the database
    if (!client) {
      await client.connect();
    }

    // Insert flight data into the database
    const database = client.db(process.env.FLIGHTS_DB);
    const collection = database.collection(process.env.FLIGHTS_COLLECTION);
    
    let returned_id = null;
    await collection.insertOne(flightData).then(result => {
      returned_id = result.insertedId.toString();
    });

    console.log('Flight data added to the database');
    return returned_id;
  } catch (error) {
    throw 'Error adding flight data to the database:'+ error;
  }
}

export { addFlightToDatabase };

import { connectToDatabase, clientInstance } from '../dbConnect.js';
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
    

    await collection.insertOne(flightData);

    console.log('Flight data added to the database');
    return 200;
  } catch (error) {
    throw 'Error adding flight data to the database:'+ error;
  }
}

export { addFlightToDatabase };

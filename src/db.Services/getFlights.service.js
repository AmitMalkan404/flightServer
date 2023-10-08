import { clientInstance } from '../dbConnect.js';
import dotenv from 'dotenv';

let flightsDataArray = null;
dotenv.config();
async function getAllFlights () {
  try {
    const client = clientInstance;

    // Ensure that the client is connected to the database
    if (!client) {
      await client.connect();
    }

    // Get all flights from the database
    const database = client.db(process.env.FLIGHTS_DB);
    const collection = database.collection("flights database");

    const flights = await collection.find({}).toArray();
    flightsDataArray = flights
    return flights;
  } catch (error) {
    console.error('Error fetching flights from the database:', error);
    return [];
  }
}

export { getAllFlights, flightsDataArray };

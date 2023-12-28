import { clientInstance } from '../dbConnect.js';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { getAllFlights } from './getFlights.service.js';

dotenv.config();

async function deleteFlightFromDatabase(flightId) {
  try {
    // Use the existing client instance from dbConnect.js
    const client = clientInstance;

    // Ensure that the client is connected to the database
    if (!client) {
      await client.connect();
    }

    // Delete the flight data from the database
    const database = client.db(process.env.FLIGHTS_DB);
    const collection = database.collection(process.env.FLIGHTS_COLLECTION);

    const result = await collection.deleteOne({_id: new ObjectId(flightId)});

    if (result.deletedCount === 1) {
      // Flight deleted successfully
      getAllFlights();
      console.log('Flight data deleted from the database');
      return 200;
    } else {
      // Flight with the specified ID was not found
      return 404;
    }
  } catch (error) {
    throw 'Error deleting flight data from the database: ' + error;
  }
}

export { deleteFlightFromDatabase };

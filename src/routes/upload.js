import { Router } from 'express';
import { addFlightToDatabase } from '../db.Services/addFlight.service.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const flightData = req.body;

    // Call the service function to add the flight data to the database
    const result = await addFlightToDatabase(flightData);
    
    res.status(201).json({ message: 'Flight data added to the database' });
  } catch (error) {
    console.error('Error handling flight data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

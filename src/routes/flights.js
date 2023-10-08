import { Router } from 'express';
import { getAllFlights } from '../db.Services/getFlights.service.js';
import { calculatePositionForAllFlights } from '../flightRouteCalculator.js'

const router = Router();

// Define a route to retrieve all flights
router.get('/', async (req, res) => {
  try {
    const flights = await getAllFlights();
    res.status(200).json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

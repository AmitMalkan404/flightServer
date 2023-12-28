import { Router } from 'express';
import { deleteFlightFromDatabase } from '../db.Services/deleteFlight.service.js'

const router = Router();

router.post('/', async (req, res) => {
  try {
    const flightId = req.body.flightId;

    // Call the service function to remove the flight from the database
    const result = await deleteFlightFromDatabase(flightId);
    
    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ error: 'Failed to delete flight' });
  }
});

export default router;

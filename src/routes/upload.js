import { Router } from 'express';
import { addFlightToDatabase } from '../db.Services/addFlight.service.js';
import { currentTempCountryValue, getLocationDetailsByLonLat } from '../services.js';
import {delay, sleep} from '../server.utils.js'

const router = Router();

router.post('/', async (req, res) => {
  try {
    const flightData = req.body;
    await getLocationDetailsByLonLat(
      flightData.initial_location.longitude,
      flightData.initial_location.latitude
      )
    await sleep(750).then(() =>{
      flightData["origin_country"] = currentTempCountryValue;
    });  
    await getLocationDetailsByLonLat(
      flightData.segments[flightData.segments.length-1].longitude,
      flightData.segments[flightData.segments.length-1].latitude
      )
    await sleep(750).then(() =>{
      flightData["destination_country"] = currentTempCountryValue;
    });
      
    // Call the service function to add the flight data to the database
    const result = addFlightToDatabase(flightData);
    
    res.status(201).json({ message: 'Flight data added to the database' });
    
  } catch (error) {
    console.error('Error handling flight data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

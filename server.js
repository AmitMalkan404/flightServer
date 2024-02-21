import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

import {connectToDatabase} from './src/dbConnect.js';
import { calculatePositionForAllFlights } from './src/flightRouteCalculator.js';
import { flightsDataArray } from './src/db.Services/getFlights.service.js';
import { removeObjectWithId } from './src/server.utils.js'

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());


// Import route handlers
import uploadRoute from './src/routes/upload.js';
import flightsRoute from './src/routes/flights.js';
import deleteFlightRoute from './src/routes/delete-flight.js';

// Use the route handlers
app.use('/upload', uploadRoute);
app.use('/get-flights', flightsRoute);
app.use('/delete-flight', deleteFlightRoute);

const sockets = []

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  // ws.id = new Date().getUTCMilliseconds();
  sockets.push(ws)
  ws.send('connected to WebSocket');
  ws.on('close',()=>{
    var index = sockets.indexOf(ws);
    if (index !== -1) {
      sockets.splice(index, 1);
      console.log("Socket removed from server's list");
    }
  })
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectToDatabase().catch(console.dir);
});

// Define a function to be executed every 2 seconds
function notifyCurrentLocations() {
  if (flightsDataArray) {
    const notificationData = calculatePositionForAllFlights(flightsDataArray);
    const notificationDataJson = JSON.stringify({
      event: 'flightData', 
      data: notificationData, 
    });
    for (const socket of sockets) {
      socket.send(notificationDataJson)
    }
  } 
}

// Set up an interval to call the calculation function every 0.1 second and send it to the listners
setInterval(notifyCurrentLocations, process.env.INTERVAL_TIME);
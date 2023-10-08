import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import {connectToDatabase} from './src/dbConnect.js';
import { calculatePositionForAllFlights } from './src/flightRouteCalculator.js';
import { flightsDataArray } from './src/db.Services/getFlights.service.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import route handlers
import uploadRoute from './src/routes/upload.js';
import flightsRoute from './src/routes/flights.js';

// Use the route handlers
app.use('/upload', uploadRoute);
app.use('/get-flights', flightsRoute);

// Create an HTTP server

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle messages received from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port = 5555;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectToDatabase().catch(console.dir);
});

// Define a function to be executed every 2 seconds
function printSomething() {
  if (flightsDataArray) {
    const notificationData = calculatePositionForAllFlights(flightsDataArray);
    const notificationDataJson = JSON.stringify(notificationData);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(notificationDataJson);
      }
    });
  } 
}

// Set up an interval to call the function every 2 seconds (2000 milliseconds)
setInterval(printSomething, 2000);
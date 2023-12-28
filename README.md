# FlightServer

FlightServer is a Node.js-based server that manages flight data and provides WebSocket communication for real-time flight updates.

The server listens on port 5555 by default.

### Endpoints

- `/upload`: Handles flight data upload.
- `/get-flights`: Retrieves flight data.
- `/delete-flight`: Deletes flight data.

### WebSocket Integration

WebSocket communication occurs on port 8080 for real-time flight updates.

### Dependencies

- Express: Web server framework.
- Body-parser: Request body parsing middleware.
- Cors: Enables Cross-Origin Resource Sharing (CORS).
- WS: WebSocket library for Node.js.
- MongoDB: MongoDB driver for Node.js.

### Scripts

- `start`: Initiates the server using `node server.js`.

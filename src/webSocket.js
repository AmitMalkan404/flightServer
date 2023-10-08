import expressWs from 'express-ws';

export let wsInstance;

export const setupWebSocket = (app) => {
    
  // Attach WebSocket support to the Express app
  wsInstance = expressWs(app);

  // Handle WebSocket connections
  app.ws('/notifications', (ws, req) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
      console.log(`Received WebSocket message: ${message}`);

      wsInstance.getWss().clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    // Handle WebSocket disconnections
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
};

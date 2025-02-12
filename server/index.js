const express = require('express');
const app = express();
const connectDB = require('./config/db');
const { WebSocketServer, WebSocket } = require('ws');

const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res) => {
    try {
        res.send('Server is running');
    } catch (error) {
        console.log(error);
    }
}
);

const server = app.listen(PORT, (err) => {
    if(err){
        console.log('Error in running server', err);
    } else {
        connectDB();
        console.log('Server is running on port', PORT);
    }
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message.toString());

        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});
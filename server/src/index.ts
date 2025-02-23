import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware (if needed, extend later)
app.use(express.json());

// Route
app.get('/', (req: Request, res: Response) => {
    try {
        res.send('Server is running');
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Create HTTP server
const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

// WebSocket Server
const wss = new WebSocketServer({ server });

interface WebSocketMessage {
    message: string;
    isMe?: boolean;
}

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: string) => {
        console.log('Received:', message.toString());

        const data: WebSocketMessage = { message: message.toString() };

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ ...data, isMe: client === ws }));
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});
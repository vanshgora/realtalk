import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import User from './models/user_model';

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

app.use(cors({
    //http://localhost:5173 
    origin: "https://realtalk.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
app.use('/api/users', userRoutes);

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

    ws.on('message', async (message: string) => {
        console.log('Received:', JSON.parse(message.toString()));

        const msgObj = JSON.parse(message.toString());

        const user = await User.findOne({ _id: msgObj.user_id });

        const data: WebSocketMessage & { username: string , user_id: string} = { message: msgObj.message, username: user.username, user_id: user._id };

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ ...data }));
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});
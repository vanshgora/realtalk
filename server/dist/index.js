"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const user_model_1 = __importDefault(require("./models/user_model"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
// Middleware (if needed, extend later)
app.use(express_1.default.json());
// Route
app.get('/', (req, res) => {
    try {
        res.send('Server is running');
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Create HTTP server
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    //http://localhost:5173 
    origin: "https://realtalk.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
app.use('/api/users', userRoutes_1.default);
// Start Server
server.listen(PORT, () => {
    (0, db_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
// WebSocket Server
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', async (message) => {
        console.log('Received:', JSON.parse(message.toString()));
        const msgObj = JSON.parse(message.toString());
        const user = await user_model_1.default.findOne({ _id: msgObj.user_id });
        const data = { message: msgObj.message, username: user.username, user_id: user._id };
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(JSON.stringify({ ...data }));
            }
        });
    });
    ws.on('close', () => console.log('Client disconnected'));
});

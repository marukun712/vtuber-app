import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

io.on("connection", (socket) => {
    socket.on('motion', (results) => {
        io.emit('receiveMotion', results);
    });
});

httpServer.listen(3000, () => {
    console.log(`listening on port 3000`);
});
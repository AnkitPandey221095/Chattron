import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import dotenv from "dotenv"
import { Socket } from 'dgram'
import {socketAuthMiddleware} from '../middleware/socket.auth.middleware.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:process.env.CLIENT_URL,
        credentials:true,
    }
})

// apply authentication to each socket connection

io.use(socketAuthMiddleware)

//this is for storing online users

const userSocketMap = {} // {userId: sockerId}

io.on("connection", (socket)=>{
    console.log("A user connected", socket.user.fullname);
    const userId = socket.userId
    userSocketMap[userId] = socket.id

    //io.emit() is used to send events to all connected clients

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.user.fullname);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
});

export {io, app, server}
//Importing Importent Libraries

import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import path from 'path'
import {connectDB} from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {app, server} from './lib/socketIO.js'

//environment variable configuration
dotenv.config()
const PORT = process.env.PORT || 3000

// Starting web server
// app or server is already build in socket middle ware

//middlewares
app.use(express.json({limit:"2mb"}))
app.use(cookieParser())

//Creating routes
app.use('/api/auth',authRoutes);
app.use('/api/messages', messageRoutes);

const __dirname= path.resolve()

//making for production ready
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend/dist/index.html'))
    })
}

// listing server
server.listen(PORT, ()=>{
console.log(`your server is running : http://localhost:${PORT}`)
//Connecting to DataBase
connectDB()
})
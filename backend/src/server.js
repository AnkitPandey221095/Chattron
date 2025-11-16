//Importing Importent Libraries

import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import path from 'path'
import {connectDB} from './lib/db.js'

//environment variable configuration
dotenv.config()
const PORT = process.env.PORT || 3000

// Starting web server
const app= express()


//middlewares
app.use(express.json())

//Creating routes
app.use('/api/auth',authRoutes)

const __dirname= path.resolve()

//making for production ready
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend/dist/index.html'))
    })
}

// listing server
app.listen(PORT, ()=>{
console.log(`your server is running : http://localhost:${PORT}`)
//Connecting to DataBase
connectDB()
})
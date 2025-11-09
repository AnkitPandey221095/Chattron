//Importing Importent Libraries

import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

//environment variable configuration
dotenv.config()
const PORT = process.env.PORT || 3000

// Starting web server
const app= express()




//Creating routes
app.use('/api/auth',authRoutes)

// listing server
app.listen(PORT, ()=>{
console.log(`your server is running : http://localhost:${PORT}`)
})
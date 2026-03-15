import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

export const socketAuthMiddleware = async (socket, next)=>{

    try{
        //extracting token from http-only cookey
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row)=>row.startsWith("jwt="))
        ?.split("=")[1]

        if (!token){
            console.log("Socket Connection rejected, No token founded")
            return next(new Error("Unauthorized: No token Provided")) 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            console.log("Socket Connection rejected, Invalid token")
            return next(new Error("Unauthorized: Invalid token")) 
        }

        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            console.log("Socket Connection rejected, User Not Found")
            return next(new Error("User Not Found")) 
        }

        //Attaching the user Info to socket

        socket.user = user
        socket.userId= user._id.toString()

        next()

    }catch(err){
        console.log("Error in socket authentication", err.message)
        next(new Error("Authentication failed")) 
    }

}
import jwt from "jsonwebtoken"
import User from "../models/User"
import dotenv from 'dotenv'

dotenv.config()

export const protectRoute = async (req, res, next)=>{
try {
    const token = req.cookie.jwt
    if(!token) return res.status(401).json({message:"Unauthorized- No token provided"})

    const decode= jwt.verify(token, process.env.JWT_SECRET)
    if(!decode) return res.status(401).json({message:"Uanuthorized invalide token"})

    const user = await User.findById(decode.userId).select("-password")
    if(!user) return res.status(404).json({message: "User not found"})

    req.user = user
    next()
} catch (error) {
    console.error("Error in protect route middleware", error)
    res.status(500).json({message: "internal server error"})
}
}
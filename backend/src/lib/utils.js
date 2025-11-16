import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (userId, res)=>{
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET,{expiresIn: '7d'})
    res.cookie('jwt', token,{
        maxAge: 7*24*60*60*1000,
        httponly: true, // prevent XSS attacks, cross-site scripting
        sameSite: "strict", // prevent CSRF attacks, cross-site request forgery
        secure: process.env.NODE_ENV === 'development' ? false : true // set to true in production
    });

    return token
};




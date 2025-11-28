import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../lib/utils.js'
import {sendWelcomeEmail} from '../email/emailHandlers.js'

export const signup = async (req, res)=>{
    const {fullname, email, password}= req.body

    try{

        //Validating user inputs

        if(!fullname || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        //Password length validation

        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters long"})
        }

        //Email validation regex
        const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email"})
        }

        //Checking if email already exists
        const existingEmail = await User.findOne({email})

        if(existingEmail){
            return res.status(400).json({message:"Email already exists"})
        }

        //Encrypting the password using bcrypt
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password, salt)

        const newUser= new User({
            fullname,
            email,
            password: hashedPassword
        })

        if(newUser){

            
            const savedUser =await newUser.save()
            generateToken(savedUser._id, res)


            res.status(201).json({
                _id: savedUser._id,
                fullname: savedUser.fullname,
                email: savedUser.email,
                profilePic: savedUser.profilePic
            })

            try{
                await sendWelcomeEmail(savedUser.fullname, savedUser.email, process.env.CLIENT_URL)
            }catch(error){
                console.error("Error in sending welcome email:", error)
            }

        }else{
            res.status(400).json({message:"Invalid user data"})
        }

    }catch(error){
        console.error("Error during user signup:", error)
        res.status(500).json({message:"Server error"})
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({message:"Invalide email or password"})

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(200).json({message:"Invalide useId or password"})

        generateToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            email: user.email,
            fullname: user.fullname,
            profilePic: user.profilePic
        })

    }catch(err){
        console.error("Error in the login controller: ", erroe)
    }
}

export const logout = async (_, res)=>{
    res.cookie('jwt',"", {maxAge:0})
    res.status(200).json({message:"logout successfully"})
}
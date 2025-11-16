import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true, 
        unique: true
    },
    fullname:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    profilePic:{
        type: String,
        default:""
    }

},{timestamps:true})


//The upper section creates a schema for user data with different fields
//Now we will create a model using this schema

const User = mongoose.model('User',userSchema)

export default User
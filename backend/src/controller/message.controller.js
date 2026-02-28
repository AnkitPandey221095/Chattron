import User from '../models/User.js'
import Message from '../models/Message.js'
import cloudinary from '../lib/cloudinary.js'

export const getAllContacts = async (req, res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne : loggedInUserId}} ).select("-password");
        res.status(200).json(filteredUsers)
    }catch(err){
        console.error("Error in getAllContacts",err)
        res.status(500).json({message:"Server Error"})
    }
}

export const getMessagesByUserId = async (req, res)=>{
    try{
        const myId = req.user._id
        const {id:userToChatId} = req.params

        const messages = await Message.find({
            $or:
            [
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId, receiverId: myId},
            ],
        });

        res.status(200).json(messages);

    }catch(err){
        console.error("Error in get messages by user id",err)
        res.status(500).json({message:"internal server error"})
    }
}

export const sendMessage = async (req, res)=>{

    try{
        const {image, text} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save()

        // todo: sending message to the user using socket.io

        res.status(200).json(newMessage)


    }catch(err){
        console.error("Error in send message",err.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getChatPartners = async(req, res)=>{
    try {
        const loggedInUserId = req.user._id
        
        //find all the messages where sender or receiver is logged in user.

        const messages = await Message.find({
            $or:[
                {senderId:loggedInUserId},
                {receiverId:loggedInUserId}
            ],
        })

        const chatPartnersIds = [
            ...new Set(
                messages.map((msg)=>
                msg.senderId.toString()=== loggedInUserId.toString()
                ?msg.receiverId.toString():msg.senderId.toString()
                )
            ),
        ];

        const chatPartners = await User.find({_id: {$in : chatPartnersIds}}).select("-password")

        res.status(200).json(chatPartners)

    } catch (error) {
        console.error("Error in getting chat partners",error.message)
        res.status(500).json({error: "Internal Server Error"})
        
    }
}
import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js"

export const arcjetprotection = async (req, res, next)=>{

    try{

        const decision= await aj.protect(req)

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:"Rate limit exceeded, Please try again later"})
            }
            else if(decision.reason.isBot()){
                return res.status(403).json({message:"Bot access denied"})
            }
            else{
                return res.status(403).json({message:"access denied due to security policy"});
            }
        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"Spoofed Bot detected",
                message:" Malicious bot activity detected",
            })
        }

        next()

    }catch(err){
        console.error("Error in Arcjet protection midlware",err)
        next()
    }
}

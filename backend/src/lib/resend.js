import {Resend} from "resend"

export const resendClient = new Resend(process.env.Resend_API_KEY)

export const sender= {
    email: process.env.Email_From,
    name: process.env.Email_From_Name
}
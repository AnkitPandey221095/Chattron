import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"
import toast from 'react-hot-toast'

export const useAuthStore = create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdating:false,

    checkAuth: async ()=>{
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        }catch(err){
            console.log("Error in auth check",err)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data)=>{
        set({isSigningUp:true})
        try{

            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success("Sign up successfully")

        }catch(err){
            toast.error(err.response.data.message)
            console.log("Error in singup section of frontend",err)
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async (data)=>{
        set({isLoggingIn:true})
        try{

            const res = await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("Login successful")

        }catch(err){
            toast.error(err.response.data.message)
            console.log("Error in login section of frontend",err)
        }finally{
            set({isLoggingIn:false})
        }
    },

    logout: async ()=>{
        try{
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            toast.success("Logged Out successfully")

        }catch(err){
            console.log("Error in log out frontend", err.message)
            toast.error(err.response.data.message)
        }

    },

    updateProfile : async (data)=>{
        set({isUpdating:true})
        try{
            const res = await axiosInstance.put("/auth//update-profile",data)
            set({authUser:res.data})
            toast.success("Profile Updated Successfully")

        }catch(err){
            console.log("Error in update",err.message)
            toast.error(err.response.data.message)
        }finally{
            set({isUpdating:false})
        }
    }


}))
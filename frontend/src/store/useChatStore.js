import {create} from 'zustand'
import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios'

export const useChatStore = create((set,get)=>({
    allContact:[],
    chats:[],
    messages:[],
    activeTab:'chats',
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    setActiveTab : (tab) => set({activeTab:tab}),
    setSelectedUser: (user)=>set({selectedUser:user}),

    getAllContacts: async ()=>{
        set({isUserLoading:true})
        try{
            const res = await axiosInstance.get("/messages/contacts")
            set({allContact:res.data})
        }catch(err){
            console.log("error in loading All contacts",err)
            toast.error(err.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMyChatPartners: async ()=>{
        set({isUserLoading:true})
        try{
            const res = await axiosInstance.get("/messages/chats")
            set({chats:res.data})

        }catch(err){
            console.log("error in loading chats partner",err)
            toast.error(err.response.data.message)
        }finally{
             set({isUserLoading:false})
        }
    }


}))
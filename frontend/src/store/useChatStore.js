import {create} from 'zustand'
import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios'
import { useAuthStore } from "./useAuthStore";

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
    },

    getMessagesByUserId: async (UserId)=>{
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstance.get(`/messages/${UserId}`)
            set({messages : res.data})

        }catch(err){
            console.log("error in loading chats partner",err)
            toast.error(err.response.data.message)
        }finally{
             set({isMessagesLoading:false})
        }
    },

    sendMessage: async (data)=>{
        const { selectedUser,messages } = get()
        const {authUser} = useAuthStore.getState()

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: data.text,
            image: data.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
            };

        // immidetaly update the ui by adding the message
        set({ messages: [...messages, optimisticMessage] });

        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,data)
            set({messages:messages.concat(res.data)})
            

        }catch(err){
            set({ messages: messages });
            console.log("Error in sending message",err.message)
            toast.error(err?.response?.data?.message || "Somthing Went Wrong")
        }
    },

    subscribToMessages: ()=>{
        const {selectedUser} = get()
        if(!selectedUser) return

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage)=>{

            const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
            if(!isMessageFromSelectedUser) return

            const currentMessage = get().messages
            set({messages: [...currentMessage,newMessage]})
        })
    },

    unsubscribToMessages:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    }


}))
import React, { useEffect } from 'react'
import {useChatStore} from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton.jsx'
import NoChatsFound from './NoChatsFound.jsx'
import {useAuthStore} from '../store/useAuthStore.js'

const ChatsList = () => {
  const {getMyChatPartners, setSelectedUser, chats, isUserLoading} = useChatStore()
  const {onlineUser} = useAuthStore()

  useEffect(()=>{
    getMyChatPartners( )
  },[])


  if(isUserLoading) return <UsersLoadingSkeleton/>;
  if(chats.length === 0) return <NoChatsFound/>


  return (
    <div>
      {
        chats.map((chat)=>(
          <div 
          key={chat._id}
          className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mt-1'
          onClick={()=>setSelectedUser(chat)}>
            <div className='flex items-center gap-3'>
              {/* Online and Offline status setting using socketIo */}
              <div className={`avatar ${onlineUser.includes(chat._id) ? "avatar-online" : "avatar-offline"}`}>
                <div className='size-12 rounded-full'>
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.fullname} />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate'>{chat.fullname}</h4>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ChatsList
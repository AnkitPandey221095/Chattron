import React from 'react'
import GlassContainer from "../components/GlassContainer.jsx"
import {useChatStore} from "../store/useChatStore.js"
import ProfileHeader from "../components/ProfileHeader.jsx"
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx"
import ChatsList from "../components/ChatsList.jsx"
import ContactsList from "../components/ContactsList.jsx"
import ChatContainer from "../components/ChatContainer.jsx"
import NoConversation from "../components/NoConversation.jsx"
import {useAuthStore} from "../store/useAuthStore.js"



function ChatPage() {

  const {activeTab,selectedUser}=useChatStore()

  return (
    <div className='relative w-full max-w-6xl '>
      <GlassContainer>
        {/* Left side of*/}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col h-[600px]'>
        <ProfileHeader/>
        <ActiveTabSwitch/>

        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {activeTab === "chats" ? <ChatsList/> : <ContactsList/>}
        </div>
        </div>
        {/* Right side of*/}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm h-[600px]'>
          {selectedUser ? <ChatContainer/> : <NoConversation/>}
        </div>
      </GlassContainer>
    </div>
  )
}

export default ChatPage

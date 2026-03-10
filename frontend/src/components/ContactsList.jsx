import React, { useEffect } from 'react'
import {useChatStore} from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton.jsx'
import NoChatsFound from './NoChatsFound.jsx'

const ContactsList = () => {

  const {getAllContacts, setSelectedUser, allContact, isUserLoading} = useChatStore()

  useEffect(()=>{
    getAllContacts()
  },[])


  if(isUserLoading) return <UsersLoadingSkeleton/>;
  if(allContact.length === 0) return <NoChatsFound/>;

  return (
    <div>
      {
        allContact.map((Contact)=>(
          <div 
          key={Contact._id}
          className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mt-1'
          onClick={()=>setSelectedUser(Contact)}>
            <div className='flex items-center gap-3'>
              {/* Online and Offline status setting using socketIo */}
              <div className={`avatar avatar-online`}>
                <div className='size-12 rounded-full'>
                  <img src={Contact.profilePic || "/avatar.png"} alt={Contact.fullname} />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate'>{Contact.fullname}</h4>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ContactsList

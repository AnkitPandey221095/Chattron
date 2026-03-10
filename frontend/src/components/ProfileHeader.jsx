import React, { useRef } from 'react'
import {useState} from 'react'
import {LoaderIcon, LogOutIcon} from 'lucide-react'
import {useAuthStore} from '../store/useAuthStore'
import {useChatStore} from '../store/useChatStore'

const ProfileHeader = () => {

  const {logout, authUser, updateProfile, isUpdating} = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)

  const fileInputRef = useRef(null)

  const handleImgUpload = (e)=>{

    const file = e.target.files[0]
    if(!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = async ()=>{
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({profilePic:base64Image})
    }

  }

  return (
    <div className='p-6 border-b rounded-tl-2xl bg-slate-700/50'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* Avatar */}
          <div className='avatar avatar-online'>
            <button className='size-14 rounded-full overflow-hidden relative group'
            onClick={()=> fileInputRef.current.click()}>
              {/* Loader for uploading the Profile pic */}

              {isUpdating ? <LoaderIcon className='w-5 h-5 animate-spin mx-auto text-slate-200'/> :
              <img src={selectedImg || authUser.profilePic || "/avatar.png"}
               alt="user image" 
               className='size-full object-cover'
               />
               }

              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer'>
                <span className='text-white text-xs '>Change</span>
              </div>
            </button>
            <input 
            type="file" 
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImgUpload}
            className='hidden'/>

          </div>
          {/* UserName and Online Status */}
          <div>
            <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
              {authUser.fullname}
            </h3>
            <p className='text-slate-200 text-xs'>Online</p>
          </div>
        </div>
        {/* Button */}
        <div className='flex gap-4 items-center'>
          <button className='text-slate-400 hover:text-slate-200 transition-colors'
          onClick={logout}>
            <LogOutIcon className='size-5'/>
          </button>

        </div>

      </div>
      
    </div>
  )
}

export default ProfileHeader

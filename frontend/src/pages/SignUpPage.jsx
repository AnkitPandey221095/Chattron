import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Loader2Icon, LockIcon, MailIcon, MessageCircleIcon,UserIcon} from 'lucide-react'
import {Link} from "react-router"
import GlassContainer from "../components/GlassContainer.jsx"

function SignUpPage() {

  const [formData, setFormData] = useState({fullname: "", email: "", password: ""})
  const {signup, isSigningUp} = useAuthStore()

  const handleSubmit = (e)=>{
    e.preventDefault()
    signup(formData)

  }

  return (
    <div className='w-full flex items-center justify-center bg-slate-900 '>
      <div className='relative w-full max-w-6xl '>
        <GlassContainer>
        <div className='w-full flex flex-col md:flex-row'>
          {/* left side */}
          <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
          <div className='w-full max-w-md'>
            {/*Heading*/}
            <div className='text-center mb-8'>
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4"/>
              <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
              <p className='text-slate-400'>Sign Up Here</p>
            </div>
            {/*Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/*Name Input section*/}
              <div>
                <label className='auth-input-label'>Full Name</label>
                <div className='relative'>
                  <UserIcon className="auth-input-icon"/>
                  <input 
                  type="text" 
                  value={formData.fullname}
                  onChange={(e)=>(setFormData({...formData, fullname:e.target.value}))}
                  className='input'
                  placeholder='Your Name...'
                  />
                </div>
              </div>
              {/*Email Input section*/}
               <div>
                <label className='auth-input-label'>Email</label>
                <div className='relative'>
                  <MailIcon className="auth-input-icon"/>
                  <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e)=>(setFormData({...formData, email:e.target.value}))}
                  className='input'
                  placeholder='example@gmail.com'
                  />
                </div>
              </div>
              {/*Password Input section*/}
               <div>
                <label className='auth-input-label'>Password</label>
                <div className='relative'>
                  <LockIcon className="auth-input-icon"/>
                  <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e)=>(setFormData({...formData, password:e.target.value}))}
                  className='input'
                  placeholder='Enter Password'
                  />
                </div>
              </div>
              {/*Submit button*/}
              <button className="auth-btn" type='submit' disabled={isSigningUp}>
                {isSigningUp ? <Loader2Icon className='w-5 h-5 animate-spin mx-auto'/> : "Create Account"}
                </button>
                {/*Navigation Link*/}
                <div className="mt-6 text-center">
                  <Link to="/login" className='auth-link'>
                    already have an account ? login
                  </Link>
                </div>
            </form>
          </div>
          </div>
          {/* Right side */}
          <div className='hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'>
          <div className='text-cyan-400'>
            <img src="./signup.png"
            alt="People using mobile" 
            className='w-full h-auto object-contain'/>

            <div className='mt-6 text-center'>
            <h3 className='text-xl font-medium text-cyan-400'>Start Communicating Today</h3>
            
            <div className='mt-4 flex justify-center gap-4'>
              <span className='auth-badge'>Free</span>
              <span className='auth-badge'>Easy Setup</span>
              <span className='auth-badge'>private</span>
            </div>

            </div>

          </div>
          </div>
        </div>
        </GlassContainer>

      </div>
      
    </div>
  )
}

export default SignUpPage

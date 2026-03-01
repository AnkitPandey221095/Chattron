import {create} from 'zustand'

export const useAuthStore = create(()=>({
    authUser: {name:"ankit",age:25},
}))
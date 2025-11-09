import express from 'express'

const router= express.Router()

router.get("/login",(req,res)=>{
    res.send("login router is working properly")
})

router.get('/logout',(req,res)=>{
    res.send("logout router is working properly")
})

export default router
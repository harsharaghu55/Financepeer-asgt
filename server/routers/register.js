require('dotenv').config()
const express = require('express')
const registerModule = express.Router();
const mongoose = require('mongoose')
const User = require('../model/user')
const bcrypt = require('bcryptjs')

mongoose.connect(
    "mongodb://localhost:27017/Financepeer-asgt",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
)

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("mongodb connection established")
})

registerModule.use(express.json())


registerModule.post("/user-register",async (req,res)=>{
    const {fullName,email,password,...metadata} = await req.body
    
    if(!email || typeof email !== 'string' ){
        return res.jason({ 
            status:'error',
            error:'Invalid username'
        })
    }

    if(!password || typeof password !== 'string' ){
        return res.jason({ 
            status:'error',
            error:'Invalid password'
        })
    }

    if(password.length < 5){
        return res.json({
            status:'error',
            error:"password too small. Should be atleat 6 characters"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)
    try {
        const response = await User.create({
            fullName:fullName,
            email:email,
            password:hashedPassword,
            data:[]
        })
        console.log("this is the response:",response)
    } catch (error){
        if(error.code === 11000 ){
            return res.json({status:'error',error:'username already in use'})
        }
        throw error
    }

    res.json({ status:'ok' })  
})

exports.registerModule = registerModule
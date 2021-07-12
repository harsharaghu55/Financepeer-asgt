require('dotenv').config()
const express = require('express')
const loginModule = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')

loginModule.use(express.json())

loginModule.post('/secure-login',async (req,res)=>{
    const {userName:email,password} = req.body
    const user = await User.findOne({email}).lean()

    if(!user){
        return res.json({status:'error',error:'Invalid username/password'})
    }

    if(await bcrypt.compare(password,user.password)){
        const accessToken = jwt.sign({
            _id:user._id,
            email: user.email
        },process.env.ACCESS_TOKEN_SECRET)

        return res.json({status:'ok',data:accessToken})
    }

    res.json({status:'error',error:'you are not active user please Register'})
})

exports.loginModule = loginModule
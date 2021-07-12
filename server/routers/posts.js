require('dotenv').config()
const express = require('express')
const posts = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../model/user')

posts.use(express.json())

posts.get('/posts',authenticateToken,async (req,res)=>{
    const { _id } = req.user
    const userFileData = await User.findById(_id).exec()
    userFileData && res.json({userData:userFileData.data})
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.authenticateToken = authenticateToken

exports.posts = posts;
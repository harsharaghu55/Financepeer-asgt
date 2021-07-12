require('dotenv').config()
const express = require("express")
const fileUploder = express.Router();
const multer = require('multer')
const User = require('../model/user')
const file = require('fs')
const { authenticateToken } = require('./posts.js')

async function getFileData(email){

    const data = file.readFileSync("./uploads/data.json")
    const fileData = JSON.parse(data.toString())
    await User.updateOne(
        { email }, 
        { $addToSet: { data: fileData } },(err,suss)=>{
            if(err){
                console.log(err)
            }else{
                console.log(suss)
        }
    })

    file.unlink("./uploads/data.json",(err) => {
        if (err) {
            console.log("failed to delete file"+err);
        } else {
            console.log("file deleted succsfully")                              
    }})
}

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'application/json'){
        cb(null, true)
    }else{
        cb(new Error('Only .json type files are accepted') ,false)
    }

}
const upload = multer({
                storage: storage,
                fileFilter:fileFilter
            })

fileUploder.post('/upload',authenticateToken,upload.single('file'),async (req,res)=>{
    getFileData(req.user.email)
    const { _id } = req.user
    const userFileData = await User.findById(_id).exec()
    res.status(200).json({fileUploaded:true,userData:userFileData.data})
})

exports.fileUploder = fileUploder
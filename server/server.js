require('dotenv').config()
var cors = require('cors')
const express = require("express")
const multer = require('multer')
const jwt = require('jsonwebtoken')
const router = require('./router.js')
const bcrypt = require('bcryptjs')
const User = require('./model/user')
const file = require('fs')

// const data = file.readFileSync("./uploads/data.json")
// console.log(JSON.parse(data.toString()))

// file.unlink("./uploads/data (1).json",(err) => {
//     if (err) {
//         console.log("failed to delete local image:"+err);
//     } else {
//         console.log('successfully deleted local image');                                
//     }})

const app = express()
app.use(cors())
app.use(express.json())

app.use('/router',router)

app.get('/posts',authenticateToken,async (req,res)=>{
    const obj = {name:"harsha"}
    const {_id} = req.user
    await User.updateOne(
        { _id: _id }, 
        { $push: { data: obj } },(err,suss)=>{
            if(err){
                console.log(err)
            }else{
                console.log(suss)
            }
        }
    )
    res.json({updated:true})
})

app.post('/secure-login',async (req,res)=>{
    const {userName:email,password} = req.body
    const user = await User.findOne({email}).lean()

    if(!user){
        return res.json({status:'error',error:'Invalid username/password'})
    }

    if(await bcrypt.compare(password,user.password)){
        const accessToken = jwt.sign({
            id:user._id,
            email: user.email
        },process.env.ACCESS_TOKEN_SECRET)

        return res.json({status:'ok',data:accessToken})
    }

    res.json({status:'error',error:'you are not active user please Register'})
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

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.file)
    res.status(200).json({fileUploaded:true})
})

 app.listen(3200,()=>{
     console.log("app is running on localhost:3200")
 })
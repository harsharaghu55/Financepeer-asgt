require('dotenv').config()
var cors = require('cors')
const express = require("express")
const { posts } = require('./routers/posts.js')
const { loginModule } = require('./routers/login.js')
const { registerModule } = require('./routers/register')
const { fileUploder } = require('./routers/fileUploder')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/posts',posts)
app.use('/login',loginModule)
app.use('/register',registerModule)
app.use('/fileUploder',fileUploder)


app.listen(3200,()=>{
     console.log("app is running on localhost:3200")
})
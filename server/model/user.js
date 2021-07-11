const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName:{type:String},
    email: {type:String},
    password: { type:String},
    data:[Object]
},{collection:
    'usersWithUplods'})

const model = mongoose.model('Financepeer-asgt', UserSchema)

module.exports = model
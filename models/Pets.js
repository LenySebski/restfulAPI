const mongoose = require('mongoose')
const Schema = mongoose.Schema

let petSchema = new Schema({
    _id: {
        type:String
    },
     name:{
        type:String,
        required: true
    },
    animal:{
        type:String,
        default:'dog'
    },
    age:{
        type:Number
    },
    friendly:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('Pet',petSchema)
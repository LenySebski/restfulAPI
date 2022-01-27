require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@sandbox.wnt93.mongodb.net/pets?retryWrites=true&w=majority`,{useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>{console.log('Connection open!')
}).catch(err=>{
    console.log('OH NO! We have a problem with database connection')
    console.error(err)
})
const db= mongoose.connection


app.use(express.json())

const petsRouter = require('./routes/pets.js')
app.use('/pets',petsRouter)






app.listen(3007, () => console.log('Server Started'))
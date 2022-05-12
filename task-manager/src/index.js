const express = require('express')
require('./db/mongoose')
const User=require('./db/models/user')
const Task=require('./db/models/task')
const userrouter=require('./routers/user')
const taskrouter=require('./routers/task')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(userrouter)
app.use(taskrouter)

app.listen(port,()=>{
    console.log("server is up on port " + port)
})

const jwt=require('jsonwebtoken')

const myFuntion=async()=>{
   const token= jwt.sign({ _id:'abc123' },'thisismynewcourse',{expiresIn:'7 days'})
   console.log(token)

   const data=jwt.verify(token,'thisismynewcourse')
    console.log(data)
}

// const bcrypt=require("bcryptjs")

// const myFuntion=async()=>{
//     const password='Devesh1234'
//     const hashedPassword=await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashedPassword)

//     const ismatch=await bcrypt.compare('Devesh1234',hashedPassword)
//     console.log(ismatch)
// }

myFuntion()
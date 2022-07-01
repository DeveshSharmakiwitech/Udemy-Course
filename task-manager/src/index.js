require('dotenv').config();
const express = require('express')
require('./db/mongoose')
const User=require('./db/models/user')
const Task=require('./db/models/task')
const userrouter=require('./routers/user')
const taskrouter=require('./routers/task')
const bodyParser = require("body-parser")

const app=express()


const port=process.env.PORT 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userrouter)
app.use(taskrouter)

app.listen(port,()=>{
    console.log(`server is update at port number ${port}`)
})





// app.use((req,res, next )=>{
//     if(req.type === 'get'){
//         res.send('Get requests are disabled!')
       
//     }
//     else{ console.log('hi')
//         next()
//     }
// })


// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently down. Check back soon!')
// })


// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('please upload a word document'))
//         }
//         cb(undefined,true)



//         // cb(new Error('File must be a PDF'))
//         // cb(undefined,true)
//         // cb(undefined,false)
//     }
// })

// // const errorMiddleware = (req,res,next)=>{
// //     throw new Error('From my middleware')
// // }

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })



// const Task = require('./db/models/task')
 
// // const main=async()=>{
// //     const task = await Task.findById('6284d8aeae6efdb24a7c0f61')
// //     await task.populate( 'owner' )         //.execPopulate(); :- this funtion is not used yet
// //     console.log(task.owner)

// //     const user=await User.findById('6284d83c0de06cbcdebdfaf1')
// //     await user.populate('tasks')
// //     console.log(user.tasks)

// a
// // }

// // main()


// const pet ={
//     name:'Hal'
// }

// pet.toJSON=function(){
//     return {}
// }

// console.log(JSON.stringify(pet))

// const jwt=require('jsonwebtoken')

// const myFuntion=async()=>{
//    const token= jwt.sign({ _id:'abc123' },'thisismynewcourse',{expiresIn:'7 days'})
//    console.log(token)

//    const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }

// // const bcrypt=require("bcryptjs")

// // const myFuntion=async()=>{
// //     const password='Devesh1234'
// //     const hashedPassword=await bcrypt.hash(password,8)

// //     console.log(password)
// //     console.log(hashedPassword)

// //     const ismatch=await bcrypt.compare('Devesh1234',hashedPassword)
// //     console.log(ismatch)
// // }

// myFuntion()
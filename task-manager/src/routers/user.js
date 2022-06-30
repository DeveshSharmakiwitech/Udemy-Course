const express = require('express')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const lodash = require('lodash')
const sharp = require('sharp')
const User = require('../db/models/user')
const auth = require('../middleware/auth')
const fs = require('fs')

const {sendWelcomeEmail,sendCancelationEmail,forgotPasswordEmail}=require('../emails/account')
const router = new express.Router()

const app=express()

const swaggerJSDOC = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi : '3.0.0',
        info : {
            title: 'Udemy Node js Api Project for mongodb',
            description: 'this is my learning',
            version: '1.0.0'
        },
        servers:[
            {
            url : 'http://localhost:3001/'
            }
        ]
    },
    apis:['./mongodb.js']
}

const swaggerSpec = swaggerJSDOC(options)
router.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))




router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()    //********* */
        res.status(201).send({message : 'User register successully', data:user, token,status : 201})
    } catch (e) {
        res.status(400).send({message:'This email id is already register!', data:null ,status:400})
    }
})

router.post('/users/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() 
                  //*********** */
        res.status(200).send({message:'User login successfully', data:user,token, status : 200 })
    } catch (e) {
        console.log("error => ",e)
        res.status(400).send({message:'Enter the correct credidentials', data:null, status : 400 })
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        const users = req.user
        const user = await User.findOne({_id:users})

           //Token logout by fs
        await fs.unlink(user._id+'.txt', function (err) {
            if (err) throw err;
            console.log('Token File deleted!');
          });
        
        //Token logout by db
        // user.tokens=user.tokens.filter((token)=>{
        // return token.token!==req.token
        // })
        // await user.save()

        res.send({message:'Logout Successfully!',status:200})
    }catch(e){
        res.status(500).send({message:'Unable to communicate with server',status:500})
        console.log(e)
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        const users = req.user
        const user = await User.findOne({_id:users})
        user.tokens=[]
        await user.save()
        res.status(200).send({message:'Logout All Successfully!', status:200})
    }
    catch(e){
        res.status(500).send({message:'Unable to communicate with server',status:500})
    }
})

/**
 * @swagger
 * tags:
 *  name: Main
 *  description: this is for the main Apis
 *  /users/me:
 *   get:
 *      tags: [Main]
 *      summary: this api is used to create user
 *      description: this api is used to create user
 *      responses:
 *          200:
 *              description: to test post method
 *              content:
 *                  application/json
 */

router.get('/users/me', auth, async (req, res) => {
    try{
        const users = req.user
        const user = await User.findOne({_id:users})   

        res.status(200).send({message:'User Data found', data:user, status : 200 })
    } catch(err){
        res.status(400).send({message:'User Data not found', data:null, status : 400 })
    }
    
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findById(req.params.id)
        const users = req.user
        const user = await User.findOne({_id:users}) 
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user.id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        const users = req.user
        const user = await User.findOne({_id:users}) 
        await user.remove()
        sendCancelationEmail(user.email,user.name)
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

//forgot password by link

router.put('/users/forget_password',async(req,res)=>{
    try{
        const user = await User.findOne(req.body)
        if(!user){
            return res.status(400).send({message: 'Incorrect Email',status:400})
        }

        const token = await user.generateAuthToken()
       
        
       user.updateOne({resetLink:token},function (err,success){ 
            if(err){
                return res.status(400).send({message:'Reset password link error',status:400});
            }
            else{
                console.log(token)
                forgotPasswordEmail(user.email,token)
                return res.status(200).send({message:'Email has been send, Kindly follow the instruction',status:200});
            }
        })
    } 
    catch(err){
        console.log(err)
        res.status(400).send({message:'mail have been not send!',status:400});
    }
})

//reset password by link

router.put('/users/reset_password',async(req,res)=>{
    try{
        const {resetLink, newPassword}=req.body;

        if(resetLink){
            await jwt.verify(resetLink, process.env.JWT_SECRET, function(err,decodedData){
                if(err){
                    return res.status(400).send({message:'Incorrect token or it is expired.',status:400})
                }
                User.findOne({resetLink},(err,user)=>{
                    if(err || !user ){
                        return res.status(400).send({message:'user with this token does not exits.',status:400})
                    }

                    const obj = {password:newPassword,resetLink:''}
                    user = lodash.extend(user, obj);
                    // user.save()
                    // res.status(200).send({message:'Your password has been changed', status:200})
                    user.save((err,result)=>{
                        if(err){
                            return res.status(400).send({message:'Enter the Strong Password', status:400})
                        } else{
                            return res.status(200).send({message:'Your password has been changed', status:200})
                        }
                    })
                    
                })
            })
        }
        else{
            return res.status(401).send({message:'Authentication Error!!!',status:401})
        }

    }catch(err){
        res.status(400).send({message:'Password can not reset',status:400})
    }
})


//Forgot Password BY OTP

// router.put('/users/forget_password',async(req,res)=>{
//     try{
//         const user = await User.findOne(req.body)
//         if(!user){
//             return res.status(400).send({message: 'Incorrect Email',status:400})
//         }

//         const token = await Math.floor((Math.random()*10000)+1)
       
        
//        user.updateOne({resetLink:token},function (err,success){ 
//             if(err){
//                 return res.status(400).send({message:'Reset password OTP error',status:400});
//             }
//             else{
//                 console.log(token)
//                 forgotPasswordEmail(user.email,token)
//                 return res.status(200).send({message:'Email has been send, Kindly follow the instruction',status:200});
//             }
//         })
//     } 
//     catch(err){
//         console.log(err)
//         res.status(400).send({message:'mail have been not send!',status:400});
//     }
// })

// reset password by OTP

// router.put('/users/reset_password',async(req,res)=>{
//         try{
//             const {resetLink, newPassword}=req.body;
//             console.log({resetLink})
//             const user = await User.findOne({resetLink: parseInt(resetLink,10)})  
//             // console.log(user)
//             if(!user){
//                 return res.status(400).send({message:'user with this OTP does not exits.',status:400})
//             } 
//             // let obj = {password:newPassword,resetLink:''} 
//             // console.log(typeof 'newPassword')
//             // user = lodash.extend(user, obj);

//             user.updateOne({ 
//                 password:await bcrypt.hash(newPassword, 8),
//                 resetLink:''
//             },(err,result)=>{
//                 if(err){
//                     console.log(err)
//                 }
//             })
              
//             user.save((err,result)=>{
//                 if(err){
                               
//                 return res.status(400).send({message:'Enter the Strong Password', status:400})
//                 } else{
//                 return res.status(200).send({message:'Your password has been changed', status:200})
//                 }
//                 })
               
//         }catch(err){
//             console.log(err)
//             res.status(400).send({message:'Password can not reset',status:400})
//         }
// })




const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const users = req.user
    const user = await User.findOne({_id:users}) 
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    user.avatar=buffer
    await user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.delete('/users/me/avatar',auth,async(req,res)=>{
    const users = req.user
    const user = await User.findOne({_id:users}) 
    user.avatar=undefined
    await user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch(e){
        res.status(404).send()
    }
})

module.exports = router








// const express=require('express')
// const User=require('../db/models/user')
// const auth=require('../middleware/auth')
// const router= new express.Router()

// router.post('/users',async(req,res)=>{
//     const user=new User(req.body)

//     try{
//         await user.save()
//         const token=user.generateAuthToken()
//         res.status(201).send({user,token})
//     }
//     catch(e)
// {
//     res.status(400).send(e)
//   }
// })

// router.post('/users/login',async(req,res)=>{
//     try{
//         const user=await User.findByCredentials(req.body.email, req.body.password)
//         const token= await user.generateAuthToken()
//         res.send({user,token})
//     }
//     catch(e){
//         res.status(400).send()
//     }
// })


// router.get('/users',auth,async(req,res)=>{
//     try{
//         const user=await User.find({})
//         res.send(user)
//     }
//     catch{
//         res.status(500).send()
//     }
// })

// router.get('/users/:id',async(req,res)=>{
//     const _id=req.params.id

//     try{
//         const user= await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send()
//     }
// })

// router.patch('/users/:id',async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates=['name','email','password','age']
//     const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({error:'Invalid updates'})
//     }

//     try{
//         const user= await User.findById(req.params.id)
        
//         updates.forEach((update)=>user[update]=req.body[update])
//         await user.save()

//         // const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
//         if(!user){
//             return res.status(404).send()
//         }

//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send()
//     }
// })

// router.delete('/users/:id',async(req,res)=>{
//     try{
//         const user=await User.findByIdAndDelete(req.params.id)

//         if(!user){
//             return res.status(404).send()
//         }

//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send()
//     }
// })

// module.exports=router
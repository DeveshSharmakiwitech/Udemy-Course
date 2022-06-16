const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../db/models/user')
const auth = require('../middleware/auth')
const {sendWelcomeEmail,sendCancelationEmail}=require('../emails/account')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({message : 'User register successully', data:user, token, status : 201})
    } catch (e) {
        res.status(400).send({message:'This email id is already register!', data:null ,status:400})
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({message:'User login successfully', data:user, token, status : 200 })
    } catch (e) {
        res.status(400).send({message:'Enter the correct credidentials', data:null, status : 400 })
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
        return token.token!==req.token
        })
        await req.user.save()

        res.send({message:'Logout Successfully!',status:200})
    }catch(e){
        res.status(500).send({message:'Unable to communicate with server',status:500})
        console.log(e)
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.token=[]
        await req.user.save()
        res.status(200).send({message:'Logout All Successfully!', status:200})
    }
    catch(e){
        res.status(500).send({message:'Unable to communicate with server',status:500})
    }
})

router.get('/users/me', auth, async (req, res) => {
    try{
        res.status(200).send(req.user)
    }catch(err){
        res.status(400).send({message:'Data not found', data:null, status : 400 })
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

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
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

        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/forget_password',async(req,res)=>{
    try{

    } catch(err){
        res.status(400).send({msg:'mail have been send!'});
    }
})




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
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
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
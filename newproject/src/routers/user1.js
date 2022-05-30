const express=require('express')
const { UserModel,userSchema } =require('../models/user')
const router=new express.Router()


router.post('/user',async(req,res)=>{
    const user=new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/user/login',async(req,res)=>{
    try{
        const { rollnumber, password } = req.body;
        const user= await userSchema.statics.findByCredentials(rollnumber, password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    } catch(err){
        throw err;
    }
})

router.get('/user/:id',async(req,res)=>{
    const _id= req.params.id
    
    try{
            const user=await User.findById(_id)

            if(!user){
                console.log('hi')
               return res.status(404).send();
            }

            res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

router.patch('/user/:id',async(req,res)=>{
    const update=Object.keys(req.body)
    const allowedUpdates=['name','email','password','address','age']
    const isValidOperation=update.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'invalid updates'})
    }
    try{
            const user=await User.findById('628e06da353d1ec3d4b2befd')
            update.forEach((update)=>user[update]=req.body[update])
            await user.save()
            if(!user){
                return res.status(400).send()
            }
            res.send(user)
    }catch(e){
        res.status(500).send()
    }

})

router.delete('/user/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
        console.log(e)
    }
})


module.exports=router
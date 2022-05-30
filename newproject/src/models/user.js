const { throws } = require('assert-plus')
const mongoose= require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
// const User = require('../../../task-manager/src/db/models/user')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    rollnumber:{
            type:Number,
            require:true,
            unique:true,
            trim:true,
            minlength:2,
            validate(value){
                if(!value){
                    return Error()
                }
            }
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot Contain')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    address:{
        type:String,
        default:'NA',
        trim:true
    },
    token:{
        type:String
    }
},{
    timestamps:true
})

userSchema.methods.generateAuthToken = async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'thisismynewcourse')

    user.tokens=token
    await user.save()
    return token
}

userSchema.statics.findByCredentials=async(rollnumber,password)=>{
    const user = await UserModel.findOne({rollnumber})
    
    if(!user){
        throw new Error('Unable to login')
    }

    const ismatch=await bcrypt.compare(password,user.password)

    if(!ismatch){
        throw new Error('unable to login')
    }

    return user
}

userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

const UserModel=new mongoose.model('users',userSchema)

module.exports= { UserModel,userSchema };
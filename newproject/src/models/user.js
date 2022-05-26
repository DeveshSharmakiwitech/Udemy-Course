const mongoose= require('mongoose')
const validator=require('validator')

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
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:7,
        // validate(value){
        //     if(value.toLowerCase().include('password')){
        //         throw new Error('Password cannot Contain')
        //     }
        // }
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
    }
})

const user=new mongoose.model('user',userSchema)

module.exports=user
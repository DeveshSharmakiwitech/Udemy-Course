const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!")
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a postive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const ismatch=await bcrypt.compare(password, user.password)

    if(!ismatch){
        throw new Error('Unable to login')
    }

    return user
}

//hash the plain text password before saving

userSchema.pre('save', async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password, 8)
    }

    next()
})

const User=mongoose.model('user',userSchema )

module.exports=User
const mongoose=require('mongoose')
// const validator=require('validator')
// const { string, required } = require('yargs')

mongoose.connect(process.env.Mongodb_url,{
    useNewUrlParser:true,
    // useCreateIndex:true  :- Not supported
    // userFindAndModify:false   :- Not supported
},
mongoose.set('debug', true)
)





















    // const User=mongoose.model('user',{
    //     name:{
    //         type:String,
    //         required:true,
    //         trim:true
    //     },

  
    //     email:{
    //         type:String,
    //         required:true,
    //         trim:true,
    //         lowercase:true,
    //         validate(value){
    //             if(!validator.isEmail(value)){
    //                 throw new Error("Email is invalid!")
    //             }
    //         }
    //     },
    //     age:{
    //         type:Number,
    //         default:0,
    //         validate(value){
    //             if(value<0){
    //                 throw new Error('Age must be a postive number')
    //             }
    //         }
    //     },
    //     password:{
    //         type:String,
    //         required:true,
    //         minlength:7,
    //         trim:true,
    //         validate(value){
    //             if(value.toLowerCase().includes('password')){
    //                 throw new Error('Password cannot contain "password"')
    //             }
    //         }
    //     }
    // })

    // const me1=new User({
    //     name:'Devesh Sharma',
    //     email:'myemail@kiwie.com',
    //     password:'Deves@h70'
       
    // })

    // me1.save().then(()=>{
    //     console.log(me1)
    // }).catch((error)=>{
    //     console.log('Error!',error)
    // })


    // const Task=mongoose.model('Task',{
    //     description:{
    //         type:String,
    //         trim:true,
    //         required:true
    //     },
    //     completed:{
    //         type:Boolean,
    //         default:false
    //     }
    // })

    // const me=new Task({
    //     description:'  Eat lunch',
    //     completed:false
    // })

    // me.save().then(()=>{
    //     console.log(me)
    // }).catch((error)=>{
    //     console.log('Error!',error)
    // })
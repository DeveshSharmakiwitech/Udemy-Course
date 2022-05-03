const mongoose=require('mongoose');

//connection creation and creatin a new db

mongoose.connect('mongodb://localhost:27017/ttchanell')
.then( ()=> console.log('connection successfull.....'))
.catch((err)=>console.log(err));
console.log('HELLO');

const playlistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})









const playlist = new mongoose.model('playlist',playlistSchema);
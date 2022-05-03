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

const createDocument=async()=>{
    try{
        const jsplaylist=new playlist({
            name:'Js',
            ctype:'frontend',
            videos:160,
            author:'thapa technical',
            active: true
        })

        const mongoDBplaylist=new playlist({
            name:'mongodb',
            ctype:'Databse',
            videos:10,
            author:'thapa technical',
            active: true
        })

        const mongooseplaylist=new playlist({
            name:'Mongoose js',
            ctype:'Database',
            videos:4,
            author:'thapa technical',
            active: true
        })

        const expressplaylist=new playlist({
            name:'Express js',
            ctype:'backend',
            videos:20,
            author:'thapa technical',
            active: true
        })

        // const result = await playlist.insertMany([jsplaylist,mongoDBplaylist,mongooseplaylist,expressplaylist]);
        // console.log(result);
    }
    catch(err){
        console.log(err);
    }
}


// createDocument();

// const getDocument = async () =>{
//     try{
//     const result = await playlist
//     .find({ctype:{$in :['backend','database']}})
//     .select({name:1});
//     console.log(result);
// }
// catch(err){
//     console.log(err);
// }}

const getDocument = async () =>{
    try{
    const result = await playlist
    .find({$and :[{ctype:'backend'}, {author:'thapa technical'}]})
    .select({name:1});
    console.log(result);
}
catch(err){
    console.log(err);
}}


getDocument();

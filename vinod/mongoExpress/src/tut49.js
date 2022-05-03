const mongoose=require('mongoose');

//connection creation and creatin a new db

mongoose.connect('mongodb://localhost:27017/ttchanell')
.then( ()=> console.log('connection successfull.....'))
.catch((err)=>console.log(err));
console.log('HELLO');
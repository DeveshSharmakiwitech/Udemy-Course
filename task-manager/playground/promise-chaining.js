require('../src/db/mongoose')
const User=require('../src/db/models/user')

// 6278e32baf6c164b6498a5d2

User.findByIdAndUpdate('6278e32baf6c164b6498a5d2',{age:2}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
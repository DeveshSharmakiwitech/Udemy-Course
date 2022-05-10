require('../src/db/mongoose')
const { count } = require('yargs')
const Task = require('../src/db/models/task')
const User=require('../src/db/models/user')

// 6278e32baf6c164b6498a5d2

// User.findByIdAndUpdate('6278e32baf6c164b6498a5d2',{age:2}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

// const updateAgeAndCount=async(id,age)=>{
//     const user=await User.findByIdAndUpdate(id,{age})
//     const count=await User.countDocuments({age})
//     return count
// }

// updateAgeAndCount('6278e32baf6c164b6498a5d2',2).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount=async(id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({comleted:false})
    return count
}

deleteTaskAndCount('6278eb5db1f7980afc6e0e4f').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
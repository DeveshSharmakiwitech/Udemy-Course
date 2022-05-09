require('../src/db/mongoose')
const Task=require('../src/db/models/task')

Task.findByIdAndDelete('6278ebe5b7fe927f4064ed6b').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
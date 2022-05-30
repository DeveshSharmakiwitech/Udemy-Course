const mongoose=require('mongoose')


// const connectionURL='mongodb+srv://user:user.s@user.ildox.mongodb.net/test'

mongoose.connect('mongodb+srv://user:user.s@user.ildox.mongodb.net/newdb',{
    useNewUrlParser :true
},
console.log("connected to database")
)


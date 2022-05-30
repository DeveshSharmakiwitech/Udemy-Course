const express=require('express')
require('./db/mongoose')
// const user=require('./models/user')
const userrouter=require('./routers/user1')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(userrouter)

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})
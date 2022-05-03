const express=require('express');
const app=express();

app.get('/',(req,res)=>
{
    res.send('hello world');
})

app.get('/about',(req,res)=>
{
    res.send('hello world form about page');
})

app.listen(8000,()=>
{
    console.log("lising form the port 8000");
})
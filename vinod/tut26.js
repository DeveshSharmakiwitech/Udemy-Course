const express=require('express');
const app=express();
const port=8000;


app.get('/',(req,res)=>
{
    res.send('welcome to home page');
})

app.get('/about',(req,res)=>
{
    res.status(200).send('hello world form about page');
})

app.get('/contact',(req,res)=>
{
    res.send('welcome to contact page');
})

app.get('/temp',(req,res)=>
{
    res.send('welcome to temp page');
})


app.listen(8000,()=>
{
    console.log("lising form the port 8000");
})
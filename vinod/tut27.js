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
    res.json([
        {
            id:1,
            name:'ram'
        },
        {
            id:3,
            name:'syam'
        }
    ])
})


app.listen(8000,()=>
{
    console.log("lising form the port 8000");
})
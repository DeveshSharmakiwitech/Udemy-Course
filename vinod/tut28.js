const express=require('express');
const path=require('path');
const app=express();
const port=8000;

const staticpath=path.join(__dirname,'../public');
app.use(express.static(staticpath));


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
//Basic express
// 
// const express=require('express')
// 
// const app=express()
// 
// app.get('',(req,res)=>{
    // res.send('Hello express!')
// })
// 
// app.get('/help',(req,res)=>{
    // res.send('Help page')
// })
// 
// app.get('/about',(req,res)=>{
    // res.send('About')
// })
// 
// app.get('/weather',(req,res)=>{
    // res.send('your weather!')
// })
// 
// app.listen(3000,()=>
// {
    // console.log('server is up on post 3000.')
// })







//serving up HTML and JSON

// const express=require('express')

// const app=express()

// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([
//         {name:'Andrew'},
//         {name:'sarah'}
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'it is snowing',
//         location:'philadelphiia'
//     })
// })

// app.listen(3000,()=>
// {
//     console.log('server is up on post 3000.')
// })








//  serving up static assets

// const path =require('path');
// const express=require('express');

// const app=express()

// app.use(express.static(publicDirectorypath))

// app.get('/weather',(req,res)=>
// {
//     res.send({
//         forecast:'it is snowing',
//         location:'philadelphia'
//     })
// })

// app.listen(3000,()=>{
//     console.log('server is up on port 3000.')
// })






// Dynamic pages with templating

const path =require('path');
const express=require('express');
const hbs = require('hbs');

const app=express()

//  Define paths for express Config
const publicDirectorypath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


// setup handlebars engine and viewa location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

// setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather',
        name:'Andrew Mead'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About me',
        name:'Andrew Mead'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        helpText:'this is some helpful text.',
        title:'Help',
        name:'Devesh Sharma'
    })
})

app.get('/weather',(req,res)=>
{
    res.send({
        forecast:'it is snowing',
        location:'philadelphia'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})    
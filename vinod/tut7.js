const fs=require('fs');

fs.writeFile('read.txt','today is awesome day',(err)=>
{
    console.log("file is created");
    console.log(err);
})

fs.appendFile('read.txt',' add something',(err)=>
{
    console.log('add new');
})
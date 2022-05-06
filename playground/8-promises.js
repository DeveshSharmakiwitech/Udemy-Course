// const { rejects } = require("assert");
// const { resolve } = require("uri-js");

const doWorkPromises=new Promise((resolve,rejects)=>{
    setTimeout(()=>{
        // resolve([7,4,1])
        rejects('Things went wrong!')
    },2000)
})

doWorkPromises.then((result)=>{
    console.log('Success',result)
}).catch((error)=>{
    console.log('Error!',error)
})
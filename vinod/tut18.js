const fs=require("fs");
const bioData={
    name:"vinod",
    age:26,
    channel:"Thapa technical"
}

const jsondata=JSON.stringify(bioData);
// fs.writeFile("json1.json",jsondata,(err)=>
// {
    // console.log("done");
// });

// fs.readFile("json1.json",'utf-8',(err,data)=>{
//     const orgData=JSON.parse(data);
//     console.log(data);
//     console.log(orgData);
// })
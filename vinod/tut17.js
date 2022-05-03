const http =require("http");

const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        res.end("Hello form the home sides");
    }
    else if(req.url=="/about"){
        res.end("hello form the aboutus sides");
    }
    else if(res.url=="/contact"){
        res.end("hello form the contactus sides");
    }
    else{
        res.writeHead(404,{"content-type":"text/html"});
        res.end("<h1>404 error pages.page doesn't exit </h1>");
    }
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('listening to the port no. 8000');
})
var http=require('http');

var data=[
    {name:"anil",Age:'22',email:'anil@gmail.com'},
    {name:"ram",Age:'27',email:'ram@gmail.com'},
    {name:"syam",Age:'29',email:'syam@gmail.com'}
];
http.createServer(function(request,response)
{
    response.writeHead(200,{'Content-Type':'application\json'});
    response.write(JSON.stringify(data));
    // response.write("{ name:'anil' }");
    response.end();
}).listen(5000);
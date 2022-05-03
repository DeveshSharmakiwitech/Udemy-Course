var http=require('http');
var data=`<h1>Hello node js </h1><input type='text'/ ><br><br><input type='text'/ ><br><br><input type='text'/ ><br><br>`
http.createServer(function(request,response)
{
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(JSON.stringify(data));
    response.end();
}).listen(5200);
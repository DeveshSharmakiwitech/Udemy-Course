var http=require('http');
var uc=require('upper-case');
http.createServer(function(req,res)
{
    res.write(uc.upperCase("node web page"));
    res.end();
}).listen(8700);
var http=require('http');
const { listenerCount } = require('process');
http.createServer(function(req,res){
    res.write('nodemon tutorial ');
    res.end();
}).listen(5000)
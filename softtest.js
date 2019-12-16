var http = require('http');
var server = http.createServer(function(req,res){
    console.log(req);
    if(req.url === '/registration'){
        res.end("this is registration page")
    }
    else{
            res.setHeader('Content-Type','Text');
            res.statusCode = 301;
            res.end('the response has ended');
            }
});

// function cb1(req,res){
//     console.log(req);
//     if(req.url === '/registration'){
//         res.end('this is registration page');
//     }
//     else{
//     res.setHeader('Content-Type','Text');
//     res.statusCode = 301;
//     res.end('the response has ended');
//     }
// }

server.listen(3011);
// console.log(http);
let http = require('http');
let fs = require('fs');


let server = http.createServer()
let wwwDir = './www'

server.on('request',function( request , response ){
    let url = request.url
    console.log(url)
    switch (url) {
        case '/':
            fs.readFile('./index.html',function(err,data){
                if(err){
                    console.error(err)
                    return '404 Not Found.'
                }else{
                    response.end(data)
                }
            })

            break
        default:
            break
    }

})

server.listen(8081,function(){
    console.log('Server running at http://127.0.0.1:8081/');
})

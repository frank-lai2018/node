let express = require('express')

let app = express()

app.use('/static',express.static('./public/www'))

app.listen(4000,function(){
    console.log('app run listen 4000 ....');
})
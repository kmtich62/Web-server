var express = require("express");
var app = express();
var myPort = '3000';

var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log("private route hit");
        next();
    },
    logger: function(req, res, next){
        console.log('Request: '+ new Date().toString() + ' ' +
            req.method +' '+
            req.originalUrl);
        next();
    }
};

//put the middleware here for application level use.
app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function(req, res){
    res.send("About Us");
})

app.use(express.static(__dirname + '/public'));

app.listen(myPort, function(){
    console.log('Express Server started on port ' + myPort);
});
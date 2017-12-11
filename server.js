var express=require('express');
var app=express();
var ip = require('ip');
app.use(express.static('./')); 

require("./controller/controller.js")(app);

app.listen(8181,function(){
    console.log("Lala token Server is listening on http://"+ip.address()+":8181");
})
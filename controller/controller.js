var models = require('../model/model.js');
var path = require('path');
var bodyParser = require('body-parser');



module.exports = function (app){
    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({     
        extended: true
    }));
    
    app.get('/',function(req,res){
        models.lalatokens.findOne({},function(err,doc){
            if(err){
                res.json(err); 
            }
            if(doc == null){
                models.lalatokens.create({"total":"200000000"},function(err,doc){
                    if(err) res.json(err);
                    else{
                        res.sendFile(path.resolve(__dirname+"/../views/index.html"));
                    }
                });
            }else{
                res.sendFile(path.resolve(__dirname+"/../views/index.html"));
            }
        })
    });
    
    app.get('/totalToken',function(req,res){
        models.lalatokens.find({},function(err,tokens){
            if(err){
                res.json(err); 
            }
            if(tokens){
                models.tradeHistory.find({},function(err,history){
                    if(err){
                        res.json(err); 
                    } else {
                        res.send(JSON.stringify({
                            "token":tokens[0].total,
                            "history":history
                        }));
                    }
                })
            }
        }) 
    });  

    app.post('/tradeToken',function(req,res){
        var tradeData = req.body;
        tradeData["date"]=new Date();
        models.lalatokens.find({},function(err,tokens){
            if(err){
                res.json(err); 
            }
            if(tokens){
                models.tradeHistory.create(tradeData,function(err,doc){
                    if(err){
                        res.json(err); 
                    } else {
                        var updateTokens = JSON.stringify(parseInt(tokens[0].total)-parseInt(tradeData.tokenvolume))
                        models.lalatokens.update({
                            "_id":tokens[0]._id
                        },{
                            '$set':{
                                "total": updateTokens
                            }
                        },function(err,doc){
                            if(err){res.json(err);}
                            else{
                                res.send(true);
                            }
                        });
                    }
                })
            }
        }) 
         
    });    
}
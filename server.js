var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongoose = require("mongoose");  
  
var db = mongoose.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db ); }  
});  
  
   
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
 var Schema = mongoose.Schema;  
  
var UsersSchema = new Schema({      
 firstName: { type: String   }, 
 lastName: { type: String   },      
 addl1: { type: String   },
 addl2: { type: String   },
 city: { type: String   },
 state: { type: String   },
 country: { type: String   },
 email: { type: String   },
 zipcode:{type:Number},

},{ versionKey: false });  
   
  
var model = mongoose.model('users', UsersSchema, 'users');  
  
app.post("/api/SaveUser",function(req,res){   
 var mod = new model(req.body);  
//  if(req.body.mode =="Save")  
//  {  
    mod.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has  been Inserted..!!"}); 
          // model.find({},function(err,data){  
          //   if(err){  
          //       res.send(err);  
          //   }  
          //   else{                
          //       res.send(data);  
          //       }  
       
      }  
 });  
  
// else   
// {  
//  model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},  
//    function(err,data) {  
//    if (err) {  
//    res.send(err);         
//    }  
//    else{        
//           res.send({data:"Record has been Updated..!!"});  
//      }  
//  });  
  
  
// }  
 })  
  
 app.post("/api/deleteUser",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{    
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
   })  
  
  
  
 app.get("/api/getUser",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{           
                  res.send(data);  
                  }  

          });  
  }) 
   
  
  
app.listen(3010, function () {  
    
 console.log('Example app listening on port 3010!')  
})  
var express=require('express');
var bodyParser=require('body-parser');

var {ObjectID}= require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require("./models/todos");
var {User}=require('./models/user');

var app= express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo =new Todo({   
        text :req.body.text,
        complete:req.body.complete
    })
    todo.save().then((d)=>{
        res.send(d);     //can give any value inside then and then send give the same value
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({ todos })   //you can give any value to it
    },(e)=>{
        res.send(e).status(400);
    })
});

app.get('/todos/:id',(req,res)=>{
      var id =req.params.id;
      if(!ObjectID.isValid(id)){
         return console.log ('NOT VALID ID');
      };
      Todo.findById(id).then((todo)=>{
          if(!todo){
             return  res.status(404).send();
          }
          res.send({todo});
      }).catch((e)=>{
          res.status(400).send();
      })
})

app.listen(3000,()=>{
    console.log('Started on Port 3000');
});





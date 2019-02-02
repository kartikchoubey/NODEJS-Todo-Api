var express=require('express');
var bodyParser=require('body-parser');
var _=require('lodash');

var {ObjectID}= require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require("./models/todos");
var {User}=require('./models/user');
var {auth}=require("./miiddleware/auth");

var app= express();
const port=process.env.PORT || 3000 ;

app.use(bodyParser.json());


app.post('/todos',auth,(req,res)=>{
    var todo =new Todo({   
        text :req.body.text,
        complete:req.body.complete,
        _creator:req.user._id
    })
    todo.save().then((d)=>{
        res.send(d);     //can give any value inside then and then send give the same value
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',auth,(req,res)=>{
    Todo.find({
        _creator:req.user._id
    }).then((todos)=>{
        res.send({ todos })   //you can give any value to it
    },(e)=>{
        res.send(e).status(400);
    })
});

app.get('/todos/:id',auth,(req,res)=>{
      var id =req.params.id;
      if(!ObjectID.isValid(id)){
         return console.log ('NOT VALID ID');
      };
      Todo.findOne({
          _id:id,
          _creator:req.user._id
      }).then((todo)=>{
          if(!todo){
             return  res.status(404).send();
          }
          res.send({todo});
      }).catch((e)=>{
          res.status(400).send();
      })
})

app.delete('/todos/:id',auth,(req,res)=>{
        var id =req.params.id
        if(!ObjectID.isValid(id)){
           return res.status(404).send();
        }
        Todo.findOneAndRemove({
            _id:id,
            _creator:req.user._id
        }).then((todo)=>{
            if(!todo){
                return  res.status(404).send();
            };
            res.send(todo).status(200);
        }).catch((e)=>{
            res.status(400).send();
        });
});

app.patch('/todos/:id',auth,(req,res)=>{
    var id = req.params.id;
    var body =_.pick(req.body,['text','complete']);

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    if(_.isBoolean(body.complete) && body.complete){
        body.completedAt = new Date().getTime();
    }else{
        body.complete=false
        body.completedAt=null
    }
    Todo.findOneAndUpdate({
         _id:id,
         _creator:req.user._id
    },{$set : body},{new :true}).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,["email","password"]);
    var user =new User(body);
    user.save().then((user)=>{
     return user.generateAuthToken();
    }).then((token)=>{
            res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.send(e).status(404);
          });

    });


    app.get('/users/me',auth,(req,res)=>{
        res.send(req.user);
 });

 app.post('/users/login',(req,res)=>{
     var body=_.pick(req.body,["email","password"]);
     User.findbyVerification(body.email,body.password).then((user)=>{
         return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
     }).catch((e)=>{
         res.send.status(404);
     })
 });

 app.delete('/users/me/token',auth,(req,res)=>{
     req.user.removeToken(req.token).then(()=>{
         res.send().status(200);
     }).catch((e)=>{
         res.send.status(404);
     })

 })

app.listen(port,()=>{
    console.log(`Started on Port ${port}`);
});





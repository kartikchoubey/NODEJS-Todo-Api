//const MongoClient =require('mongodb').MongoClient;   es6 destructuring
 const {MongoClient,ObjectID}= require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Not able to connect');
    }
    console.log('Connected to database MongoDB');
    db.collection('Todos').insertOne({
       // _id:'123',
        text:"some text is added",
        complete:false
    },(err,result)=>{
         if(err){
         return  console.log('something went wrong',err)
         }
         console.log(JSON.stringify(result.ops,undefined,2));

    });

    db.close();
})



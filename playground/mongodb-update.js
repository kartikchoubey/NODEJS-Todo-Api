//const MongoClient =require('mongodb').MongoClient;   es6 destructuring
const {MongoClient,ObjectID}= require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Not able to connect');
    }
    console.log('Connected to database MongoDB');
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c50302c33d1d00bcc15f549')
    },{
        $set :{
            text:"kartik choubey",
            complete:false
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })


})
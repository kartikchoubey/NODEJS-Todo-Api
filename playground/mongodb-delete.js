//const MongoClient =require('mongodb').MongoClient;   es6 destructuring
const {MongoClient,ObjectID}= require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Not able to connect');
    }
    console.log('Connected to database MongoDB');
    //deleteMany
    // db.collection('Todos').deleteMany({ text:"kartik"}).then((result)=>{
    //      console.log(result);
    // })
    //deleteOne
//     db.collection('Todos').deleteOne({ text:"kartik"}).then((result)=>{
//         console.log(result);
//    })
 // findOneAndDelete
 db.collection('Todos').findOneAndDelete({ _id:new ObjectID("5c502a8dd77bfe21dca2f4a2")}).then((result)=>{
    console.log(result);
         });
});
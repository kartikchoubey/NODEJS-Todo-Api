//const MongoClient =require('mongodb').MongoClient;   es6 destructuring
const {MongoClient,ObjectID}= require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Not able to connect');
    }
    console.log('Connected to database MongoDB');
    db.collection('Todos').find(
        // {
        //    _id :new ObjectID('5c50302c33d1d00bcc15f549'),
        //   complete:true
        // }     
    ).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
         console.log('Unaable to fetch data',err);
    })
    db.collection('Todos').count().then((count)=>{
        console.log('count is ',count)
    })
});
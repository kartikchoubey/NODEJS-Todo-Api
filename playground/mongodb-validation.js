var {mongoose}=require('./../server/db/mongoose');
var  {Todo} = require("./../server/models/todos");

var id = '5c506db3183a8f6c3b72fea2';

Todo.findById(id).then((todo)=>{
  console.log(todo);

})
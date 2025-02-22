const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5d14b79ab25eed2040b9d1a011';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid')
// }

// Todo.find({
//    _id: id 
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id 
// }).then((todo) => {
//      console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
// console.log('Todo by ID', todo);
// }).catch(e => console.log(e));

User.findById('5d1648001718ad1f4c4a1b0b').then((user) => {
    if(!user) {
        return console.log('User not found');  
    }
    console.log(user);
}).catch(e => console.log(e));
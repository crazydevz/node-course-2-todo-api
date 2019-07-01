const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({completed: true}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove('5d19dc78e678a31a908fdd79').then((todo) => {
//     console.log(todo);
// });
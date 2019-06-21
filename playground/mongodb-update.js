const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate(
        {_id: new ObjectID('5d0ce4ade3a2973fcc1e0e82')},
        {$set: {completed: true}},
        {returnOriginal: false}
    ).then((result) => {
        console.log(result);
    });

    // client.close();
});
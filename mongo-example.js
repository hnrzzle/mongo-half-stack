const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// or const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017/test';
let client = null;
MongoClient.connect(url)
    .then(_client => {
        client = _client;
        const db = client.db('test');
        return db.collection('unicorns')
            // .find({ name: 'rainbow' })
            // .toArray();
            // .insert({ name: 'goldy' });
            // .update({
            //     _id: ObjectId('5acfdad5ce54e7f7a17d4215')
            // }, {
            //     $set: {
            //         favoriteToy: 'sparkle maker'
            //     }
            // });
    })
    .then(unicorns => console.log(JSON.stringify(unicorns))
    .catch(err => {
        console.log('FAIL!', err);
    })
    .then(() => {
        client.close();
    });
const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');



module.exports = {
    insert(hero) {
        return mongo.then(db => {
            return db.collection('heroes')
                .insert(hero)
                .then(result => result.ops[0]);
        });
    },
    find() {
        return mongo.then(db => {
            return db.collection('heroes')
                .find()
                .toArray();
        });
    },
    findOne(id) {
        const objId = { '_id' : ObjectId(id) };
        return mongo.then(db => {
            return db.collection('heroes')
                .findOne(objId);
        });
    },
    updateOne(id, query){
        const objId = { '_id' : ObjectId(id) };
        return mongo.then(db => {
            return db.collection('heroes')
                .updateOne(
                    objId,
                    { $set: query }
                );
        });
    },
    remove(id) {
        const objId = { '_id' : ObjectId(id) };
        return mongo.then(db => {
            return db.collection('heroes')
                .remove(objId);
        });
    }
};
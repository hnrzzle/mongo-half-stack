const mongo = require('../mongodb');
const hero = require('../models/hero');



module.exports = {
    insert(hero) {
        return mongo.then(db => {
            return db.collection('heroes')
                .insert(hero)
                .then(result => result.ops[0]);
        });
    }
};
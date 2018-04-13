const notFound = require('./not-found');
const hero = require('../models/hero');


const post = (req, res) => {
    hero.insert(req.body).then(heroes => {
        res.send(heroes);
    });
};

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
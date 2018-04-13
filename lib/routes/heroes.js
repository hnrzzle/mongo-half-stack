const { parse } = require('url');
const notFound = require('./not-found');
const hero = require('../models/hero');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    hero.findOne(id).then(hero => {
        res.send(hero);
    });
};


const put = (req, res) => {
    // const { pathname, query } = parse(req.url, true);
    const id = req.paths[1];
    // const key = pathname.slice(1).split('/');
    // const value = query.value;

    console.log('key and value');
    hero.updateOne(id).then(hero => {
        res.send(hero);
    });
};

const post = (req, res) => {
    hero.insert(req.body).then(heroes => {
        res.send(heroes);
    });
};

const getAll = (req, res) => {
    hero.find().then(heroes => {
        res.send(heroes);
    });
};

const methods = { get, getOne, post, getAll, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
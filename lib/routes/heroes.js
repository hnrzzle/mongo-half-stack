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
    const { query } = parse(req.url, true);
    const id = req.paths[1];

    hero.updateOne(id, query).then(hero => {
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

const del = (req, res) => {
    hero.remove(req.paths[1])
        .then (() => res.send({ removed: true }));
};

const methods = { get, getOne, post, getAll, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
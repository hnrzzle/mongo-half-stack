require('dotenv').config({ path: '.test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Overwatch API', () => {

    before(() => {
        return mongo.then(db => {
            db.collection('pirates').remove();
        });
    });

    let tracer = {
        name: 'Lena Oxton',
        alias: 'Tracer',
        nationality: 'British',
        health: 150
    };

    it('saves a hero', () => {
        return chai.request(app)
            .post('/heroes')
            .send(tracer)
            .then(({ body }) => {
                console.log(body);
                assert.ok(body._id);
            });
    });

});
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
            db.collection('heroes').deleteMany();
        });
    });

    let tracer = {
        name: 'Lena Oxton',
        alias: 'Tracer',
        nationality: 'British',
        health: '150'
    };

    let dva = {
        name: 'Hana Song',
        alias: 'D.Va',
        nationality: 'Korean',
        health: '150'
    };

    it('saves a hero', () => {
        return chai.request(app)
            .post('/heroes')
            .send(tracer)
            .then(({ body }) => {
                assert.ok(body._id);
                tracer = body;
            });
    });
    it('saves another hero', () => {
        return chai.request(app)
            .post('/heroes')
            .send(dva)
            .then(({ body }) => {
                assert.ok(body._id);
                dva = body;
            });
    });

    it('gets heroes', () => {
        return chai.request(app)
            .get('/heroes')
            .then(({ body }) => {
                assert.deepEqual(body, [tracer, dva]);

            });
    });

    it('gets hero by id', () => {
        return chai.request(app)
            .get(`/heroes/${dva._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, dva);
            });
    });

    it('updates hero by id', () => {
        dva.health = '600';
        return chai.request(app)
            .put(`/heroes/${dva._id}?health=600`)
            .then(() => {
                return chai.request(app)
                    .get(`/heroes/${dva._id}`)
                    .then(({ body }) => {
                        assert.deepEqual(body, dva);
                    });
            });

    });

    after(() => mongo.client.close());

});
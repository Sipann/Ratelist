const request = require('supertest');
const express = require('express');
const router = require('../router');
const cors = require('cors');

let server, agent;

beforeEach((done) => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(router);

  server = app.listen(4000, (err) => {
    console.log('running on port 4000');
    if (err) return done(err);
    agent = request.agent(server);
    done();
  });
});

afterEach((done) => {
  return server && server.close(done);
});


describe('/ratings routes', () => {

  it('should get all ratings', async () => {
    const res = await agent.get('/ratings');
    expect(res.statusCode).toEqual(200);
    res.body.forEach(item => {
      expect(item).toHaveProperty('rating');
    });
  });


});
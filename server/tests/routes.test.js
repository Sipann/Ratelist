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
    if (err) return done(err);
    agent = request.agent(server);
    done();
  });

});

afterEach((done) => {
  return server && server.close(done);
});


describe('/ratings routes', () => {

  beforeEach(async () => {

    const fakeRating1 = {
      userName: 'yy6sake8jqanxinb3yoxa44xw',
      trackId: '1HFiThfrSDT9byxv6cw8Tm',
      rating: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const fakeRating2 = {
      userName: 'yy6sake8jqanxinb3yoxa44xw',
      trackId: '1h2xVEoJORqrg71HocgqXd',
      rating: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const fakeRating3 = {
      userName: 'yy6sake8jqanxinb3yoxfalse',
      trackId: '1h2xVEoJORqrg71Hofalse',
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await agent.post('/ratings').send(fakeRating1);
    await agent.post('/ratings').send(fakeRating2);
    await agent.post('/ratings').send(fakeRating3);

  });

  afterEach(async () => {
    await agent.delete('/ratings').send({ userName: 'yy6sake8jqanxinb3yoxa44xw', trackId: '1HFiThfrSDT9byxv6cw8Tm' });
    await agent.delete('/ratings').send({ userName: 'yy6sake8jqanxinb3yoxa44xw', trackId: '1h2xVEoJORqrg71HocgqXd' });
    await agent.delete('/ratings').send({ userName: 'yy6sake8jqanxinb3yoxfalse', trackId: '1h2xVEoJORqrg71Hofalse' });
    await agent.delete('/ratings').send({ userName: 'yy6sake8jqanxinb3yoxfalse', trackId: '6sCYUYJkkqP5wJG4ccLGuA' });
  });


  it('should get all ratings', async () => {
    const res = await agent.get('/ratings');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3);
    res.body.forEach(item => {
      expect(item).toHaveProperty('rating');
    });
  });

  it('should get all ratings for a user', async () => {
    const username = 'yy6sake8jqanxinb3yoxa44xw';
    const res = await agent.get(`/ratings/${username}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should create a rating', async () => {
    const newRating = {
      userName: 'yy6sake8jqanxinb3yoxfalse',
      trackId: '6sCYUYJkkqP5wJG4ccLGuA',
      rating: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const res = await agent
      .post('/ratings')
      .send(newRating);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userName');
    expect(res.body).toHaveProperty('trackId');
    expect(res.body).toHaveProperty('rating');
  });

  it('should update a rating', async () => {
    const updatedRating = {
      userName: 'yy6sake8jqanxinb3yoxa44xw',
      trackId: '1HFiThfrSDT9byxv6cw8Tm',
      rating: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const res = await agent
      .post('/ratings')
      .send(updatedRating);
    expect(res.statusCode).toEqual(201);

  });

  it('should delete a rating', async () => {
    const deleted = {
      userName: 'yy6sake8jqanxinb3yoxfalse',
      trackId: '1h2xVEoJORqrg71Hofalse'
    };
    const res = await agent
      .delete('/ratings')
      .send(deleted);
    expect(res.statusCode).toEqual(200);
  });

});

describe('/users routes', () => {
  beforeEach(async () => {
    const fakeUser1 = {
      userName: 'bean_123',
    };

    const fakeUser2 = {
      userName: 'pumpkin_456',
    };

    const fakeUser3 = {
      userName: 'choupinette_789',
    };

    await agent.post('/users').send(fakeUser1);
    await agent.post('/users').send(fakeUser2);
    await agent.post('/users').send(fakeUser3);
  });

  afterEach(async () => {
    await agent.delete('/users').send({ userName: 'bean_123'});
    await agent.delete('/users').send({ userName: 'pumpkin_456'});
    await agent.delete('/users').send({ userName: 'choupinette_789'});
  });

  it('should retrieve all users', async () => {
    const res = await agent.get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3);
  });

  it('should create new users', async () => {
    const newUser = { userName: 'pepicek_098' };
    const res = await agent
      .post('/users')
      .send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userName');
  });
});
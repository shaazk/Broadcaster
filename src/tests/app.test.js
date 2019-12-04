import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import dummyData from './data.test';

chai.use(chaiHttp);
let id;
let id2;
describe('Broadcaster tests:', () => {
  it('should create new user.', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(dummyData.signup)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        chai.expect(res.body).to.have.own.property('status');
        chai.expect(res.body).to.have.own.property('message');
        chai.expect(res.body).to.have.own.property('data');
        done();
      });
  });

  it('should return error if the password field is not supplied', (done) => {
    const { password, ...data } = dummyData.signup;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if the email field is not supplied', (done) => {
    const { email, ...data } = dummyData.signup;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });

  it('should return error if email already exists', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(dummyData.signup)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });

  it('should sign in', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(dummyData.signin)
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        chai.expect(res.body).to.have.own.property('data');
        dummyData.token = res.body.token;
        done();
      });
  });

  it('should not sign in with an incorrect email or password', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(dummyData.invalidPassword)
      .end((err, res) => {
        chai.expect(res.status).to.eq(401);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });

  it('should create a new incident', (done) => {
    chai
      .request(app)
      .post('/api/v2/incident')
      .set('token', dummyData.token)
      .send(dummyData.incident)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });

  it('should return error if location field is not supplied', (done) => {
    const { location, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if date field is not supplied', (done) => {
    const { createdOn, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if createdBy field is not supplied', (done) => {
    const { createdBy, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if Label field is not supplied', (done) => {
    const { title, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if type field is not supplied', (done) => {
    const { type, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if location field is not supplied', (done) => {
    const { location, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if images field is not supplied', (done) => {
    const { images, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if videos field is not supplied', (done) => {
    const { videos, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should return error if comment field is not supplied', (done) => {
    const { comment, ...data } = dummyData.incident;
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should create a new incident.', (done) => {
    chai
      .request(app)
      .post('/api/v2/incident')
      .set('token', dummyData.token)
      .send(dummyData.incident)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('should create a new incident.', (done) => {
    chai
      .request(app)
      .post('/api/v2/incident')
      .set('token', dummyData.token)
      .send(dummyData.incident)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('new incident', (done) => {
    chai
      .request(app)
      .post('/api/v2/incident')
      .set('token', dummyData.token)
      .send(dummyData.incident)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        chai.expect(res.body).to.have.own.property('message');
        id = res.body.message.id;
        done();
      });
  });
  it('update incident comment', (done) => {
    chai
      .request(app)
      .patch(`/api/v2/incident/${id}/comment`)
      .set('token', dummyData.token)
      .send({ comment: 'djjddfdfhfghdghfdhffd' })
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('it should return an error for an invalid Incident ID', (done) => {
    chai
      .request(app)
      .patch('/api/v2/incident/50/comment')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(404);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('update incident location', (done) => {
    chai
      .request(app)
      .patch(`/api/v2/incident/${id}/location`)
      .set('token', dummyData.token)
      .send({ location: '-1234 5678' })
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('it should return an error for an invalid incident ID', (done) => {
    chai
      .request(app)
      .patch('/api/v2/incident/70/location')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(404);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('get all interventions', (done) => {
    chai
      .request(app)
      .get('/api/v2/interventions')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('it should return an error for an invalid incident ID', (done) => {
    chai
      .request(app)
      .patch('/api/v2/incident')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(404);
        done();
      });
  });
  it('get all redflags', (done) => {
    chai
      .request(app)
      .get('/api/v2/red-flags')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('get a specific redflag ', (done) => {
    chai
      .request(app)
      .get(`/api/v2/red-flags/${id}`)
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('it should return an error for an invalid redflag ID', (done) => {
    chai
      .request(app)
      .get('/api/v2/red-flags/100')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(404);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('new incident', (done) => {
    chai
      .request(app)
      .post('/api/v2/incident')
      .set('token', dummyData.token)
      .send(dummyData.incident2)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        chai.expect(res.body).to.have.own.property('message');
        id2 = res.body.message.id;
        done();
      });
  });
  it('get a specific intervention', (done) => {
    chai
      .request(app)
      .get(`/api/v2/interventions/${id2}`)
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('it should return an error for an invalid intervention ID', (done) => {
    chai
      .request(app)
      .get('/api/v2/interventions/1000')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(404);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
  it('delete should  return an error if a user uses an invalid incident ID', (done) => {
    chai
      .request(app)
      .delete('/api/v2/incident/7')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(404);
        done();
      });
  });
  it('delete incident', (done) => {
    chai
      .request(app)
      .delete(`/api/v2/incident/${id}`)
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
        chai.expect(res.body).to.have.own.property('message');
        done();
      });
  });
});

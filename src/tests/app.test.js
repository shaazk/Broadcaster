import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dummyData from './data.test';
import app from '../app';

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
        chai.expect(res.body.message).to.eq('User created successfully');
        chai.expect(res.body).to.have.own.property('data');
        chai.expect(res.body.data.fullName).to.eq(dummyData.signup.fullName);
        chai.expect(res.body.data.email).to.eq(dummyData.signup.email);
        chai.expect(res.body.data.phoneNumber).to.eq(dummyData.signup.phoneNumber);
        chai.expect(res.body.data.username).to.eq(dummyData.signup.username);
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
        chai.expect(res.body.message).to.eq('User is successfully logged in');
        chai.expect(res.body).to.have.own.property('data');
        chai.expect(res.body.data.fullName).to.eq(dummyData.signup.fullName);
        chai.expect(res.body.data.email).to.eq(dummyData.signup.email);
        chai.expect(res.body.data.phoneNumber).to.eq(dummyData.signup.phoneNumber);
        chai.expect(res.body.data.username).to.eq(dummyData.signup.username);
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
        chai.expect(res.body.message).to.eq('Your email or password is incorrect.');
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
        chai.expect(res.body.message).to.eq('Created redflag record');
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
  it('new incident', (done) => {
    chai
      .request(app)
      .post('/api/v2/incident')
      .set('token', dummyData.token)
      .send(dummyData.incident)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        chai.expect(res.body).to.have.own.property('message');
        id = res.body.data.id;
        chai.expect(res.body.message).to.eq('Created redflag record');
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
        chai.expect(res.body.message).to.eq('Incident not found');

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
        chai.expect(res.body.message).to.eq('Incident not found');
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

  it('it should return an error for an invalid redflag ID', (done) => {
    chai
      .request(app)
      .get('/api/v2/red-flags/100')
      .set('token', dummyData.token)
      .send()
      .end((err, res) => {
        chai.expect(res.status).to.eq(404);
        chai.expect(res.body).to.have.own.property('message');
        chai.expect(res.body.message).to.eq('The intervention does not exist, check your ID');
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
        id2 = res.body.data.id;
        chai.expect(res.body.message).to.eq('Created intervention record');
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
        chai.expect(res.body.message).to.eq('The intervention does not exist, check your ID');
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
        chai.expect(res.body.message).to.eq('invalid ID');
        done();
      });
  });

});

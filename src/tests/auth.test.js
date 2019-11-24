import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('auth:', () => {
  const data = {
    userId: '1234567890123456',
    fullname: 'sharon k',
    email: 'sharonuashyxsd@gmail.com',
    password: 'jhjjhgjhg',
    PhoneNumber: '5657657',
    username: 'tesi',
  };
  const incidentData = {
    createdOn: '12/12/12',
    createdBy: '1234567890123456',
    title: 'corruption',
    type: 'redflag',
    location: 'kicukiro',
    images: ['w.png'],
    videos: ['w.mp4'],
    comment: 'ghfygfygytjygytfyfytftrf',
  };

  let token;

  it('should create new user.', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        token = res.body.token;
        done();
      });
  });

  it('should return error if all required fields are not supplied', (done) => {
    const userData = {
      userId: '1234567890123456',
      fullname: 'sharon k',
      email: 'sharonuashyxsd@gmail.com',
      password: 'jhjjhgjhg',
      PhoneNumber: '5657657',
      username: '',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(userData)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        done();
      });
  });

  it('should return error if email already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        chai.expect(res.status).to.eq(409);
        done();
      });
  });

  it('should sign in', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: data.email,
        password: data.password,
      })
      .end((err, res) => {
        chai.expect(res.status).to.eq(200);
      });
  });

  it('should create a new incident', (done) => {
    chai
      .request(app)
      .post('/api/v1/incident')
      .set('token', token)
      .send(incidentData)
      .end((err, res) => {
        chai.expect(res.status).to.eq(201);
        done();
      });
  });
});

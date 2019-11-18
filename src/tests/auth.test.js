/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('auth:', () => {
  const data = {
    userId: '1234567890123456',
    fullname: 'sharon k',
    email: 'sharonuashy@gmail.com',
    password: 'jhjjhgjhg',
    PhoneNumber: '5657657',
    username: 'tesi',
  };

  it('should create new user.', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(data).end((_err, res) => {
      chai.expect(res.status).to.eq(201);
      done();
    });
  });

  it('should return error if all required fields are not supplied', (done) => {
    const userData = {
      userId: '1234567890123456',
      fullname: 'sharon k',
      email: 'sharonuashy@gmail.com',
      password: 'jhjjhgjhg',
      PhoneNumber: '5657657',
      username: '',
    };
    chai.request(app).post('/api/v1/auth/signup').send(userData).end((err, res) => {
      chai.expect(res.status).to.eq(409);
      done();
    });
  });

  it('should return error if email already exists', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(data).end((err, res) => {
      chai.expect(res.status).to.eq(409);
      done();
    });
  });

  it('should return a token and user details', () => {
    chai.request(app).post('/api/v1/auth/signin').send({
      email: 'sharonuashy@gmail.com',
      password: 'jhjjhgjhg',
    }).then((res) => {
      chai.expect(res.status).to.eq(200);
    })
      .catch((error) => {
        throw error;
      });
  });
});

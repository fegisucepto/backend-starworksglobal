// const { DESCRIBE } = require('sequelize/types/query-types');
const app = require('../app');
// const { request, response } = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let UserValidData = {
  firstName: 'yulia',
  lastName: 'Anggraini',
  dateOfBirth: '1997-09-09',
  streetAddress: 'manna 9 ibul',
  city: 'aaa 678 manna',
  province: 'bengkulu',
  telephone: '0988876554433',
  email: 'yulia@gmail.com',
  username: 'Yulia',
  password: 'Yulia###',
};

afterAll((done) => {
  queryInterface
    .bulkDelete('Users')
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe('Register succes case POST/register', () => {
  it('it respons json with id,firstName,lastName,dateOfBirth,streetAddress,city,province,telephone,email,username,password', (done) => {
    return request(app)
      .post('/register')
      .send(UserValidData)
      .set('Accept', 'application/json')
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('firstName', UserValidData.firstName);
        expect(body).toHaveProperty('lastName', UserValidData.lastName);
        expect(body).toHaveProperty('dateOfBirth', UserValidData.dateOfBirth);
        expect(body).toHaveProperty('streetAddress', UserValidData.streetAddress);
        expect(body).toHaveProperty('city', UserValidData.city);
        expect(body).toHaveProperty('province', UserValidData.province);
        expect(body).toHaveProperty('telephone', UserValidData.telephone);
        expect(body).toHaveProperty('email', UserValidData.email);
        expect(body).toHaveProperty('username', UserValidData.username);
        expect(body).toHaveProperty('password', UserValidData.password);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

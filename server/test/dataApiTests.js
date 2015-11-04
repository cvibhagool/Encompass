//var expect = require('chai').expect;
var app = require('../server.js');
var db = require('../backend/models/index');
var request = require('supertest');
// request = request.defaults({jar: true});

request = request('http://localhost:3000');

describe('Data API', function() {

  this.timeout(15000);

  it('should return industry data', function(done) {
    request
      .get('/data/company?keyword=all&industry=all&fields[]=name&fields[]=stage')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
  });
});

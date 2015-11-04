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

  it('should get the industry graph request for search industry', function(done) {
    request
      .get('/data/company?fields[]=id&fields[]=name&fields[]=employees&fields[]=employees_mom&fields[]=total_funding&fields[]=stage&fields[]=founding_date&industry=search')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
  });

  it('should get the request for parallel coords graph', function(done) {
    request
      .get('/data/company?industry=all&fields[]=employees_mom&fields[]=employees&fields[]=total_funding')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
  });

});

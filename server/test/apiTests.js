var expect = require('chai').expect;
var app = require('../server.js');
var db = require('../backend/models/index');
var request = require('request');
request = request.defaults({jar: true});


var newOfferId;
var companyId;

describe('Encompass API Integration Tests', function () {
  // Allow higher timeout
  this.timeout(100000);

  //Seed the Test Database
  before(function (done) {
    var company = {name: 'Pied Piper'};
    db.Company.findOrCreate({ where : company })
    .then(function(){
      done();
    });
  });

  it('can create a user via POST request at /auth/signup', function (done) {
    this.timeout(100000);
    var requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/auth/signup',
      json: {
        username: 'Richard Hendricks',
        password: '123456'}
    };
    request(requestParams, function(error, res, body) {
        expect(res.body.username).to.equal('Richard Hendricks');
        done();
      });
  });

  it('can authenticate a user via POST request at /auth/local', function (done) {
    this.timeout(100000);
    var requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/auth/local',
      json: {
        username: 'Richard Hendricks',
        password: '123456'}
    };
    request(requestParams, function(error, res, body) {
        expect(error).to.equal(null);
        done();
      });
  });
  
  it('can create a new offer via POST request at /api/offer', function (done) {
    this.timeout(100000);
    var newOffer = {
      company_name: 'Pied Piper',
      position: 'Backend Engineer',
      salary: 130000,
      equity: 0.05,
      vesting_start_date : '12/1/2015',
      vesting_end_date : '12/1/2018',
      vesting_cliff_date : '12/1/2016',
      vesting_cliff_percent : 0.25,
      other_benefits : 20000,
      last_financing_round_valuation : 10000000,
      estimated_exit_valuation : 1000000000
    };

    var requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/api/offer',
      json: newOffer
    };

    request(requestParams, function(error, res, body) {
      expect(body.position).to.equal('Backend Engineer');
      expect(body.salary).to.equal(130000);
      newOfferId = body.id;
      companyId = body.CompanyId;
      done();
    });
  });

  it('can retrieve an existing offer via GET request at /offer/:offerId', function (done) {
    this.timeout(100000);
    var requestParams = {
      method: 'GET',
      uri: 'http://localhost:3000/api/offer/' + newOfferId
    };
    
    request(requestParams, function(error, res, body) {
      var retrievedOffer = JSON.parse(body);
      expect(retrievedOffer.position).to.equal('Backend Engineer');
      expect(retrievedOffer.salary).to.equal(130000);
      done();
    });
  });

  it('can retrieve an existing company by its id number via GET request at /company/:companyId', function (done) {
    this.timeout(100000);
    var requestParams = {
      method: 'GET',
      uri: 'http://localhost:3000/api/company/' + companyId
    };
    
    request(requestParams, function(error, res, body) {
      var retrievedCompany = JSON.parse(body);
      expect(retrievedCompany.name).to.equal('Pied Piper');
      done();
    });
  });

  it('can add a company to a user\'s followed companies via POST request at /company/follow/:companyId', function (done) {
    this.timeout(100000);
    var requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/api/company/follow/' + companyId
    };
    
    request(requestParams, function(error, res, body) {
      var retrievedCompany = JSON.parse(body);
      expect(retrievedCompany.name).to.equal('Pied Piper');
      done();
    });
  });

  it('can remove a company from a user\'s followed companies via DELETE request at /company/follow/:companyId', function (done) {
    this.timeout(100000);
    var requestParams = {
      method: 'DELETE',
      uri: 'http://localhost:3000/api/company/follow/' + companyId
    };
    
    request(requestParams, function(error, res, body) {
      var message = JSON.parse(body);
      expect(message).to.equal('Company unfollowed!');
      done();
    });
  });

  it('can delete a user via DELETE request at /auth/delete', function (done) {
    this.timeout(100000);
    var requestParams = {
      method: 'DELETE',
      uri: 'http://localhost:3000/auth/delete',
      json: {
        username: 'Richard Hendricks',
        password: '123456'}
    };

    request(requestParams, function(error, res, body) {
      expect(res.statusCode).to.equal(204);
      done();
    });
  });
});

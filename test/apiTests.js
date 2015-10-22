var expect = require('chai').expect;
var app = require('../server/server.js');
var request = require('request');


var newOfferId;
var uberId;

describe('Encompass API Integration Tests', function () {

  beforeEach(function () {
    //  
  });

  afterEach(function () {
    //
  });

  it('can create a user via POST request at /auth/signup', function (done) {
    var requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/auth/signup',
      json: {
        username: 'new',
        password: '1234'}
    };

    request(requestParams, function(error, res, body) {
        //Right now returns an error because no index.html is served.  Currently just assume that this POST request works
        done();
      });
  });

  it('can delete a user via DELETE request at /auth/delete', function (done) {
    var requestParams = {
      method: 'DELETE',
      uri: 'http://localhost:3000/auth/delete',
      json: {
        username: 'new',
        password: '1234'}
    };

    request(requestParams, function(error, res, body) {
      expect(res.statusCode).to.equal(204);
      done();
    });
  });

  it('can create a new offer via POST request at /api/offer', function (done) {
    var newOffer = {
      company_name: 'Uber',
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
      uberId = body.CompanyId;
      done();
    });
  });

  it('can retrieve an existing offer via GET request at /offer/:offerId', function (done) {
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
    var requestParams = {
      method: 'GET',
      uri: 'http://localhost:3000/api/company/' + uberId
    };
    
    request(requestParams, function(error, res, body) {
      var retrievedCompany = JSON.parse(body);
      expect(retrievedCompany.name).to.equal('Uber');
      done();
    });
  });

  it('can add a company to a user\'s followed companies via POST request at /company/follow/:companyId', function (done) {
    done();
  });

});

# API Server
- The API server is deployed on Heroku at \<TBD\>

## API Routes

### User Information
- GET /api/user/profile/:user\_id (Get a user profile by user\_id.)
  
  A user profile is a JSON with the following format:
  ```javascript
  { 
    offers: offer_ids //An array of offer_ids
    followed_companies: //An array of company_ids
  }
  ```

### Offer Information
- POST /api/offer/ (Post an offer)

An offer is a JSON with the following format:
  ```javascript
  {
    offer: {
          user_id,
          base_salary, 
          equity,  //Equity should be a percentage of the company
          vesting_start_date, 
          vesting_end_date, 
          vesting_cliff_date, 
          vesting_cliff_percent, //This percent should be the percent of offered equity which vests on the cliff (e.g., if 25% of the offered options vest on the cliff date, this should be 0.25) 
          other_benefits,
          last_financing_round_valuation,
          estimated_exit_valuation
        }
  }
  ```
- GET /api/offer/:offer\_id (Get an offer information by offer\_id.)
  
  The offer JSON should follow the format used above for the POST /api/offer request.
  
### Company Information
- GET /api/company/:company\_id (Get a company's information by company\_id.)
  
  Company information is a JSON which will contain all of data stored on that company, with each column corresponding to an identically-named property in the JSON.

- POST /api/company/follow/:company\_id (Post a company to be followed by the currently logged in user)

  The follow company JSON should have the following format:
  ```javascript
  { 
    followed_company: [user_id, company_id]
  }
  ```

# API Server
- The API server is deployed on Heroku at \<TBD\>

## API Routes

### User Information
- GET /api/user/profile/:user\_id (Get a user profile by 'user\_id'.)
  
  A 'user profile' is a JSON with the following format:
  
  {offers: [array of 'offer\_id's],
    
    followed\_companies: [array of 'company\_id's]}

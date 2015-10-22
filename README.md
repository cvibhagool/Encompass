#Encompass
#Startup Career Compensation Calculator
A tool that helps all tech employees make better, more informed decisions

When setting up local environment, do the following:

###When setting up local environment, do the following:
1. `npm install` in the 'server' folder
2. `npm start` in the 'server' folder

###Setting up the database:

1. Install PostgreSQL, and create a database named 'encompass' 

      (from terminal) `psql template1`
      
      (in PostgreSQL) `CREATE DATABASE encompass;`
      
      (in PostgreSQL) Press `ctrl+D` to exit

2. In server/backend/models/index.js, set variable 'resetDB' to true. This will wipe the database, and rebuild the tables.
3. In server/backend/models/index.js, set variable 'seedDB' to true. This will add the seed data from seedData.json
4. Run server (node server/server.js). Steps 2 and 3 will happen at server start.
5. Be sure to set the two variables back to false, otherwise 2 and 3 will happen everytime server is started.


###whiteboard photos:
https://drive.google.com/drive/folders/0B5Rh0oxLUMclVE9pQkw3aTVYaFU

###Client Layout
AppView.js
ContentFrame.js

navbar (folder)
* Tabs.js
* Tab.js

content (folder)
* SearchCompany.js
* CompanyProfile.js
    * subview: FollowCompany.js
  * UserProfile.js
    * subview: MyOffers.js
    * subview: MyCompanies.js
* AddOffer.js
* Auth.js
* CompareOffer.js
* CompareCompany.js

###New User Experience (NUX)
* Landing Page (Home.js)
* Login/Signup (Auth.js)
  * oAuth and non-oAuth login
* Question: Where are you in your job search? (Question.js)
  * Just Browsing: Search For A Company (SearchCompany.js)
    * Follow This Company (FollowCompany.js)
    * Companies You Follow (CompareCompany.js)
  * Received an Offer: Enter Your Offer (AddOffer.js)
    * Compare Your Offers (CompareOffer.js)
* Company Summary (CompanyProfile.js)

* Your Profile (UserProfile.js)
  * My Offers (MyOffers.js)
  * My Companies (MyCompanies.js)



###Server Endpoints
* GET user/profile
* POST/DELETE companies/offers
* GET /search
* Authentication
  * Local Strategy
    * POST auth/signup
    * POST auth/local
  * OAuth Strategy
    * GET auth/facebook
* Company Data
  * GET data/company?fields[]=field1&fields[]=field2.....&fields[]=fieldN
    * Fields params must be included in every request, including the requests for filtered data.
    * Example: GET data/company?fields[]=name&fields[]=employees will return [{name:"Apple",employees:"9001"},....]
  * Include industry(s) or filter by industry
    * GET data/company?industry=all or data/company?industry=finance
    * Example filtered output: [{name:"Pied Piper",industries:[{name:"Finance"}]},....]
  * Include keyword(s) or filter by keyword
    * GET data/company?keyword=all or data/company?keyword=DIY
    * Example filtered output: [{name:"Pied Piper",keywords:[{name:"DIY"}]},....]
  * Include businessmodel(s) or filter by businessmodel
    * GET data/company?businessmodel=all or data/company?businessmodel=B2B
    * Example filtered output: [{name:"Pied Piper",businessmodels:[{name:"B2B"}]},....]
  * Include investor(s) or filter by investor
    * GET data/company?investor=all or data/company?investor='Sequoia Capital'
    * Example filtered output: [{name:"Pied Piper",investors:[{name:"Sequoia Capital"}]},....]
  * Note that fields can be combined with filters
* Industry Data
  * GET data/industry return all investors
* Keyword Data
  * GET data/keyword return all keywords
* BusinessModel Data
  * GET data/businessmodel return all businessmodels
* Investors
  * GET data/investor return all investors

###Database Tables
* Companies
* Users
* Investors
* Offers
* Follows
* Industries
* Keywords
* BusinessModels

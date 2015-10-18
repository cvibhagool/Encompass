# Encompass
Startup Career Compensation Calculator
A tool that helps all tech employees make better, more informed decisions

When setting up local environment, do the following:
1. npm install in root folder
2. npm install in client folder
3. npm install -g babel
4. run the server (nodemon server/server.js)
5. run the following command from the client dir: babel --watch src/ --out-dir public/

see here for whiteboard photos: https://drive.google.com/drive/folders/0B5Rh0oxLUMclVE9pQkw3aTVYaFU

** Client Layout **
components
  AppView.js
  ContentFrame.js

  navbar (folder)
    Tabs.js
    Tab.js

  content (folder)
    SearchCompany.js
    CompanyProfile.js
      subview: FollowCompany.js
    UserProfile.js
      subview: MyOffers.js
      subview: MyCompanies.js
    AddOffer.js
    Auth.js
    CompareOffer.js
    CompareCompany.js

** New User Experience (NUX) **
> Landing Page (Home.js)
> Login/Signup (Auth.js)
  > oAuth and non-oAuth login
> Question: Where are you in your job search? (Question.js)
  > Just Browsing: Search For A Company (SearchCompany.js)
    > Follow This Company (FollowCompany.js)
    > Companies You Follow (CompareCompany.js)
  > Received an Offer: Enter Your Offer (AddOffer.js)
    > Compare Your Offers (CompareOffer.js)
> Company Summary (CompanyProfile.js)

> Your Profile (UserProfile.js)
  > My Offers (MyOffers.js)
  > My Companies (MyCompanies.js)



** Server Endpoints **
GET user/profile
POST/DELETE companies/offers
GET /search


** Database Tables **
Companies
Users
Investors

Offers
Follows
Industries
Keywords
Business Models

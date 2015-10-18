# Encompass
Startup Career Compensation Calculator


When setting up local environment, do the following:
1. npm install in root folder
2. npm install in client folder
3. npm install -g babel
4. run the server (nodemon server/server.js)
5. run the following command from the client dir: babel --watch src/ --out-dir public/


** Client Layout **

components
  AppView.js
  ContentFrame.js

  Navbar (folder)
    Tabs.js
    Tab.js

  Content (folder)
    SearchCompany.js
    CompanyProfile.js
      FollowCompany.js
    UserProfile.js
      MyOffers.js
      MyCompanies.js
    AddOffer.js
    Auth.js
    CompareOffer.js
    CompareCompany.js

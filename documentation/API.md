##Authentication Routes `/api/auth`
|    URL    | HTTP Verb | POST Body |                   Result                      |
|:---------:|:---------:|:---------:|:---------------------------------------------:|
| `auth/signup` | POST | JSON | Add a new local user, and authenicate the current session with that user, and return a JSON with username  |
| `auth/local` | POST | JSON | Authenticate the current session with a local user account, and return a JSON with username |
| `auth/facebook` | GET | empty | Authenticate the current session with Facebook's OAuth, and return a JSON with username |
| `auth/isAuth` | GET | empty | Check if the current session is authenicated by return at response with a status code |

##Profle Routes `/api/profile`
|    URL    | HTTP Verb | POST Body |                   Result                      |
|:---------:|:---------:|:---------:|:---------------------------------------------:|
| `profile/:userId` | GET | empty | Return JSON of a user with matching id and the user's offers and companies followed |
| `profile/me` | GET | empty | Return JSON of the logged in user and the the user's offers and companies followed |

##Offer Routes `/api/offer`
|    URL    | HTTP Verb | POST Body |                   Result                      |
|:---------:|:---------:|:---------:|:---------------------------------------------:|
| `offer/` | POST | JSON | Add a new offer, and return a JSON of the offer created|
| `offer/:offer_id` | GET | empty | Return JSON the offer with matching id |
| `offer/:offer_id` | DELETE | empty | Delete the offer with matching id |

##Follow Routes `/api/follow`
|    URL    | HTTP Verb | POST Body |                   Result                      |
|:---------:|:---------:|:---------:|:---------------------------------------------:|
| `follow/:company_id` | POST | empty | Add the company with matching id to the follow list of the logged in user |
| `follow/:company_id` | DELETE | empty | Delete the company with matching id from the follow list of the logged in user |

##Company Routes `/api/company`
|    URL    | HTTP Verb | POST Body |                   Result                      |
|:---------:|:---------:|:---------:|:---------------------------------------------:|
| `company/:company_id` | GET | empty | Return JSON of the company with matching id |

##Company Data Routes `/data`
  * GET `data/company?fields[]=field1&fields[]=field2.....&fields[]=fieldN`
    * Fields params must be included in every request, including the requests for filtered data.
    * Example: GET `data/company?fields[]=name&fields[]=employees` will return `[{name:"Apple",employees:"9001"},....]`
  * Include industry(s) or filter by industry
    * GET `data/company?industry=all` or `data/company?industry=finance`
    * Example filtered output: `[{name:"Pied Piper",industries:[{name:"Finance"}]},....]`
  * Include keyword(s) or filter by keyword
    * GET `data/company?keyword=all or data/company?keyword=DIY`
    * Example filtered output: `[{name:"Pied Piper",keywords:[{name:"DIY"}]},....]`
  * Include businessmodel(s) or filter by businessmodel
    * GET `data/company?businessmodel=all` or `data/company?businessmodel=B2B`
    * Example filtered output: `[{name:"Pied Piper",businessmodels:[{name:"B2B"}]},....]`
  * Include investor(s) or filter by investor
    * GET `data/company?investor=all` or `data/company?investor='Sequoia Capital'`
    * Example filtered output: `[{name:"Pied Piper",investors:[{name:"Sequoia Capital"}]},....]`
  * Note that fields can be combined with filters
  * Company Data by Industry
    * GET `data/industry` return all industries
    * GET `data/industry/company?fields[]=field1&fields[]=field2.....&fields[]=fieldN`
  * Company Data by Keyword
    * GET `data/keyword` return all keywords
    * GET `data/keyword/company?fields[]=field1&fields[]=field2.....&fields[]=fieldN`
  * Company Data by Businessmodel
    * GET `data/businessmodel` return all businessmodels
    * GET `data/businessmodel/company?fields[]=field1&fields[]=field2.....&fields[]=fieldN`
  * Company Data by Investor
    * GET `data/investor` return all investors
    * GET `data/investor/company?fields[]=field1&fields[]=field2.....&fields[]=fieldN`
##Database Tables
* `BusinessModels`
* `Companies`
* `CompanyBusinessModels`
* `CompanyIndustries`
* `CompanyInvestors`
* `CompanyKeywords`
* `Industries`
* `Investors`
* `Keywords`
* `Offers`
* `UserFollows`
* `Users`

##Relations
* `Companies N <=> M Users through UserFollows`
* `Companies N <=> M Industries through CompanyIndustries`
* `Companies N <=> M BusinessModels through CompanyBusinessModels`
* `Companies N <=> M Investors through CompanyInvestors`
* `Companies N <=> M Keywords through CompanyKeywords`
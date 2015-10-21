from scrapy.selector import Selector
from selenium import webdriver
import os
import time
import numpy as np
import csv
import locale
locale.setlocale(locale.LC_ALL, '')

items = []
browser = webdriver.Chrome(os.getcwd() + '/chromedriver')
print "Logging In"
browser.get("https://www.mattermark.com/app/")
username = browser.find_element_by_id("email")
password = browser.find_element_by_name("password")
username.send_keys("your_email_here")
password.send_keys("your_password_here")
browser.find_element_by_xpath("//input[@value='Sign In']").click()

urls = ["https://mattermark.com/app/data?state=CA&country=USA&sortBy=cached_growth_score&sortDirection=desc&offset=" + str(offset) for offset in range(0,47132,50)]

#Open the CSV file
csvfile = open('output.csv', 'a')
csvwriter = csv.writer(csvfile, delimiter=',')
#Write the header
#csvwriter.writerow(['name','website','growth_score','mindshare_score','custom_score','weekly_momentum','employees','employees_month_ago','employees_added_in_month','employees_mom', 'employees_6_months_ago','employees_added_in_6_months','employees_6_months_growth','monthly_unique', 'monthly_unique_mom', 'employees_added_since_last_funding','new_person_months_since_last_funding','new_funding_employee_growth','founding_date', 'stage', 'investors', 'total_funding', 'last_funding_date','last_funding_amount','city','state','country','business_models','industries','keywords'])
#Go through each apge
for idx,url in enumerate(urls):
  sleepTime = round(np.random.uniform(10,15))
  print ("Sleep for " + str(sleepTime) + " seconds before reading next url")
  time.sleep(sleepTime)
  print ("Reading " + str(idx) + " url \n" + url)
  browser.get(url)
  print ("Sleep 5 seconds for data to load")
  time.sleep(5)
  source = browser.page_source
  sel = Selector(text = source)
  rows = sel.xpath("//tr[contains(@class, 'odd') or contains(@class, 'even')]")

  for row in rows:
    item = {}

    item['name'] = row.xpath('td[@class="company_name"]//a//text()').extract()[0] if row.xpath('td[@class="company_name"]//a//text()').extract() else None
    item['website'] = row.xpath('td[@class="domain"]//a//text()').extract()[0] if row.xpath('td[@class="domain"]//a//text()').extract()[0] else None
    item['growth_score'] = row.xpath("td[contains(@class, 'growth_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'growth_score')]//text()").extract() else None
    item['mindshare_score'] = row.xpath("td[contains(@class, 'mattermark_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'mattermark_score')]//text()").extract() else None
    item['custom_score'] = row.xpath("td[contains(@class, 'custom_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'custom_score')]//text()").extract() else None
    item['weekly_momentum'] = row.xpath("td[contains(@class, 'momentum_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'momentum_score')]//text()").extract() else None
    item['employees'] = row.xpath("td[contains(@class, 'employees')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees')]//text()").extract() else None
    item['employees_month_ago'] = row.xpath("td[contains(@class, 'employees_month_ago')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_month_ago')]//text()").extract() else None
    item['employees_added_in_month'] = row.xpath("td[contains(@class, 'employees_added_in_month')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_added_in_month')]//text()").extract() else None
    item['employees_mom'] = row.xpath("td[contains(@class, 'employees_mom')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_mom')]//text()").extract() else None
    item['employees_6_months_ago'] = row.xpath("td[contains(@class, 'employees_6_months_ago')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_6_months_ago')]//text()").extract() else None
    item['employees_added_in_6_months'] = row.xpath("td[contains(@class, 'employees_added_in_6_months')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_added_in_6_months')]//text()").extract() else None
    item['employees_6_months_growth'] = row.xpath("td[contains(@class, 'employees_6_months_growth')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_6_months_growth')]//text()").extract() else None
    item['monthly_unique'] = row.xpath("td[contains(@class, 'uniques')]//text()").extract()[0] if row.xpath("td[contains(@class, 'uniques')]//text()").extract() else None
    item['monthly_unique_mom'] = row.xpath("td[contains(@class, 'uniques_mom')]//text()").extract()[0] if row.xpath("td[contains(@class, 'uniques_mom')]//text()").extract() else None
    item['employees_added_since_last_funding'] = row.xpath("td[contains(@class, 'employees_added_since_last_funding')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_added_since_last_funding')]//text()").extract() else None
    item['new_person_months_since_last_funding'] = row.xpath("td[contains(@class, 'new_person_months_since_last_funding')]//text()").extract()[0] if row.xpath("td[contains(@class, 'new_person_months_since_last_funding')]//text()").extract() else None
    item['new_funding_employee_growth'] = row.xpath("td[contains(@class, 'new_funding_employee_growth')]//text()").extract()[0] if row.xpath("td[contains(@class, 'new_funding_employee_growth')]//text()").extract() else None
    item['founding_date'] = row.xpath("td[contains(@class, 'est_founding_date')]//text()").extract()[0] if row.xpath("td[contains(@class, 'est_founding_date')]//text()").extract() else None
    item['stage'] = row.xpath("td[contains(@class, 'stage')]//div//text()").extract()[0] if row.xpath("td[contains(@class, 'stage')]//div//text()").extract() else None
    item['investors'] = row.xpath("td[contains(@class, 'investors')]//text()").extract()[0].split(',') if row.xpath("td[contains(@class, 'investors')]//text()").extract() else None
    item['total_funding'] = row.xpath("td[contains(@class, 'total_funding')]//span//text()").extract()[0] if row.xpath("td[contains(@class, 'total_funding')]//span//text()").extract() else None
    item['last_funding_date'] = row.xpath("td[contains(@class, 'last_funding_date')]//text()").extract()[0] if row.xpath("td[contains(@class, 'last_funding_date')]//text()").extract() else None
    item['last_funding_amount'] = row.xpath("td[contains(@class, 'last_funding_amount')]//text()").extract()[0] if row.xpath("td[contains(@class, 'last_funding_amount')]//text()").extract() else None
    item['city'] = row.xpath("td[contains(@class, 'city')]//text()").extract()[0] if row.xpath("td[contains(@class, 'city')]//text()").extract() else None
    item['state'] = row.xpath("td[contains(@class, 'state')]//text()").extract()[0] if row.xpath("td[contains(@class, 'state')]//text()").extract() else None
    item['country'] = row.xpath("td[contains(@class, 'country')]//text()").extract()[0] if row.xpath("td[contains(@class, 'country')]//text()").extract() else None
    item['business_models'] = row.xpath("td[contains(@class, 'business_models')]//text()").extract()[0].split(',') if row.xpath("td[contains(@class, 'business_models')]//text()").extract() else None
    item['industries'] = row.xpath("td[contains(@class, 'industries')]//text()").extract()[0].split(',') if row.xpath("td[contains(@class, 'industries')]//text()").extract() else None
    item['keywords'] = row.xpath("td[contains(@class, 'keywords')]//text()").extract()[0].split(',') if row.xpath("td[contains(@class, 'keywords')]//text()").extract() else None

    def getStr(value):
      if value:
        return str(value.encode('utf-8'))
      return ""

    def cleanTotalFund(raw_value):
      if type(raw_value) == str and raw_value.strip() != "":
        number_str = raw_value.strip()
        number_str = number_str.replace(',','')
        number_str = number_str.replace('$','')
        number_str = number_str.replace('M','')
        number_str = number_str.replace('B','')
        number = float(number_str)
        if 'M' in raw_value:
          value = number * 1000000
        elif 'B' in raw_value:
          value = number * 1000000000
        else:
          value = number
        value = locale.currency(value)
      else:
          value = raw_value
      return value

    for key in item:
      if isinstance(item[key],list):
        item[key] = (",").join(map(getStr, item[key]))
      else:
        item[key] = getStr(item[key])

    print item
    items.append(item)
    csvwriter.writerow([item['name'],item['website'],item['growth_score'],item['mindshare_score'],item['custom_score'],item['weekly_momentum'],item['employees'],item['employees_month_ago'],item['employees_added_in_month'],item['employees_mom'],item['employees_6_months_ago'],item['employees_added_in_6_months'],item['employees_6_months_growth'],item['monthly_unique'],item['monthly_unique_mom'],item['employees_added_since_last_funding'],item['new_person_months_since_last_funding'],item['new_funding_employee_growth'],item['founding_date'],item['stage'],item['investors'],cleanTotalFund(item['total_funding']),item['last_funding_date'],item['last_funding_amount'],item['city'],item['state'],item['country'],item['business_models'],item['industries'],item['keywords']])

csvfile.close()

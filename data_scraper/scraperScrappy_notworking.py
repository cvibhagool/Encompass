#For the scraper
from scrapy import Item, Field
from scrapy.crawler import CrawlerProcess
from scrapy.spiders.init import InitSpider
from scrapy.http import Request
from scrapy.http import FormRequest
from scrapy.selector import Selector

from selenium import webdriver
import os
import time

import numpy as np

items = []

class CompanyItem(Item):
    name = Field()
    website = Field()
    growth_score = Field()
    mindshare_score = Field()
    custom_score = Field()
    weekly_momentum = Field()
    employees = Field()
    employees_mom = Field()
    monthly_unique = Field()
    monthly_unique_mom = Field()
    founding_date = Field()
    stage = Field()
    last_funding = Field()
    location = Field()
    investors = Field()
    total_funding = Field()
    last_funding_date = Field()
    last_funding_amount = Field()
    city = Field()
    state = Field()
    country = Field()
    business_models = Field()
    industries = Field()
    keywords = Field()

class CompanySpider(InitSpider):
    name = "mattermark"

    def __init__(self):
      self.browser = webdriver.Chrome(os.getcwd() + '/chromedriver')
      self.download_delay = 2
      self.allowed_domains = ['mattermark.com']
      self.start_urls = ['https://mattermark.com']
      self.urls = ["https://mattermark.com/app/data?state=CA&country=USA&operator[0]=stage%09!%3D%09Exited&operator[1]=interested%09!%3D%090&state=CA&sortBy=cached_growth_score&sortDirection=desc&offset=" + str(offset) + "&score_mobile_downloads=1&score_twitter_mentions=1" for offset in range(0,42251,50)]

    def init_request(self):
      # Start by logging in
      print "Logging In"
      self.browser.get("https://www.mattermark.com/app/")
      username = self.browser.find_element_by_id("email")
      password =  self.browser.find_element_by_name("password")
      username.send_keys("cvibhagool@gmail.com")
      password.send_keys("welcome")
      self.browser.find_element_by_xpath("//input[@value='Sign In']").click()
      return self.initialized()

    def parse(self, response):
        global items
        #Select all the rows
        for url in self.urls:
          sleepTime = round(np.random.uniform(10,15))
          print ("Sleep for " + str(sleepTime) + " seconds")
          time.sleep(sleepTime)
          print ("parsing " + url)
          self.browser.get(url)
          time.sleep(5)
          source = self.browser.page_source
          sel = Selector(text = source)
          rows = sel.xpath("//tr[contains(@class, 'odd') or contains(@class, 'even')]")

          for row in rows:
            item = CompanyItem()

            item['name'] = row.xpath('td[@class="company_name"]//a//text()').extract()[0] if row.xpath('td[@class="company_name"]//a//text()').extract() else None
            item['website'] = row.xpath('td[@class="domain"]//a//text()').extract()[0] if row.xpath('td[@class="domain"]//a//text()').extract()[0] else None
            item['growth_score'] = row.xpath("td[contains(@class, 'growth_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'growth_score')]//text()").extract() else None
            item['mindshare_score'] = row.xpath("td[contains(@class, 'mattermark_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'mattermark_score')]//text()").extract() else None
            item['custom_score'] = row.xpath("td[contains(@class, 'custom_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'custom_score')]//text()").extract() else None
            item['weekly_momentum'] = row.xpath("td[contains(@class, 'momentum_score')]//text()").extract()[0] if row.xpath("td[contains(@class, 'momentum_score')]//text()").extract() else None
            item['employees'] = row.xpath("td[contains(@class, 'employees')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees')]//text()").extract() else None
            item['employees_mom'] = row.xpath("td[contains(@class, 'employees_mom')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_mom')]//text()").extract() else None
            item['employees_mom'] = row.xpath("td[contains(@class, 'employees_mom')]//text()").extract()[0] if row.xpath("td[contains(@class, 'employees_mom')]//text()").extract() else None
            item['monthly_unique'] = row.xpath("td[contains(@class, 'uniques')]//text()").extract()[0] if row.xpath("td[contains(@class, 'uniques')]//text()").extract() else None
            item['monthly_unique_mom'] = row.xpath("td[contains(@class, 'uniques_mom')]//text()").extract()[0] if row.xpath("td[contains(@class, 'uniques_mom')]//text()").extract() else None
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
              return None

            for key in item:
              if isinstance(item[key],list):
                item[key] = (",").join(map(getStr, item[key]))
              else:
                item[key] = getStr(item[key])

            print item
            items.append(item)

process = CrawlerProcess({

})
process.crawl(CompanySpider)
process.start() # the script will block here until the crawling is finished

import csv
with open('output.csv', 'w') as csvoutput:
  a = csv.writer(csvoutput, delimiter=',')
  a.writerow(items[0].keys())
  for item in items:
    a.writerow(item.values())










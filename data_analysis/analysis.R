setwd("/Users/aaron/Dropbox/dev_projects/hackreactor/thesis")
data <- read.csv("output-complete.csv", header=T)
data$employees_mom <- as.numeric(gsub("%", "", data$employees_mom))
data$last_funding_amount <- gsub(",", "", data$last_funding_amount)
data$last_funding_amount <- as.numeric(gsub("\\$", "", data$last_funding_amount))
data$total_funding <- gsub(",", "", data$last_funding_amount)
data$total_funding <- as.numeric(gsub("\\$", "", data$total_funding))
data$employees <- as.numeric(data$employees)

library(ggplot2)
library(plyr)
library(scales)

# summary of employee mom data by funding stage
data.sumEmp <- ddply(data, c("stage"), summarise,
                  N = length(employees_mom),
                  mean = mean(employees_mom, na.rm=TRUE),
                  sd = sd(employees_mom, na.rm=TRUE)
)

# plot of employee mom by stage
ggplot(data.sumEmp, aes(x=stage, y=mean, fill=stage)) + 
  geom_bar(position=position_dodge(), stat="identity") +
  geom_errorbar(aes(ymin=mean-sd, ymax=mean+sd),
                width=.2,
                position=position_dodge(.9)
  )

# histo of total funding binned by 1,000,000
fund_histo <- ggplot(data, aes(x=total_funding)) + geom_histogram(binwidth=1000000, fill="white", color="black") +
  geom_vline(data=data, aes(xintercept=mean(total_funding, na.rm=TRUE)),
             linetype="dashed", color="red", size=1)
fund_histo + scale_x_continuous(limits=c(0, 10000000), labels=comma)

# mean last funding amount by funding stage
data.sumLastFunding <- ddply(data, c("stage"), summarize, 
                             N = length(last_funding_amount),
                             mean = mean(last_funding_amount, na.rm=TRUE),
                             sd = sd(last_funding_amount, na.rm=TRUE)
                            )

#plot of last funding amount mean by stage
plot <- ggplot(data.sumLastFunding, aes(x=stage, y=mean, fill=stage)) + 
  geom_bar(position=position_dodge(), stat="identity") 


plot + scale_y_continuous(name="last round funding", labels=comma)

# scatter plot with total funding against employee mom
empFundingPlot <- ggplot(na.omit(data), aes(x=total_funding, y=employees_mom),
                         size=2, position=position_jitter(x=2,y=2)) +
                         #geom_jitter(color=alpha("black", 0.15)) +
                         stat_sum(aes(group=employees_mom, color=employees_mom)) 
                         
empFundingPlot + scale_y_continuous(limits=c(-50,50)) + scale_x_continuous(limits=c(0,200000000))

# plot employees month-over-month against total employees
momVsTotalEmpPlot <- ggplot(na.omit(data), aes(x=employees, y=employees_mom),
                            size=2, position=position_jitter(x=1,y=1)) +
                            geom_point() +
                            geom_smooth(method=lm)

momVsTotalEmpPlot + scale_y_continuous(limits=c(-50,50))

# total funding per employee
data.fundPerEmp <- ddply(na.omit(data), c("name"), summarise, 
                    ratio = total_funding / employees
                    )

data.fundPerEmpStage <- ddply(na.omit(data), c("stage"), summarise, 
                         mean_ratio = mean(total_funding / employees),
                         sd = sd(total_funding / employees)
                        )

plotFundEmp <- ggplot(na.omit(data), aes(x=total_funding, y=(total_funding/employees)),
                      size=2, position=position_jitter(x=1,y=1)) +
                      geom_point() +
                      geom_jitter(color=alpha("black", 0.15)) +
                      geom_smooth(method=lm)


# limit to more than 2m in total funding and less than 500m
# plotFundEmp + scale_x_continuous(limits=c(2000000, 500000000), labels=comma) + scale_y_continuous(limits=c(0, 1000000))
plotFundEmp + scale_x_log10(labels=comma) + scale_y_continuous(limits=c(0, 1000000))

# mean total_funding/employee by stage
plotFundEmpStage <- ggplot(data.fundPerEmpStage, aes(x=stage, y=mean_ratio, fill=stage)) +
  geom_bar(position=position_dodge(), stat="identity") +
  geom_errorbar(aes(ymin=mean_ratio-sd, ymax=mean_ratio+sd),
                width=.2,
                position=position_dodge(.9))

plotFundEmpStage + scale_y_continuous(labels=comma)


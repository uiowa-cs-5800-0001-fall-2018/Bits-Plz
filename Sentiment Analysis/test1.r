#this is a practice for training and testing data in order to do sentiment analysis
#we are splitting up the data in the dataset and trying to do predicitive analysis here
#we will perform regression techniques such as logistic regression for predictive analysis,
#this code is written in R
#this code is written in R
income <-
  read.table("http://www.stat.uiowa.edu/~kcowles/Datasets/income.dat",
             header = TRUE)
str(income)

income$SEX <- factor(income$SEX)
income$RACE <- factor(income$RACE)

str(income)

income$logINCOME <- log(income$INCOME+1)
str(income)

boxplot(income$logINCOME~income$SEX,data=income)

# how to randomly split a dataset

split <- function( df, seed, fractrain )
{
  #df -- data frame to split
  #seed -- random number seed for splitting
  #fractrain -- proportion of rows desired in training dataset
  # returns logical vector "newtrain" with TRUE for training dataset 
  #and FALSE for test
  numrows <- nrow( df )
  numtrain <- round( fractrain * numrows, 0)
  set.seed(seed)
  index <- sample( numrows, numtrain, replace = FALSE)
  newtrain <- rep(TRUE, numrows)
  newtrain[ -index] <- FALSE
  newtrain
}  

# let's split dataset into training and testing

#mysplit <- split(income, 27, 1/16)
#ratio = sample(1:nrow(income), size=0.0625*nrow(income))
#train.df = income[ratio,]
#test.df = income[-ratio,]
income$spl <- split(income, 27, 1/16)
head(income)
incomeTrn <- income[ income$spl, ]
incomeTst <- income[ !income$spl, ]


#now uisng two different classification methods and training dataset to develop models to predict SEX using AGE , EDUCATION and  logIncome

#PERFORMING LOGISTIC REGRESSION

Logisticregression <- glm( SEX ~ AGE + EDUCATION + logINCOME, data = incomeTrn, family = binomial(link="logit"))
summary(Logisticregression)

predictLogicin <- predict( Logisticregression, incometrn, type = "response" )
table1 <- table(predictLogicregression >0.5, incometrn[,"SEX"])
table1
sum(diag(table))/sum(table1)  

standardize <- function(v) {(v- mean(v)) /sd(v)}
Xtrn <- apply( incomeTrn[ ,c("AGE", "EDUCATION", "logINCOME")] , 2, standardize)
Xtst <- apply( incomeTrn[ ,c("AGE", "EDUCATION", "logINCOME")] , 2, standardize)

summary(Xtrn)
summary(Xtst)

predictionofknn <- knn( Xtrn, Xtst, incomeTrn$SEX, k=5)
tableknn <- table(predictionofknn, incomeTst$SEX)
tableknn
sum(diag(tableknn))/sum(tableknn)

for(j in 1:10) {
  print(j)
  predictionofknn <- knn( Xtrn, Xtst, incomeTrn$SEX, k=k)
  tablenew <- table(predictionofknn, incomeTst$SEX)
  print(tablenew)
  sum <- sum(diag(tablenew))/sum(tablenew)
  print(sum)
}



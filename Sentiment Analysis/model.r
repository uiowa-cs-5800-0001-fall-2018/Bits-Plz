#update: spell-checker is on line-96/138

rm(list = ls())
setwd("F:/FUNDAMENTALS/")
library(twitteR)
library(httr)
 
library(twitteR)
library(ROAuth)
library(RCurl)
library(bitops)
library(httr)

library(stringr)
library(plyr)
library(dplyr)
library(tm)

library(hunspell) #spell-check
#https://cran.r-project.org/web/packages/hunspell/vignettes/intro.html

apiKey="8FPRUsHZB2D36oXU20PrnUTIY"
apiScret="ykKARogNFuab5iOtBHZgSVGuS8XIFXVwP4tHnaogFyXo8ExjRH"
accessToken="845285263232372737-5iptJnYyd83chzYBl35gCi6ggxeNK1W"
accessSecret="dsF4UJArsjVbGEB7tF9b5339UQYndSkGS8ntkidmpLVmm"
options(httr_oauth_cache = T)
setup_twitter_oauth(apiKey, apiScret, accessToken,accessSecret)



#Trump <- searchTwitter("Trump", n = 1000)

######get tweets based on state 
library(readxl)
Geo = read_xlsx("statewise_data.xlsx") #Read in  state geo location data

Geo$Radius = (Geo$Area)^(1/2)  #calculate the State Radius

geo_infor = paste(Geo$Latitude,Geo$Longitude,paste(Geo$Radius,"mi", sep = ""), sep = ",") 

num_tweet_per_state = 200   #we can change this number as we need


st = searchTwitter("#trump", n =num_tweet_per_state, geocode = geo_infor[1])
tdf = do.call("rbind",lapply(st, as.data.frame))
tdf$state = rep(Geo$State[1],num_tweet_per_state)

tweets.df = tdf

for(i in 2:51){
  print(i)
  st = searchTwitter("#trump", n =num_tweet_per_state, geocode = geo_infor[i])
  tdf = do.call("rbind",lapply(st, as.data.frame))
  n = nrow(tdf)
  tdf$state = rep(Geo$State[i],n)
  tweets.df = rbind(tweets.df,tdf)
}

write.csv(tweets.df, "tweet_data2.csv")

tweets.df1 =  read.csv("tweet_data.csv")

tweets.df1 = tweets.df1[,-1]

names(tweets.df) == names(tweets.df1)

tweet_all = rbind(tweets.df, tweets.df1)

sentimentfun = function(iniTweet,tweettext, pos, neg, .progress='non')
{
  # Parameters
  # tweettext: vector of text to score
  # pos: vector of words of postive sentiment
  # neg: vector of words of negative sentiment
  # .progress: passed to laply() 4 control of progress bar
  
  # create simple array of scores with laply
  tt=lapply(iniTweet, function(x) iconv(x, 'utf-8', 'latin1', 'byte')) #get rid of random code
  
  countindex <- 0 #index for tweet
  
  scores = laply(tweettext,
                 function(singletweet, pos, neg)
                 {
                   # remove punctuation - using global substitute
                   singletweet = gsub("[[:punct:]]", "", singletweet)
                   # remove control characters
                   singletweet = gsub("[[:cntrl:]]", "", singletweet)
                   # remove digits
                   singletweet = gsub("\\d+", "", singletweet)
                   # define error handling function when trying tolower
                   tryTolower = function(x)
                   {
                     # create missing value
                     y = NA
                     # tryCatch error
                     try_error = tryCatch(tolower(x), error=function(e) e)
                     # if not an error
                     if (!inherits(try_error, "error"))
                       y = tolower(x)
                     # result
                     return(y)
                   }
                   # use tryTolower with sapply 
                   singletweet = sapply(singletweet, tryTolower)
                   # split sentence into words with str_split (stringr package)
                   word.list = str_split(singletweet, "\\s+")
                   words = unlist(word.list)
                   # compare words to the dictionaries of positive & negative terms
                   pos.matches = match(words, pos)
                   neg.matches = match(words, neg)
                   # get the position of the matched term or NA
                   # we just want a TRUE/FALSE
                   pos.matches = !is.na(pos.matches)
                   neg.matches = !is.na(neg.matches)
                   # final score
                   score = sum(pos.matches) - sum(neg.matches)
                   positiveScore = sum(pos.matches)
                   negativeScore = sum(neg.matches)
                   #result <- list(score,positiveScore,negativeScore) 
                   #View(result)
                   return(score)
                   #return(result)
                 }, pos, neg, .progress=.progress )
  
  posScores = laply(tweettext,
                    function(singletweet, pos, neg)
                    {
                      # remove punctuation - using global substitute
                      singletweet = gsub("[[:punct:]]", "", singletweet)
                      # remove control characters
                      singletweet = gsub("[[:cntrl:]]", "", singletweet)
                      # remove digits
                      singletweet = gsub("\\d+", "", singletweet)
                      # define error handling function when trying tolower
                      tryTolower = function(x)
                      {
                        # create missing value
                        y = NA
                        # tryCatch error
                        try_error = tryCatch(tolower(x), error=function(e) e)
                        # if not an error
                        if (!inherits(try_error, "error"))
                          y = tolower(x)
                        # result
                        return(y)
                      }
                      # use tryTolower with sapply 
                      singletweet = sapply(singletweet, tryTolower)
                      # split sentence into words with str_split (stringr package)
                      word.list = str_split(singletweet, "\\s+")
                      words = unlist(word.list)
                      # compare words to the dictionaries of positive & negative terms
                      pos.matches = match(words, pos)
                      neg.matches = match(words, neg)
                      # get the position of the matched term or NA
                      # we just want a TRUE/FALSE
                      pos.matches = !is.na(pos.matches)
                      neg.matches = !is.na(neg.matches)
                      # final score
                      positiveScore = sum(pos.matches)
                      return(positiveScore)
                    }, pos, neg, .progress=.progress )  
  
  negScores = laply(tweettext,
                    function(singletweet, pos, neg)
                    {
                      # remove punctuation - using global substitute
                      singletweet = gsub("[[:punct:]]", "", singletweet)
                      # remove control characters
                      singletweet = gsub("[[:cntrl:]]", "", singletweet)
                      # remove digits
                      singletweet = gsub("\\d+", "", singletweet)
                      # define error handling function when trying tolower
                      tryTolower = function(x)
                      {
                        # create missing value
                        y = NA
                        # tryCatch error
                        try_error = tryCatch(tolower(x), error=function(e) e)
                        # if not an error
                        if (!inherits(try_error, "error"))
                          y = tolower(x)
                        # result
                        return(y)
                      }
                      # use tryTolower with sapply 
                      singletweet = sapply(singletweet, tryTolower)
                      # split sentence into words with str_split (stringr package)
                      word.list = str_split(singletweet, "\\s+")
                      words = unlist(word.list)
                      # compare words to the dictionaries of positive & negative terms
                      pos.matches = match(words, pos)
                      neg.matches = match(words, neg)
                      # get the position of the matched term or NA
                      # we just want a TRUE/FALSE
                      pos.matches = !is.na(pos.matches)
                      neg.matches = !is.na(neg.matches)
                      # final score
                      negativeScore = sum(neg.matches)
                      return(negativeScore)
                    }, pos, neg, .progress=.progress )    
  
  sarcastic = laply(tweettext,
                    function(singletweet, pos, neg)
                    {
                      countindex <<- countindex + 1
                      # remove punctuation - using global substitute
                      singletweet = gsub("[[:punct:]]", "", singletweet)
                      # remove control characters
                      singletweet = gsub("[[:cntrl:]]", "", singletweet)
                      # remove digits
                      singletweet = gsub("\\d+", "", singletweet)
                      
                      # define error handling function when trying tolower
                      tryTolower = function(x)
                      {
                        # create missing value
                        y = NA
                        # tryCatch error
                        try_error = tryCatch(tolower(x), error=function(e) e)
                        # if not an error
                        if (!inherits(try_error, "error"))
                          y = tolower(x)
                        # result
                        return(y)
                      }
                      # use tryTolower with sapply 
                      singletweet = sapply(singletweet, tryTolower)
                      # split sentence into words with str_split (stringr package)
                      word.list = str_split(singletweet, "\\s+")
                      words = unlist(word.list)
                      # compare words to the dictionaries of positive & negative terms
                      pos.matches = match(words, pos)
                      neg.matches = match(words, neg)
                      # get the position of the matched term or NA
                      # we just want a TRUE/FALSE
                      pos.matches = !is.na(pos.matches)
                      neg.matches = !is.na(neg.matches)
                      
                      score = sum(pos.matches) - sum(neg.matches)
                      
                      if (score > 0){
                        if (grepl("<84>|<83>|<ad>|<92>|<b0>|<b1>|<a8>|<93>",tt[countindex])){
                          return(1) # we think it is sarcastic tweet
                        } else {
                          return(0)
                        }
                      }else {
                        return(0)
                      }
                    }, pos, neg, .progress=.progress )    
  
  # data frame with scores for each sentence
  
  sentiment.df = data.frame(text=tweettext, score=scores, positiveScore=posScores,negativeScore=negScores, ifSarcastic=sarcastic)
  
  return(sentiment.df)
}


#function for spell-checker

spellchecker = function(datalist){
  
  for (i in 1:length(datalist)){  
    
    bad = hunspell(datalist[i])
    badwords = unlist(bad)
    words = hunspell_suggest(badwords)
    
    for (j in 1:length(words)){
      suggest = words[j]
      suggest = unlist(suggest)
      
      if (!is.null(suggest)) {
        #print(badwords[j])
        #print(suggest[1])
        datalist[i] = gsub(badwords[j], suggest[1], datalist[i])
        #print(datalist[i])
        
      }
    }
  }
  return (datalist)
}

### Using searchTwitter for our project 

# extracting the text
#datatext = sapply(tweets.df, function(x) x$getText())

## first cleaning stage
tweettext=lapply(tweet_all$text, function(x) iconv(x, "latin1","ASCII", sub=""))
tweettext=lapply(tweettext, function(x) gsub('RT','',x))
tweettext=lapply(tweettext, function(x) gsub('MT','',x))
tweettext=lapply(tweettext, function(x) gsub('#[a-zA-Z0-9]*','',x))
tweettext=lapply(tweettext, function(x) gsub('@[a-zA-Z0-9_=.,]+:*','',x))
tweettext=lapply(tweettext, function(x) gsub('[\',.:;?_+=!@#$%^&*()-/\\\"]','',x))
tweettext=lapply(tweettext, function(x) gsub("htt.*",' ',x))
tweettext=lapply(tweettext, function(x) gsub('[[:digit:]]*', '',x))
tweettext=lapply(tweettext, function(x) gsub('\n', '',x))

data=unlist(tweettext)

#spell-checker
data = spellchecker(data)
tweet_all$text_cleaned = data


#bad1 <- hunspell("spell checkers are not neccessairy for language ninja's")
#print(bad1)
#a<-hunspell_suggest(bad1[[1]])

# getting the opinion lexicons from working directory 
# Note: Please attach updated lexicon
pos1 = readLines("positive-words.txt")
neg1 = readLines("negative-words.txt")
pos_chat = readLines("positive_chat.txt")
neg_chat = readLines("negative_chat.txt")

neg2 = c(neg1, "bearish", "fraud"); tail(neg2)

pos2 = c(pos1,pos_chat)
pos3 = removeWords(pos2,c("trump", "Trump"))
neg3 = c(neg2, neg_chat)

## apply function score.sentiment
scores = sentimentfun(tweet_all$text, data, pos3, neg3, .progress='text')


for(i in (1:nrow(scores))){
  if(scores$ifSarcastic[i]==1){
    scores$score[i]=(-1)*scores$score[i]
  }
}



tweet_all$scores = scores$score
tweet_all$positiveScores = scores$positiveScore
tweet_all$negativeScores = scores$negativeScore
tweet_all$ifSarcastic = scores$ifSarcastic


## remove duplicates
tweet_all2 = duplicated(tweet_all[,1])

tweet_all$duplicate = tweet_all2

tweet_p = tweet_all

tweet_p$text=NULL
tweet_p$text_cleaned = NULL
## create file to wd
write.csv(tweet_p, "tweets_for_plot_notext.csv")


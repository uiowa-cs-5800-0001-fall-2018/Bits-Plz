library(ggplot2)
library(fiftystater)
data("fifty_states") # this line is optional due to lazy data loading


df_summ = summarise(group_by(tweet_all, state), avg_score = mean(scores))

df_summ$state = tolower(df_summ$state)
df_summ$state = as.factor(df_summ$state)
which(df_summ$state %in% crimes$state==FALSE)
df_summ = df_summ[-9,]

#crimes <- data.frame(state = tolower(rownames(USArrests)), USArrests)

# map_id creates the aesthetic mapping to the state name column in your data
p <- ggplot(df_summ, aes(map_id = state)) + 
  # map points to the fifty_states shape data
  geom_map(aes(fill = avg_score), map = fifty_states) + 
  expand_limits(x = fifty_states$long, y = fifty_states$lat) +
  coord_map() +
  scale_x_continuous(breaks = NULL) + 
  scale_y_continuous(breaks = NULL) +
  labs(x = "", y = "") +
  theme(legend.position = "bottom", 
        panel.background = element_blank())


p = p + scale_fill_continuous(low = "white", high = "blue", name = "negative scores by state") 
p
# add border boxes to AK/HI
p + fifty_states_inset_boxes() 



num_scores_state = summarise(group_by(tweet_all, state, scores), number_scores = n())
num_scores_state$state = as.factor(num_scores_state$state)

df <- data.frame(matrix(ncol = 4, nrow = 0))
x <- c("state", "positive_percent", "negative_percent", "neutral_percent")
colnames(df) <- x

for(i in levels(num_scores_state$state)){
  temp = subset(num_scores_state, num_scores_state$state == i)
  perct = data.frame(state = i, positive_percent = 0, negative_percent = 0, neutral_percent = 0)
  a = which(temp$scores<0)
  b = which(temp$scores==0)
  c = which(temp$scores>0)
  perct$positive_percent = sum(temp$number_scores[c])/400
  perct$negative_percent = sum(temp$number_scores[a])/400
  perct$neutral_percent = temp$number_scores[b]/400
  df = rbind(df, perct)
}

write.csv(df, "percentage.csv")

num_scores = summarize(group_by(tweet_all, scores), number_scores = n())

support = sum(num_scores$number_scores[1:7])/20400
neutral = num_scores$number_scores[8]/20400
against=sum(num_scores$number_scores[9:13])/20400
US_percent = data.frame(percent_good_mood = support, percent_neutral_mood = neutral, percent_bad_mood = against)

#cbPalette <- c("#999999", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7")

write.csv(US_percent, "US_percent.csv")

p1<-ggplot(US_percent, aes(x=colnames(US_percent), y=, fill=scores)) +
  geom_bar(stat="identity")+scale_fill_gradientn(colours=rainbow(4))#+theme_minimal()

p1



tweets_test = tweet_all[,c(1,19,20,21,22)]
write.csv(tweets_test, "tweets_test.csv")


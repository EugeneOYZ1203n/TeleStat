import React from 'react'
import BarChartWithFilters from '../GraphComponents/BarChartWithFilters'
import { Box, Typography} from '@mui/material'
import { colors } from '../../config'
import { combineDictionaryNoDuplicates } from '../../DataHandling/helper/combineDictionary'
import HistogramChartWithFilters from '../GraphComponents/HistogramChartWithFilters'
import { getDateRangeArray } from '../helper/DateFormatting'
import { getDateString } from '../../DataHandling/helper/getDateString'
import { daysOfWeek_active_labels, hours_active_labels, months_active_labels } from '../helper/DataLabels'
import KeywordsWithFilters from '../GraphComponents/KeywordsWithFilters'
import MessageDisplayWithFilter from '../GraphComponents/MessageDisplayWithFilters'

const ChatList = ({data}) => {
  const message_count_data = {
    types: {
      "Msgs sent to" : colors.primary,
      "Msgs recv. from" : colors.secondary,
      "Msgs total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Msgs sent to" : el.messages_to, 
        "Msgs recv. from" : el.messages_from, 
        "Msgs total" : el.messages_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const message_daily_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: getDateRangeArray(el.firstDateMessaged, el.lastDateMessaged)
                  .map((date) => getDateString(date)),
        values: getDateRangeArray(el.firstDateMessaged, el.lastDateMessaged)
                  .map((date) => el.messages_daily[getDateString(date)] || 0)
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const word_count_data = {
    types: {
      "Words sent to" : colors.primary,
      "Words recv. from" : colors.secondary,
      "Words total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Words sent to" : el.wordCount_to, 
        "Words recv. from" : el.wordCount_from, 
        "Words total" : el.wordCount_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const word_count_histogram_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: Object.keys(el.wordCount_histogram),
        values: Object.values(el.wordCount_histogram)
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const avg_word_message_data = {
    types: {
      "Avg Words per Msg To" : colors.primary,
      "Avg Words per Msg From" : colors.secondary,
      "Avg Words per Msg Total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Avg Words per Msg To" : el.avgWordCountPerMessage_to, 
        "Avg Words per Msg From" : el.avgWordCountPerMessage_from, 
        "Avg Words per Msg Total" : el.avgWordCountPerMessage_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const message_days_data = {
    types: {
      "Number of Days Msged" : colors.primary,
      "Days since last Msg" : colors.secondary,
      "Avg Daily Msgs" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Number of Days Msged" : el.daysBetweenFirstAndLastMessage, 
        "Days since last Msg" : el.daysSinceLastMessaged, 
        "Avg Daily Msgs" : el.avgDailyMessages
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const hours_active_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: hours_active_labels,
        values: hours_active_labels.map((label)=>el.hours_active[label] || 0)
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const daysOfWeek_active_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: daysOfWeek_active_labels,
        values: daysOfWeek_active_labels.map((label)=>el.daysOfWeek_active[label] || 0)
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const month_active_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: months_active_labels,
        values: months_active_labels.map((label)=>el.month_active[label] || 0)
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const emojis_messages_data = {
    types: {
      "Emoji Msgs to" : colors.primary,
      "Emoji Msgs from" : colors.secondary,
      "Emoji Msgs total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Emoji Msgs to" : el.emoji_messages_to, 
        "Emoji Msgs from" : el.emoji_messages_from, 
        "Emoji Msgs total" : el.emoji_messages_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const emojis_percent_data = {
    types: {
      "Emoji % to" : colors.primary,
      "Emoji % from" : colors.secondary,
      "Emoji % total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Emoji % to" : el.emoji_percent_to, 
        "Emoji % from" : el.emoji_percent_from, 
        "Emoji % total" : el.emoji_percent_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const punctuated_messages_data = {
    types: {
      "Punctuated Msgs to" : colors.primary,
      "Punctuated Msgs from" : colors.secondary,
      "Punctuated Msgs total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Punctuated Msgs to" : el.punctuated_messages_to, 
        "Punctuated Msgs from" : el.punctuated_messages_from, 
        "Punctuated Msgs total" : el.punctuated_messages_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const punctuated_percent_data = {
    types: {
      "Punctuated % to" : colors.primary,
      "Punctuated % from" : colors.secondary,
      "Punctuated % total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Punctuated % to" : el.punctuated_percent_to, 
        "Punctuated % from" : el.punctuated_percent_from, 
        "Punctuated % total" : el.punctuated_percent_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const avgSentiment_data = {
    types: {
      "Avg. Sentiment to" : colors.primary,
      "Avg. Sentiment from" : colors.secondary,
      "Avg. Sentiment total" : colors.bg1
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Avg. Sentiment to" : el.avg_message_sentiments_to, 
        "Avg. Sentiment from" : el.avg_message_sentiments_from, 
        "Avg. Sentiment total" : el.avg_message_sentiments_total
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const avgResponseTime_data = {
    types: {
      "Avg. Response Time from" : colors.primary,
      "Avg. Response Time to" : colors.secondary
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Avg. Response Time from" : el.avgResponseTime_from, 
        "Avg. Response Time to" : el.avgResponseTime_to, 
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const medianResponseTime_data = {
    types: {
      "Med. Response Time from" : colors.primary,
      "Med. Response Time to" : colors.secondary
    },
    categories: data.chats.map((el)=>{
      return { [el.name] : {
        "Med. Response Time from" : el.medianResponseTime_from, 
        "Med. Response Time to" : el.medianResponseTime_to, 
      }}
    }).reduce(combineDictionaryNoDuplicates)
  }

  const response_time_histogram_labels = [
    ...Array.from({ length: 11 }, (_, i) => i).map((el) => `${el*5}s`),
    ...Array.from({ length: 5 }, (_, i) => i).map((el) => `${1+el}m`),
    ...Array.from({ length: 4 }, (_, i) => i).map((el) => `${(2+el)*5}m`),
    "30m+", "1hr+", "6hr+"
  ]

  const response_time_from_histogram_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: response_time_histogram_labels,
        values: response_time_histogram_labels.map((label) => {
          return el.responseTime_from_histogram[label] || 0
        })
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const response_time_to_histogram_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: response_time_histogram_labels,
        values: response_time_histogram_labels.map((label) => {
          return el.responseTime_to_histogram[label] || 0
        })
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const keywords_data = data.chats.map((el)=>{
    return {
      [el.name] : el.keywords
    }
  }).reduce(combineDictionaryNoDuplicates)

  const commonAbbreviations_data = data.chats.map((el)=>{
    return {
      [el.name] : {
        labels: el.common10Abbreviations.map((a)=>a[0]),
        values: el.common10Abbreviations.map((a)=>a[1])
      }
    }
  }).reduce(combineDictionaryNoDuplicates)

  const phoneNumbers_data = data.chats.map((el)=>{
    return {
      [el.name] : el.phoneNumbers
    }
  }).reduce(combineDictionaryNoDuplicates)

  const emails_data = data.chats.map((el)=>{
    return {
      [el.name] : el.emails
    }
  }).reduce(combineDictionaryNoDuplicates)

  const handles_data = data.chats.map((el)=>{
    return {
      [el.name] : el.handles
    }
  }).reduce(combineDictionaryNoDuplicates)

  const links_data = data.chats.map((el)=>{
    return {
      [el.name] : el.links
    }
  }).reduce(combineDictionaryNoDuplicates)

  const first20Message_data = data.chats.map((el)=>{
    return {
      [el.name] : el.first20Messages
    }
  }).reduce(combineDictionaryNoDuplicates)

  const roundedMilestoneMessages_data = data.chats.map((el)=>{
    return {
      [el.name] : el.roundedMilestoneMessages
    }
  }).reduce(combineDictionaryNoDuplicates)

  const funMilestoneMessages_data = data.chats.map((el)=>{
    return {
      [el.name] : el.funMilestoneMessages
    }
  }).reduce(combineDictionaryNoDuplicates)

  const longestMessage_data = data.chats.map((el)=>{
    return {
      [el.name] : el.longestMessage
    }
  }).reduce(combineDictionaryNoDuplicates)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, rowGap: 4, p: 4, bgcolor: colors.black }}>
      <Typography
        variant="h3"
        component="div"
        color={colors.primary}
      >
        More stats
      </Typography>

      <BarChartWithFilters 
        title={"Message counts"}
        initialData={message_count_data}
      />
      <HistogramChartWithFilters
        title={"Daily Messages"}
        initialData={message_daily_data}
      />
      <BarChartWithFilters 
        title={"Word counts"}
        initialData={word_count_data}
      />
      <HistogramChartWithFilters
        title={"Word count Dist."}
        initialData={word_count_histogram_data}
      />
      <BarChartWithFilters 
        title={"Avg Word per Msg"}
        initialData={avg_word_message_data}
      />
      <BarChartWithFilters 
        title={"Msg and Days"}
        initialData={message_days_data}
      />
      <HistogramChartWithFilters
        title={"Active Hours"}
        initialData={hours_active_data}
      />
      <HistogramChartWithFilters
        title={"Active Days of Week"}
        initialData={daysOfWeek_active_data}
      />
      <HistogramChartWithFilters
        title={"Active Months"}
        initialData={month_active_data}
      />
      <BarChartWithFilters 
        title={"Emojis Messages"}
        initialData={emojis_messages_data}
      />
      <BarChartWithFilters 
        title={"Emojis Percent"}
        initialData={emojis_percent_data}
      />
      <BarChartWithFilters 
        title={"Punctuated Messages"}
        initialData={punctuated_messages_data}
      />
      <BarChartWithFilters 
        title={"Punctuated Percent"}
        initialData={punctuated_percent_data}
      />
      <BarChartWithFilters 
        title={"Avg Sentiment"}
        initialData={avgSentiment_data}
      />
      <BarChartWithFilters 
        title={"Avg Response Time"}
        initialData={avgResponseTime_data}
      />
      <BarChartWithFilters 
        title={"Med Response Time"}
        initialData={medianResponseTime_data}
      />
      <HistogramChartWithFilters
        title={"Response Time Dist. From"}
        initialData={response_time_from_histogram_data}
      />
      <HistogramChartWithFilters
        title={"Response Time Dist. To"}
        initialData={response_time_to_histogram_data}
      />
      <KeywordsWithFilters
        title={"Keywords"}
        initialData={keywords_data}
      />
      <HistogramChartWithFilters
        title={"Common Abbreviations"}
        initialData={commonAbbreviations_data}
      />
      <KeywordsWithFilters
        title={"Phone Numbers Shared"}
        initialData={phoneNumbers_data}
      />
      <KeywordsWithFilters
        title={"Emails Shared"}
        initialData={emails_data}
      />
      <KeywordsWithFilters
        title={"Handles Shared"}
        initialData={handles_data}
      />
      <KeywordsWithFilters
        title={"Links Shared"}
        initialData={links_data}
      />
      <MessageDisplayWithFilter
        title={"First 20 Messages"}
        initialData={first20Message_data}
      />
      <MessageDisplayWithFilter
        title={"Milestone Messages"}
        initialData={roundedMilestoneMessages_data}
      />
      <MessageDisplayWithFilter
        title={"Fun Message numbers"}
        initialData={funMilestoneMessages_data}
      />
      <MessageDisplayWithFilter
        title={"Longest Message"}
        initialData={longestMessage_data}
      />
    </Box>
  )
}

export default ChatList
- Add DatePeriod
- Support relative strings for DateIntervals

```
// first day of next month
m = 1
first_last_day_of = 1

// last day of last month
m = -1
first_last_day_of = 2

// first sat of next month
weekday = 6
weekday_behavior = 1
special_type = 2
have_weekday_relative = 1
have_special_relative = 1

// last monday of next month
m = 1
d = -7
weekday = 1
special_type = 3
have_weekday_relative = 1
have_special_relative = 1

// 7 weekdays
special_type = 1
special_amount = 7
have_special_relative = 1

// 2 days ago
d = -2
weekday = -7

// Monday
weekday = 1
weekday_behavior = 1
have_weekday_relative = 1

// Monday next week
d = 7
weekday = 1
weekday_behavior = 2
have_weekday_relative = 1
```
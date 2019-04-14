# FrostDateTime

**FrostDateTime** is a free, open-source date manipulation library for *JavaScript*.

It features full support for PHP DateTime formats, as well as timezones.


## Table of contents
- [Date Creation](#date-creation)
- [Date Output](#date-output)
- [Date Attributes](#date-attributes)
- [ISO Attributes](#iso-attributes)
- [Time Attributes](#time-attributes)
- [Timezones](#timezones)
- [Timestamps](#timestamps)
- [Utility Methods](#utility-methods)
- [Date Intervals](#date-intervals)



## Date Creation

- `date` can be either a *Date* object, *DateTime* object, a timestamp, date string, or an array of values matching the native *Date.UTC* method, and will default to the current timestamp.
- `timezone` is a string representing the timezome name of the date, and will default to the system timezone.

```javascript
const date = new DateTime(date, timezone);
```

#### Immutable DateTime

By default, *DateTime* objects are mutable, but if you wish to create an immutable reference you can use the following syntax.

Immutable *DateTime* objects return a new *DateTimeImmutable* whenever they are modified.

```javascript
const date = new DateTimeImmutable(date, timezone);
```

#### From Format

If you wish to parse a date string and you know the exact format, you can use the `fromFormat` static method.

This method is fully compatible with the PHP [DateTime::createFromFormat()](http://php.net/manual/en/datetime.createfromformat.php) method.

- `formatString` is a string containing the format you wish to use for parsing.
- `dateString` is a string representing the date you are parsing.
- `timezone` is a string representing the timezome name of the date, and will default to the system timezone.

```javascript
const date = DateTime.fromFormat(dateString, formatString, timezone);
```


## Date Output

#### Date Format

Once you have created a *DateTime* object, you can get a string representation using a specific format with the `format` method.

This method is fully compatible with the PHP [date()](http://php.net/manual/en/function.date.php) function.

- `formatString` is a string containing the format you wish to output using.

```javascript
const dateString = date.format(formatString);
```

#### To String

Format the current date using "D M d Y H:i:s O (e)".

```javascript
const string = date.toString();
```

#### To Date String

Format the current date using "D M d Y".

```javascript
const dateString = date.toDateString();
```

#### To ISO String

Format the current date using "Y-m-d\TH:i:s.vP".

```javascript
const isoString = date.toISOString();
```

#### To Time String

Format the current date using "H:i:s O (e)".

```javascript
const timeString = date.toTimeString();
```

#### To UTC String

Format the current date in UTC timezone using "D M d Y H:i:s O (e)".

```javascript
const utcString = date.toUTCString();
```

#### To Locale String

Format the current date using Date's native "toLocaleString" method.

```javascript
const localeString = date.toLocaleString();
```

#### To Locale Date 

Format the current date using Date's native "toLocaleDateString" method.

```javascript
const localeDateString = date.toLocaleDateString();
```

#### To Locale Time String

Format the current date using Date's native "toLocaleTimeString" method.

```javascript
const localeTimeString = date.toLocaleTimeString();
```


## Date Attributes

#### Year

To get the year according to the current timezone, use the `getYear()` method.

```javascript
const year = date.getYear();
```

You can also set the year according to the current timezone with the `setYear()` method.

- `year` is a number representing the year.
- `month` is a number representing the month, and will default to the current value.
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

```javascript
date.setYear(year, month, date);
```

#### Month

To get the month according to the current timezone, use the `getMonth()` method.

The `month` returned will be between 0 (January) and 11 (December).

```javascript
const month = date.getMonth();
```

You can also set the month according to the current timezone with the `setMonth()` method.

- `month` is a number representing the month.
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

```javascript
date.setMonth(month, date);
```

#### Date

To get the day of the month according to the current timezone, use the `getDate()` method.

```javascript
const date = date.getDate();
```

You can also set the date according to the current timezone with the `setDate()` method.

- `date` is a number representing the date you wish to set the DateTime to.

```javascript
date.setDate(date);
```

#### Day Of Week

To get the day of the week according to the current timezone, use the `getDay()` method.

The `day` returned will be between 0 (Sunday) and 6 (Saturday).

```javascript
const day = date.getDay();
```

You can also set the day of the week according to the current timezone with the `setDay()` method.

```javascript
date.setDay(day);
```

#### Day Of Year

To get the day of the year according to the current timezone, use the `getDayOfYear()` method.

The `dayOfYear` returned will be between 0 and 365.

```javascript
const dayOfYear = date.getDayOfYear();
```

You can also set the day of the year according to the current timezone with the `setDayOfYear()` method.

```javascript
date.setDayOfYear(dayOfYear);
```

#### Quarter

To get the quarter of the year according to the current timezone, use the `getQuarter()` method.

The `quarter` returned will be between 1 and 4.

```javascript
const quarter = date.getQuarter();
```

You can also set the quarter of the year according to the current timezone with the `setQuarter()` method.

```javascript
date.setQuarter(quarter);
```


## ISO Attributes

#### ISO Year

To get the ISO-8601 year according to the current timezone, use the `getISOYear` method.

This method is identical to `getYear()` except in cases where the ISO week belongs to the previous or next year, then that value will be used instead.

```javascript
const isoYear = date.getISOYear();
```

You can also set the ISO-8601 year according to the current timezone with the `setISOYear()` method.

The `isoWeek` and `isoDay` parameters are optional, and will default to the current values.

```javascript
date.setISOYear(isoYear, isoWeek, isoDay);
```

#### ISO Week

To get the ISO-8601 week number of year according to the current timezone, use the `getISOWeek` method.

The `isoWeek` returned will be between 1 and 53 (week staring on Monday).

```javascript
const isoWeek = date.getISOWeek();
```

You can also set the ISO-8601 week number of year according to the current timezone with the `setISOWeek()` method.

The `isoDay` parameters is optional, and will default to the current value.

```javascript
date.setISOWeek(isoWeek, isoDay);
```


#### ISO Day

To get the ISO-8601 day of the week according to the current timezone, use the `getISODay()` method.

The `isoDay` returned will be between 1 (Monday) and 7 (Sunday).

```javascript
const isoDay = date.getISODay();
```

You can also set the ISO-8601 day of the week according to the current timezone with the `setISODay()` method.

```javascript
date.setISODay(isoDay);
```


## Time Attributes

#### Hours

To get the hour according to the current timezone, use the `getHours()` method.

The `hours` returned will be between 0 and 23.

```javascript
const hours = date.getHours();
```

You can also set the hour according to the current timezone with the `setHours()` method.

The `minutes`, `seconds` and `millis` parameters are optional, and will default to the current values.

```javascript
date.setHours(hours, minutes, seconds, millis);
```

#### Minutes

To get the minute according to the current timezone, use the `getMinutes()` method.

The `minutes` returned will be between 0 and 59.

```javascript
const minutes = date.getMinutes();
```

You can also set the minute according to the current timezone with the `setMinutes()` method.

The `seconds` and `millis` parameters are optional, and will default to the current values.

```javascript
date.setMinutes(minutes, seconds, millis);
```

#### Seconds

To get the second according to the current timezone, use the `getSeconds()` method.

The `seconds` returned will be between 0 and 59.

```javascript
const seconds = date.getSeconds();
```

You can also set the second according to the current timezone with the `setSeconds()` method.

The `millis` parameters is optional, and will default to the current value.

```javascript
date.setSeconds(seconds, millis);
```

#### Milliseconds

To get the millisecond according to the current timezone, use the `getMilliseconds()` method.

The `millis` returned will be between 0 and 999.

```javascript
const millis = date.getMilliseconds();
```

You can also set the millisecond according to the current timezone with the `setMilliseconds()` method.

```javascript
date.setMilliseconds(millis);
```


## Timezone Attributes

#### Timezone

To get the current timezone  use the `getTimezone()` method.

```javascript
const timezone = date.getTimezone();
```

You can also set the current timezone with the `setTimezone()` method.

```javascript
date.setTimezone(timezone);
```

#### Timezone Offset

To get the current timezone offset  use the `getTimezoneOffset()` method.

```javascript
const offset = date.getTimezoneOffset();
```


## Timestamps

To get the number of milliseconds since the UNIX epoch, use the `getTime()` method.

```javascript
const time = date.getTime();
```

You can also set the number of milliseconds since the UNIX epoch with the `setTime()` method.

```javascript
date.setTime(time);
```

To get the number of seconds since the UNIX epoch, use the `getTimestamp()` method.

```javascript
const timestamp = date.getTimestamp();
```

You can also set the number of seconds since the UNIX epoch with the `setTimestamp()` method.

```javascript
date.setTimestamp(timestamp);
```


## Manipulation

#### Add

To add a duration of time to the current date, use the `add()` method.

- `duration` can be either a *DateInterval* object or a relative date string.

```javascript
date.add(duration);
```

#### Subtract

To subtract a duration of time to the current date, use the `add()` method.

- `duration` can be either a *DateInterval* object or a relative date string.

```javascript
date.sub(duration);
```


## Utility Methods

#### Date Suffix

The `dateSuffix()` method returns the ordinal suffix ('st', 'nd', 'rd', 'th') for the current date.

```javascript
date.dateSuffix();
```

#### Days In Month

The `daysInMonth()` method returns the number of days in the current month.

```javascript
date.daysInMonth();
```

#### Days In Year

The `daysInYear()` method returns the number of days in the current year.

```javascript
date.daysInYear();
```

#### Difference

The `difference()` method returns a new *DateInterval* representing the difference between two dates.

- `otherDate` can be either a *Date* object, *DateTime* object, a timestamp, date string, or an array of values matching the native *Date.UTC* method, and will default to the current timestamp.
- `absolute` is a boolean indicating whether the interval will be forced to be positive, and will default to *false*.

```javascript
const diff = date.diff(otherDate, absolute);
```

#### Is DST?

The `isDST()` method returns a boolean indicating whether the current date is in daylight savings time.

```javascript
date.isDST();
```

#### Is Leap Year?

The `isLeapYear()` method returns a boolean indicating whether the current year is a leap year.

```javascript
date.isLeapYear();
```

#### ISO Weeks In Year

The `isoWeeksInYear()` method returns the number of weeks in the current ISO year.

```javascript
date.isoWeeksInYear();
```


## Date Intervals

- `interval` is an [ISO-8601 duration string](https://en.wikipedia.org/wiki/ISO_8601#Durations).

```javascript
const duration = new DateInterval(interval);
```

#### From String

- `time` is a date string with relative parts, compatible with the PHP [DateInterval::createFromDateString](https://www.php.net/manual/en/dateinterval.createfromdatestring.php) method.

```javascript
const duration = DateInterval.fromString(time);
```

#### DateInterval Format

- `formatString` is the string to use for formatting, and is compatible with the PHP [DateInterval::format](https://www.php.net/manual/en/dateinterval.format.php) method.

```javascript
duration.format(formatString);
```
# FrostDateTime

**FrostDateTime** is a free, open-source date manipulation library for *JavaScript*.

It features full support for PHP DateTime formats, as well as timezones.


## Table of contents
- [Date Creation](#date-creation)
- [Date Formatting](#date-formatting)
- [Date Attributes](#date-attributes)
- [ISO Attributes](#iso-attributes)
- [Time Attributes](#time-attributes)
- [Timezones](#timezones)
- [Timestamps](#timestamps)
- [Utility Methods](#utility-methods)
- [Static Methods](#static-methods)
- [Date Intervals](#date-intervals)



## Date Creation

- `date` can be either a *Date* object, *DateTime* object, a timestamp, date string, or an array of values matching the native *Date.UTC* method, and will default to the current timestamp.
- `timezone` is a string representing the timezone name of the date, and will default to the system timezone.

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

This method is fully compatible with the PHP [DateTime::createFromFormat](http://php.net/manual/en/datetime.createfromformat.php) method.

- `formatString` is a string containing the format you wish to use for parsing.
- `dateString` is a string representing the date you are parsing.
- `timezone` is a string representing the timezome name of the date, and will default to the system timezone.

```javascript
const date = DateTime.fromFormat(formatString, dateString, timezone);
```


## Date Formatting

#### Format

Once you have created a *DateTime* object, you can get a string representation using a specific format with the `format` method.

- `formatString` is a string containing the format you wish to output using.

This method is fully compatible with the PHP [date](http://php.net/manual/en/function.date.php) function.

```javascript
const dateString = date.format(formatString);
```

#### To String

Format the current date using "*D M d Y H:i:s O (e)*".

```javascript
const string = date.toString();
```

#### To Date String

Format the current date using "*D M d Y*".

```javascript
const dateString = date.toDateString();
```

#### To ISO String

Format the current date using "*Y-m-d\TH:i:s.vP*".

```javascript
const isoString = date.toISOString();
```

#### To Time String

Format the current date using "*H:i:s O (e)*".

```javascript
const timeString = date.toTimeString();
```

#### To UTC String

Format the current date in UTC timezone using "*D M d Y H:i:s O (e)*".

```javascript
const utcString = date.toUTCString();
```

#### To Locale String

Format the current date using *Date*'s native *toLocaleString* method.

- `locale` is a string with a BCP 47 language tag, or an array of such strings, and will default to the system locale.
- `options` is an object containing options for formatting.

For a full list of supported options, see the [DateTime.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) documentation.

If a timezone is not specified in options, the timezone of the *DateTime* will be used.

```javascript
const localeString = date.toLocaleString(locale, options);
```

#### To Locale Date String

Format the current date using *Date*'s native *toLocaleDateString* method.

- `locale` is a string with a BCP 47 language tag, or an array of such strings, and will default to the system locale.
- `options` is an object containing options for formatting.

For a full list of supported options, see the [DateTime.prototype.toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) documentation.

If a timezone is not specified in options, the timezone of the *DateTime* will be used.

```javascript
const localeDateString = date.toLocaleDateString(locale, options);
```

#### To Locale Time String

Format the current date using *Date*'s native *toLocaleTimeString* method.

- `locale` is a string with a BCP 47 language tag, or an array of such strings, and will default to the system locale.
- `options` is an object containing options for formatting.

For a full list of supported options, see the [DateTime.prototype.toLocaleTimeString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString) documentation.

If a timezone is not specified in options, the timezone of the *DateTime* will be used.

```javascript
const localeTimeString = date.toLocaleTimeString(locale, options);
```


## Date Attributes

#### Year

Get the year in current timezone.

```javascript
const year = date.getYear();
```

Set the year in current timezone.

- `year` is a number representing the year.
- `month` is a number representing the month (between *0* and *11*), and will default to the current value.
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

To disable date clamping, set the property `DateTime.clampDates` to *false*.

```javascript
date.setYear(year, month, date);
```

#### Month

Get the month in current timezone.

The `month` returned will be between *0* (January) and *11* (December).

```javascript
const month = date.getMonth();
```

Set the month in current timezone.

- `month` is a number representing the month (between *0* and *11*).
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

To disable date clamping, set the property `DateTime.clampDates` to *false*.

```javascript
date.setMonth(month, date);
```

#### Date

Get the date in current timezone.

```javascript
const date = date.getDate();
```

Set the date in current timezone.

- `date` is a number representing the date.

```javascript
date.setDate(date);
```

#### Day Of Week

Get the day of the week in current timezone.

The `day` returned will be between *0* (Sunday) and *6* (Saturday).

```javascript
const day = date.getDay();
```

Set the day of the week in current timezone.

- `day` is a number representing the day of the week (between *0* and *6*).

```javascript
date.setDay(day);
```

#### Day Of Year

Get the day of the year in current timezone.

The `dayOfYear` returned will be between *0* and *365*.

```javascript
const dayOfYear = date.getDayOfYear();
```

Set the day of the year in current timezone.

- `dayOfYear` is a number representing the day of the year (between *0* and *365*).

```javascript
date.setDayOfYear(dayOfYear);
```

#### Quarter

Get the quarter of the year in current timezone.

The `quarter` returned will be between *1* and *4*.

```javascript
const quarter = date.getQuarter();
```

Set the quarter of the year in current timezone.

- `quarter` is a number representing the quarter between *1* and *4*.

```javascript
date.setQuarter(quarter);
```


## ISO Attributes

#### ISO Year

Get the ISO year in current timezone.

This method is identical to `getYear()` except in cases where the ISO week belongs to the previous or next year, then that value will be used instead.

```javascript
const isoYear = date.getISOYear();
```

Set the ISO year in current timezone.

- `isoYear` is a number representing the ISO year.
- `isoWeek` is a number representing the ISO week, and will default to the current value.
- `isoDay` is a number representing the ISO day (between *1* and *7*), and will default to the current value.

```javascript
date.setISOYear(isoYear, isoWeek, isoDay);
```

#### ISO Week

Get the ISO week in current timezone.

The `isoWeek` returned will be between *1*  and *53* (week staring on Monday).

```javascript
const isoWeek = date.getISOWeek();
```

Set the ISO week in current timezone.

- `isoWeek` is a number representing the ISO week.
- `isoDay` is a number representing the ISO day (between *1* and *7*), and will default to the current value.

```javascript
date.setISOWeek(isoWeek, isoDay);
```

#### ISO Day

Get the ISO day of the week in current timezone.

The `isoDay` returned will be between *1* (Monday) and *7* (Sunday).

```javascript
const isoDay = date.getISODay();
```

- `isoDay` is a number representing the ISO day (between *1* and *7*).

```javascript
date.setISODay(isoDay);
```


## Time Attributes

#### Hours

Get the hours of the day in current timezone.

The `hours` returned will be between *0* and *23*.

```javascript
const hours = date.getHours();
```

Set the hours of the day in current timezone.

- `hours` is a number representing the hours of the day (between *0* and *23*).
- `minutes` is a number representing the minutes of the hour (between *0* and *59*), and will default to the current value.
- `seconds` is a number representing the seconds of the minute (between *0* and *59*), and will default to the current value.
- `millis` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
date.setHours(hours, minutes, seconds, millis);
```

#### Minutes

Get the minutes of the hour in current timezone.

The `minutes` returned will be between *0* and *59*.

```javascript
const minutes = date.getMinutes();
```

Set the minutes of the hour in current timezone.

- `minutes` is a number representing the minutes of the hour (between *0* and *59*).
- `seconds` is a number representing the seconds of the minute (between *0* and *59*), and will default to the current value.
- `millis` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
date.setMinutes(minutes, seconds, millis);
```

#### Seconds

Get the seconds of the minute in current timezone.

The `seconds` returned will be between *0* and *59*.

```javascript
const seconds = date.getSeconds();
```

Set the seconds of the minute in current timezone.

- `seconds` is a number representing the seconds of the minute (between *0* and *59*).
- `millis` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
date.setSeconds(seconds, millis);
```

#### Milliseconds

Get the milliseconds of the second in current timezone.

The `millis` returned will be between *0* and *999*.

```javascript
const millis = date.getMilliseconds();
```

Set the milliseconds of the second in current timezone.

- `millis` is a number representing the milliseconds of the second (between *0* and *999*).

```javascript
date.setMilliseconds(millis);
```

#### Beat (Internet Swatch Time)

Get the internet swatch time beat in current timezone.

The `beat` returned will be between *0* and *999*.

```javascript
const beat = date.getBeat();
```

Set the internet swatch time beat in current timezone.

- `beat` is a number representing the beat of the day (between *0* and *999*).

```javascript
date.setBeat(beat);
```


## Timezone Attributes

#### Timezone

Get the name of the current timezone.

```javascript
const timezone = date.getTimezone();
```

Set the name of the current timezone.

```javascript
date.setTimezone(timezone);
```

#### Timezone Abbreviation

Get the abbreviated name of the current timezone.

```javascript
const abbreviation = date.getTimezoneAbbr();
```

#### Timezone Offset

Get the UTC offset (in minutes) of the current timezone.

```javascript
const offset = date.getTimezoneOffset();
```


## Timestamps

#### In Milliseconds

Get the number of milliseconds since the UNIX epoch.

```javascript
const time = date.getTime();
```

Set the number of milliseconds since the UNIX epoch.

```javascript
date.setTime(time);
```

#### In Seconds

Get the number of seconds since the UNIX epoch.

```javascript
const timestamp = date.getTimestamp();
```

Set the number of seconds since the UNIX epoch.

```javascript
date.setTimestamp(timestamp);
```


## Manipulation

#### Add

Add a duration to the DateTime.

- `duration` can be either a *DateInterval* object or a relative date string.

```javascript
date.add(duration);
```

#### Subtract

Subtract an duration from the DateTime.

- `duration` can be either a *DateInterval* object or a relative date string.

```javascript
date.sub(duration);
```

#### Start Of Year

Set the date to the first millisecond of the year in current timezone.

```javascript
date.startOfYear();
```

#### End Of Year

Set the date to the last millisecond of the year in current timezone.

```javascript
date.endOfYear();
```

#### Start Of Month

Set the date to the first millisecond of the month in current timezone.

```javascript
date.startOfMonth();
```

#### End Of Month

Set the date to the last millisecond of the month in current timezone.

```javascript
date.endOfMonth();
```

#### Start Of Week

Set the date to the first millisecond of the week in current timezone.

```javascript
date.startOfWeek();
```

#### End Of Week

Set the date to the last millisecond of the week in current timezone.

```javascript
date.endOfWeek();
```

#### Start Of Day

Set the date to the first millisecond of the day in current timezone.

```javascript
date.startOfDay();
```

#### End Of Day

Set the date to the last millisecond of the day in current timezone.

```javascript
date.endOfDay();
```

#### Start Of Hour

Set the date to the first millisecond of the hour in current timezone.

```javascript
date.startOfHour();
```

#### End Of Hour

Set the date to the last millisecond of the hour in current timezone.

```javascript
date.endOfHour();
```

#### Start Of Minute

Set the date to the first millisecond of the minute in current timezone.

```javascript
date.startOfMinute();
```

#### End Of Minute

Set the date to the last millisecond of the minute in current timezone.

```javascript
date.endOfMinute();
```

#### Start Of Second

Set the date to the first millisecond of the second in current timezone.

```javascript
date.startOfSecond();
```

#### End Of Second

Set the date to the last millisecond of the second in current timezone.

```javascript
date.endOfSecond();
```


## Utility Methods

#### Clone

Create a new *DateTime* using the current date and timezone.

```javascript
const clone = date.clone();
```

#### Date Suffix

Get the ordinal suffix for the date of the month.

```javascript
const dateSuffix = date.dateSuffix();
```

#### Days In Month

Get the number of days in the current month.

```javascript
const daysInMonth = date.daysInMonth();
```

#### Days In Year

Get the number of days in the current year.

```javascript
const daysInYear = date.daysInYear();
```

#### Difference

Get the difference between two Dates.

- `otherDate` can be either a *Date* object, *DateTime* object, a timestamp, date string, or an array of values matching the native *Date.UTC* method, and will default to the current timestamp.
- `absolute` is a boolean indicating whether the interval will be forced to be positive, and will default to *false*.

This method returns a new *DateInterval* object.

```javascript
const diff = date.diff(otherDate, absolute);
```

#### Is DST?

Return *true* if the *DateTime* is in daylight savings.

```javascript
const isDST = date.isDST();
```

#### Is Leap Year?

Return *true* if the year is a leap year.

```javascript
const isLeapYear = date.isLeapYear();
```

#### Weeks In ISO Year

Get the number of weeks in the current ISO year.

```javascript
const weeksInISOYear = date.weeksInISOYear();
```


## Static Methods

#### Day Of Year

Get the day of the year for a year, month and date.

- `year` is a number representing the year.
- `month` is a number representing the month (between *0* and *11*).
- `date` is a number representing the date.

```javascript
const dayOfYear = DateTime.dayOfYear(year, month, date);
```

#### Days In Month

Get the number of days in a month, from a year and month.

- `year` is a number representing the year.
- `month` is a number representing the month (between *0* and *11*).

```javascript
const daysInMonth = DateTime.daysInMonth(year, month);
```

#### Days In Year

Get the number of days in a year.

- `year` is a number representing the year.

```javascript
const daysInYear = DateTime.daysInYear();
```

#### Is Leap Year?

Return *true* if the year is a leap year.

- `year` is a number representing the year.

```javascript
const isLeapYear = DateTime.isLeapYear();
```

#### Weeks In ISO Year

Get the number of ISO weeks in a year.

- `year` is a number representing the year.

```javascript
const weeksInISOYear = DateTime.weeksInISOYear(year);
```


## Date Intervals

- `interval` is an [ISO-8601 duration string](https://en.wikipedia.org/wiki/ISO_8601#Durations).

```javascript
const duration = new DateInterval(interval);
```

#### From String

Create a new DateInterval from the relative parts of the string.

- `time` is a date string with relative parts, compatible with the PHP [DateInterval::createFromDateString](https://www.php.net/manual/en/dateinterval.createfromdatestring.php) method.

```javascript
const duration = DateInterval.fromString(time);
```

#### To String

Format the current interval to a relative time string.

- `maxValues` is a number indicating the maximum values to output, and will default to *1*.

Values are output in order of most significant to least significant (years first), where the value is greater or less than 0.

```javascript
const relativeString = duration.toString(maxValues);
```

#### Format

Format the current interval with a PHP DateInterval format string.

- `formatString` is the string to use for formatting, and is compatible with the PHP [DateInterval::format](https://www.php.net/manual/en/dateinterval.format.php) method.

```javascript
const durationString = duration.format(formatString);
```
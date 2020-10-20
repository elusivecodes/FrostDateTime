# FrostDateTime

**FrostDateTime** is a free, open-source date manipulation library for *JavaScript*.

It is a lightweight (~7kb gzipped) and modern library, and features support for ICU DateTime formats, time zones and locales.


## Table Of Contents
- [Installation](#installation)
- [Date Creation](#date-creation)
- [Date Formatting](#date-formatting)
- [Date Attributes](#date-attributes)
- [Week Attributes](#week-attributes)
- [Time Attributes](#time-attributes)
- [Time Zones](#time-zones)
- [Timestamps](#timestamps)
- [Utility Methods](#utility-methods)
- [Static Methods](#static-methods)



## Installation

**In Browser**

```html
<script type="text/javascript" src="/path/to/frost-datetime.min.js"></script>
```

**Using NPM**

```
npm i frostdatetime
```

In Node.js:

```javascript
const { DateInterval, DateTime, DateTimeImmutable } = require('frostdatetime');
```


## Date Creation

- `dateString` is a string representing the date, and will default to the current timestamp.
- `options` is an object containing properties to define the new date.
    - `locale` is a string representing the localeof the date, and will default to the system locale.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.

```javascript
const date = new DateTime(dateString, options);
```

**Immutable DateTime**

By default, *DateTime* objects are mutable, but if you wish to create an immutable reference you can use the following syntax.

Immutable *DateTime* objects return a new *DateTimeImmutable* whenever they are modified.

```javascript
const date = new DateTimeImmutable(dateString, options);
```

**From Array**

- `dateArray` is an array containing the year, month, date, hours, minutes, seconds and milliseconds.
- `options` is an object containing properties to define the new date.
    - `locale` is a string representing the localeof the date, and will default to the system locale.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.

```javascript
const date = DateTime.fromArray(dateArray, options);
```

The month and date in the `dateArray` will default to 1 if not set. The hours, minutes, seconds and milliseconds will default to 0.

**From Date**

- `dateObj` is a native JS *Date* object.
- `options` is an object containing properties to define the new date.
    - `locale` is a string representing the localeof the date, and will default to the system locale.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.

```javascript
const date = DateTime.fromDate(dateObj, options);
```

**From Format**

If you wish to parse a date string and you know the exact format, you can use the `fromFormat` static method.

- `formatString` is a string containing the format you wish to use for parsing.
- `dateString` is a string representing the date you are parsing.
- `options` is an object containing properties to define the new date.
    - `locale` is a string representing the localeof the date, and will default to the system locale.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone (unless a time zone is specified in the `dateString`).

The `formatString` supports a subset of the ICU specification described in [Formats](Formats.md).

If the `dateString` contains time zone or offset information, and the `timeZone` option is also passed, the created *DateTime* will be converted to the new `timeZone`, otherwise the `timeZone` will be used during date creation.

The `isValid` property on the created *DateTime* object can be used to determine whether a formatted string was a valid date.

```javascript
const date = DateTime.fromFormat(formatString, dateString, options);
```

**From Timestamp**

- `timestamp` is the number of seconds since the UNIX epoch.
- `options` is an object containing properties to define the new date.
    - `locale` is a string representing the localeof the date, and will default to the system locale.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.

```javascript
const date = DateTime.fromTimestamp(timestamp, options);
```

**Now**

- `options` is an object containing properties to define the new date.
    - `locale` is a string representing the localeof the date, and will default to the system locale.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.

```javascript
const date = DateTime.now(options);
```


## Date Formatting

**Format**

Once you have created a *DateTime* object, you can get a string representation using a specific format with the `format` method.

- `formatString` is a string containing the format you wish to output using.

The `formatString` supports a subset of the ICU specification described in [Formats](Formats.md).

```javascript
const dateString = date.format(formatString);
```

**To String**

Format the current date using "*eee MMM dd yyyy HH:mm:ss xx (VV)*".

```javascript
const string = date.toString();
```

**To Date String**

Format the current date using "*eee MMM dd yyyy*".

```javascript
const dateString = date.toDateString();
```

**To ISO String**

Format the current date using "*yyyy-MM-dd'THH:mm:ss.0xxx*" (in English and UTC time zone).

```javascript
const isoString = date.toISOString();
```

**To Time String**

Format the current date using "*HH:mm:ss xx (VV)*".

```javascript
const timeString = date.toTimeString();
```

**To UTC String**

Format the current date using "*eee MMM dd yyyy HH:mm:ss xx (VV)*" (in UTC time zone).

```javascript
const utcString = date.toUTCString();
```


## Date Attributes

**Get Date**

Get the date in current time zone.

```javascript
const date = date.getDate();
```

**Get Day**

Get the day of the week in current time zone.

The `day` returned will be between *0* (Sunday) and *6* (Saturday).

```javascript
const day = date.getDay();
```

**Get Day Of Year**

Get the day of the year in current time zone.

The `dayOfYear` returned will be between *0* and *365*.

```javascript
const dayOfYear = date.getDayOfYear();
```

**Get Month**

Get the month in current time zone.

The `month` returned will be between *1* (January) and *12* (December).

```javascript
const month = date.getMonth();
```

**Get Quarter**

Get the quarter of the year in current time zone.

The `quarter` returned will be between *1* and *4*.

```javascript
const quarter = date.getQuarter();
```

**Get Year**

Get the year in current time zone.

```javascript
const year = date.getYear();
```

**Set Date**

Set the date in current time zone.

- `date` is a number representing the date.

```javascript
date.setDate(date);
```

**Set Day**

Set the day of the week in current time zone.

- `day` is a number representing the day of the week (between *0* and *6*).

```javascript
date.setDay(day);
```

**Set Day Of Year**

Set the day of the year in current time zone.

- `dayOfYear` is a number representing the day of the year (between *0* and *365*).

```javascript
date.setDayOfYear(dayOfYear);
```

**Set Month**

Set the month in current time zone.

- `month` is a number representing the month (between *1* and *12*).
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

To disable date clamping, set the property `DateTime.clampDates` to *false*.

```javascript
date.setMonth(month, date);
```

**Set Quarter**

Set the quarter of the year in current time zone.

- `quarter` is a number representing the quarter between *1* and *4*.

```javascript
date.setQuarter(quarter);
```

**Set Year**

Set the year in current time zone.

- `year` is a number representing the year.
- `month` is a number representing the month (between *1* and *12*), and will default to the current value.
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

To disable date clamping, set the property `DateTime.clampDates` to *false*.

```javascript
date.setYear(year, month, date);
```


## Week Attributes

**Get Day Of Week**

Get the local day of the week in current time zone.

The `dayOfWeek` returned will be between *1* (Monday) and *7* (Sunday).

```javascript
const dayOfWeek = date.getDayOfWeek();
```

**Get Day Of Week In Month**

Get the day of the week in the month, in current time zone.

The `dayOfWeekInMonth` returned will be between *1* and *5*.

```javascript
const dayOfWeekInMonth = date.getDayOfWeekInMonth();
```

**Get Week**

Get the week of the year in current time zone.

The `week` returned will be between *1*  and *53* (week starting on Monday).

```javascript
const week = date.getWeek();
```

**Get Week Of Month**

Get the week of the month in current time zone.

The `weekOfMonth` returned will be between *1*  and *5*.

```javascript
const weekOfMonth = date.getWeekOfMonth();
```

**Get Week Year**

Get the week year in current time zone.

This method is identical to `getYear()` except in cases where the week belongs to the previous or next year, then that value will be used instead.

```javascript
const weekYear = date.getWeekYear();
```

**Set Day Of Week**

Set the local day of the week in current time zone.

- `dayOfWeek` is a number representing the week day (between *1* and *7*).

```javascript
date.setDayOfWeek(dayOfWeek);
```

**Set Day Of Week In Month**

Set the day of the week in the month, in current time zone.

- `dayOfWeekInMonth` is a number representing the day of the week in month (between *1* and *5*).

```javascript
date.setDayOfWeekInMonth(dayOfWeekInMonth);
```

**Set Week**

Set the week in current time zone.

- `week` is a number representing the week.
- `dayOfWeek` is a number representing the day (between *1* and *7*), and will default to the current value.

```javascript
date.setWeek(week, dayOfWeek);
```

**Set Week Of Month**

Set the week of the month in current time zone.

- `weekOfMonth` is a number representing the week of the month (between *1*  and *5*).

```javascript
date.setWeekOfMonth(weekOfMonth);
```

**Set Week Year**

Set the ISO year in current time zone.

- `weekYear` is a number representing the year.
- `week` is a number representing the week, and will default to the current value.
- `dayOfWeek` is a number representing the day (between *1* and *7*), and will default to the current value.

```javascript
date.setWeekYear(weekYear, week, dayOfWeek);
```


## Time Attributes

**Get Beat (Internet Swatch Time)**

Get the internet swatch time beat in current time zone.

The `beat` returned will be between *0* and *999*.

```javascript
const beat = date.getBeat();
```

**Get Hours**

Get the hours of the day in current time zone.

The `hours` returned will be between *0* and *23*.

```javascript
const hours = date.getHours();
```

**Get Milliseconds**

Get the milliseconds of the second in current time zone.

The `millis` returned will be between *0* and *999*.

```javascript
const millis = date.getMilliseconds();
```

**Get Minutes**

Get the minutes of the hour in current time zone.

The `minutes` returned will be between *0* and *59*.

```javascript
const minutes = date.getMinutes();
```

**Get Seconds**

Get the seconds of the minute in current time zone.

The `seconds` returned will be between *0* and *59*.

```javascript
const seconds = date.getSeconds();
```

**Set Beat (Internet Swatch Time)**

Set the internet swatch time beat in current time zone.

- `beat` is a number representing the beat of the day (between *0* and *999*).

```javascript
date.setBeat(beat);
```

**Set Hours**

Set the hours of the day in current time zone.

- `hours` is a number representing the hours of the day (between *0* and *23*).
- `minutes` is a number representing the minutes of the hour (between *0* and *59*), and will default to the current value.
- `seconds` is a number representing the seconds of the minute (between *0* and *59*), and will default to the current value.
- `millis` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
date.setHours(hours, minutes, seconds, millis);
```

**Set Milliseconds**

Set the milliseconds of the second in current time zone.

- `millis` is a number representing the milliseconds of the second (between *0* and *999*).

```javascript
date.setMilliseconds(millis);
```

**Set Minutes**

Set the minutes of the hour in current time zone.

- `minutes` is a number representing the minutes of the hour (between *0* and *59*).
- `seconds` is a number representing the seconds of the minute (between *0* and *59*), and will default to the current value.
- `millis` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
date.setMinutes(minutes, seconds, millis);
```

**Set Seconds**

Set the seconds of the minute in current time zone.

- `seconds` is a number representing the seconds of the minute (between *0* and *59*).
- `millis` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
date.setSeconds(seconds, millis);
```


## Time Zones

**Get Time Zone**

Get the name of the current time zone.

```javascript
const timeZone = date.getTimeZone();
```

**Get Time Zone Offset**

Get the UTC offset (in minutes) of the current time zone.

```javascript
const offset = date.getTimeZoneOffset();
```

**Set Time Zone**

Set the current time zone.

- `timeZone` is the name of the new time zone, which can be either "*UTC*", a supported value from the [IANA timeZone database](https://www.iana.org/time-zones) or an offset string.
- `adjust` is a boolean indicating whether to negate a difference in the offset, and will default to *false*.

```javascript
date.setTimeZone(timeZone, adjust);
```


## Timestamps

**Get Milliseconds**

Get the number of milliseconds since the UNIX epoch.

```javascript
const time = date.getTime();
```

**Get Seconds**

Get the number of seconds since the UNIX epoch.

```javascript
const timestamp = date.getTimestamp();
```

**Set Milliseconds**

Set the number of milliseconds since the UNIX epoch.

```javascript
date.setTime(time);
```

**Set Seconds**

Set the number of seconds since the UNIX epoch.

```javascript
date.setTimestamp(timestamp);
```


## Manipulation

**Add**

Add a duration to the date.

- `amount` is a number representing the amount of the `timeUnit` to add.
- `timeUnit` is a string representing the unit of time to add, and can be one of either "*year*", "*month*", "*week*", "*day*", "*hour*", "*minute*" or "*second*", or their pluralized versions.

```javascript
date.add(amount, timeUnit);
```

**End Of**

Set the date to the end of a unit of time in current time zone.

- `timeUnit` is a string representing the unit of time to use, and can be one of either "*year*", "*quarter*", "*month*", "*isoWeek*", "*week*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
date.endOf(timeUnit);
```

**Start Of**

Set the date to the start of a unit of time in current time zone.

- `timeUnit` is a string representing the unit of time to use, and can be one of either "*year*", "*quarter*", "*month*", "*isoWeek*", "*week*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
date.startOf(timeUnit);
```

**Subtract**

- `amount` is a number representing the amount of the `timeUnit` to subtract.
- `timeUnit` is a string representing the unit of time to subtract, and can be one of either "*year*", "*month*", "*week*", "*day*", "*hour*", "*minute*" or "*second*", or their pluralized versions.

```javascript
date.sub(amount, timeUnit);
```


## Utility Methods

**Clone**

Create a new *DateTime* using the current date and time zone.

```javascript
const clone = date.clone();
```

**Day Name**

Get the name of the day of the week in current time zone.

- `type` can be either "*long*", "*short*" or "*narrow*", and will default to "*long*" if it is not set.

```javascript
const dayName = date.dayName(type);
```

**Days In Month**

Get the number of days in the current month.

```javascript
const daysInMonth = date.daysInMonth();
```

**Days In Year**

Get the number of days in the current year.

```javascript
const daysInYear = date.daysInYear();
```

**Difference**

Get the difference between two Dates.

- `other` is the *DateTime* object to compare to.
- `absolute` is a boolean indicating whether the interval will be forced to be positive, and will default to *false*.

```javascript
const diff = date.diff(other, absolute);
```

**Is After?**

Return *true* if the *DateTime* is after another date.

- `other` is the *DateTime* object to compare to.
- `granularity` is a string specifying the level of granularity to use when comparing the dates, and can be one of either "*year*", "*month*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
const isAfter = date.isAfter(other, granularity);
```

If a `granularity` is not specified, a direct comparison of the timestamps will be performed instead.

**Is Before?**

Return *true* if the *DateTime* is before another date.

- `other` is the *DateTime* object to compare to.
- `granularity` is a string specifying the level of granularity to use when comparing the dates, and can be one of either "*year*", "*month*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
const isBefore = date.isBefore(other, granularity);
```

If a `granularity` is not specified, a direct comparison of the timestamps will be performed instead.

**Is Between?**

Return *true* if the *DateTime* is between two other dates.

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.
- `granularity` is a string specifying the level of granularity to use when comparing the dates, and can be one of either "*year*", "*month*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
const isBetween = date.isBetween(start, end, granularity);
```

If a `granularity` is not specified, a direct comparison of the timestamps will be performed instead.

**Is DST?**

Return *true* if the *DateTime* is in daylight savings.

```javascript
const isDST = date.isDST();
```

**Is Leap Year?**

Return *true* if the year is a leap year.

```javascript
const isLeapYear = date.isLeapYear();
```

**Is Same?**

Return *true* if the *DateTime* is the same as another date.

- `other` is the *DateTime* object to compare to.
- `granularity` is a string specifying the level of granularity to use when comparing the dates, and can be one of either "*year*", "*month*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
const isSame = date.isSame(other, granularity);
```

If a `granularity` is not specified, a direct comparison of the timestamps will be performed instead.

**Is Same Or After?**

Return *true* if the *DateTime* is the same or after another date.

- `other` is the *DateTime* object to compare to.
- `granularity` is a string specifying the level of granularity to use when comparing the dates, and can be one of either "*year*", "*month*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
const isSameOrAfter = date.isSameOrAfter(other, granularity);
```

If a `granularity` is not specified, a direct comparison of the timestamps will be performed instead.

**Is Same Or Before?**

Return *true* if the *DateTime* is the same or before another date.

- `other` is the *DateTime* object to compare to.
- `granularity` is a string specifying the level of granularity to use when comparing the dates, and can be one of either "*year*", "*month*", "*date*", "*day*", "*hour*", "*minute*" or "*second*".

```javascript
const isSameOrBefore = date.isSameOrBefore(other, granularity);
```

If a `granularity` is not specified, a direct comparison of the timestamps will be performed instead.

**Month Name**

Get the name of the month in current time zone.

- `type` can be either "*long*", "*short*" or "*narrow*", and will default to "*long*" if it is not set.

```javascript
const monthName = date.monthName(type);
```

**Weeks In Year**

Get the number of weeks in the current year.

```javascript
const weeksInYear = date.weeksInYear();
```


## Static Methods

**Day Of Year**

Get the day of the year for a year, month and date.

- `year` is a number representing the year.
- `month` is a number representing the month (between *1* and *12*).
- `date` is a number representing the date.

```javascript
const dayOfYear = DateTime.dayOfYear(year, month, date);
```

**Days In Month**

Get the number of days in a month, from a year and month.

- `year` is a number representing the year.
- `month` is a number representing the month (between *1* and *12*).

```javascript
const daysInMonth = DateTime.daysInMonth(year, month);
```

**Days In Year**

Get the number of days in a year.

- `year` is a number representing the year.

```javascript
const daysInYear = DateTime.daysInYear(year);
```

**Is Leap Year?**

Return *true* if the year is a leap year.

- `year` is a number representing the year.

```javascript
const isLeapYear = DateTime.isLeapYear(year);
```

**Weeks In Year**

Get the number of weeks in a year.

- `year` is a number representing the year.

```javascript
const weeksInYear = DateTime.weeksInYear(year);
```

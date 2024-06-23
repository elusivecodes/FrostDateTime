# FrostDateTime

**FrostDateTime** is a free, open-source immutable date manipulation library for *JavaScript*.

It is a lightweight (~7kb gzipped) and modern library, and features support for ICU formats, time zones and locales.


## Table Of Contents
- [Installation](#installation)
- [Date Creation](#date-creation)
- [Date Formatting](#date-formatting)
- [Date Attributes](#date-attributes)
- [Week Attributes](#week-attributes)
- [Time Attributes](#time-attributes)
- [Timestamps](#timestamps)
- [Time Zones](#time-zones)
- [Locales](#locales)
- [Manipulation](#manipulation)
- [Comparisons](#comparisons)
- [Utility Methods](#utility-methods)
- [Static Methods](#static-methods)



## Installation

**In Browser**

```html
<script type="text/javascript" src="/path/to/frost-datetime.min.js"></script>
```

**Using NPM**

```
npm i @fr0st/datetime
```

In Node.js:

```javascript
import DateTime from '@fr0st/datetime';
```


## Date Creation

- `dateString` is a string representing the date, and will default to the current timestamp.
- `options` is an object containing options for creating the new date.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.
    - `locale` is a string representing the locale of the date, and will default to the system locale.

```javascript
const dateTime = new DateTime(dateString, options);
```

**From Array**

- `dateArray` is an array containing the year, month, date, hours, minutes, seconds and milliseconds.
- `options` is an object containing options for creating the new date.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.
    - `locale` is a string representing the locale of the date, and will default to the system locale.

```javascript
const dateTime = DateTime.fromArray(dateArray, options);
```

The month and date in the `dateArray` will default to 1 if not set. The hours, minutes, seconds and milliseconds will default to 0.

**From Date**

- `dateObj` is a native JS *Date* object.
- `options` is an object containing options for creating the new date.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.
    - `locale` is a string representing the locale of the date, and will default to the system locale.

```javascript
const dateTime = DateTime.fromDate(dateObj, options);
```

**From Format**

If you wish to parse a date string and you know the exact format, you can use the `fromFormat` static method.

- `formatString` is a string containing the format you wish to use for parsing.
- `dateString` is a string representing the date you are parsing.
- `options` is an object containing options for creating the new date.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.
    - `locale` is a string representing the locale of the date, and will default to the system locale.

The `formatString` supports a subset of the ICU specification described in [Formats](Formats.md).

The `isValid` property on the created *DateTime* object can be used to determine whether a formatted string was a valid date.

```javascript
const dateTime = DateTime.fromFormat(formatString, dateString, options);
```

**From ISO String**

- `dateString` is a string representing the date you are parsing.
- `options` is an object containing options for creating the new date.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.
    - `locale` is a string representing the locale of the date, and will default to English.

The `dateString` must be in *yyyy-MM-dd'T'HH:mm:ss.SSSxxx*" format and in English.

If the `timeZone` option is also passed, the created *DateTime* will be converted to the new `timeZone`.

The `isValid` property on the created *DateTime* object can be used to determine whether a formatted string was a valid date.

```javascript
const dateTime = DateTime.fromISOString(dateString, options);
```

**From Timestamp**

- `timestamp` is the number of seconds since the UNIX epoch.
- `options` is an object containing options for creating the new date.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.
    - `locale` is a string representing the locale of the date, and will default to the system locale.

```javascript
const dateTime = DateTime.fromTimestamp(timestamp, options);
```

**Now**

- `options` is an object containing options for creating the new date.
    - `timeZone` is a string representing the time zone of the date, and will default to the system time zone.
    - `locale` is a string representing the locale of the date, and will default to the system locale.

```javascript
const dateTime = DateTime.now(options);
```


## Date Formatting

**Format**

Once you have created a *DateTime* object, you can get a string representation using a specific format with the `format` method.

- `formatString` is a string containing the format you wish to output using.

The `formatString` supports a subset of the ICU specification described in [Formats](Formats.md).

```javascript
const dateString = dateTime.format(formatString);
```

**To String**

Format the current date using "*eee MMM dd yyyy HH:mm:ss xx (VV)*".

```javascript
const string = dateTime.toString();
```

**To Date String**

Format the current date using "*eee MMM dd yyyy*".

```javascript
const dateString = dateTime.toDateString();
```

**To ISO String**

Format the current date using "*yyyy-MM-dd'T'HH:mm:ss.SSSxxx*" (in English and UTC time zone).

```javascript
const isoString = dateTime.toISOString();
```

**To Time String**

Format the current date using "*HH:mm:ss xx (VV)*".

```javascript
const timeString = dateTime.toTimeString();
```

**To UTC String**

Format the current date using "*eee MMM dd yyyy HH:mm:ss xx (VV)*" (in UTC time zone).

```javascript
const utcString = dateTime.toUTCString();
```


## Date Attributes

**Get Date**

Get the date in current time zone.

```javascript
const date = dateTime.getDate();
```

**Get Day**

Get the day of the week in current time zone.

The `day` returned will be between *0* (Sunday) and *6* (Saturday).

```javascript
const day = dateTime.getDay();
```

**Get Day Of Year**

Get the day of the year in current time zone.

The `dayOfYear` returned will be between *0* and *365*.

```javascript
const dayOfYear = dateTime.getDayOfYear();
```

**Get Month**

Get the month in current time zone.

The `month` returned will be between *1* (January) and *12* (December).

```javascript
const month = dateTime.getMonth();
```

**Get Quarter**

Get the quarter of the year in current time zone.

The `quarter` returned will be between *1* and *4*.

```javascript
const quarter = dateTime.getQuarter();
```

**Get Year**

Get the year in current time zone.

```javascript
const year = dateTime.getYear();
```

**Set Date**

Set the date in current time zone.

- `date` is a number representing the date.

```javascript
const newDateTime = dateTime.setDate(date);
```

**Set Day**

Set the day of the week in current time zone.

- `day` is a number representing the day of the week (between *0* and *6*).

```javascript
const newDateTime = dateTime.setDay(day);
```

**Set Day Of Year**

Set the day of the year in current time zone.

- `dayOfYear` is a number representing the day of the year (between *0* and *365*).

```javascript
const newDateTime = dateTime.setDayOfYear(dayOfYear);
```

**Set Month**

Set the month in current time zone.

- `month` is a number representing the month (between *1* and *12*).
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

To disable date clamping, use the method `DateTime.setDateClamping()` using *false* as the argument.

```javascript
const newDateTime = dateTime.setMonth(month, date);
```

**Set Quarter**

Set the quarter of the year in current time zone.

- `quarter` is a number representing the quarter between *1* and *4*.

```javascript
const newDateTime = dateTime.setQuarter(quarter);
```

**Set Year**

Set the year in current time zone.

- `year` is a number representing the year.
- `month` is a number representing the month (between *1* and *12*), and will default to the current value.
- `date` is a number representing the date, and will default to the current value.

If the `date` argument is omitted, and the new month contains less days than the current date, the date will be set to the last day of the new month.

To disable date clamping, use the method `DateTime.setDateClamping()` using *false* as the argument.

```javascript
const newDateTime = dateTime.setYear(year, month, date);
```


## Week Attributes

**Get Week**

Get the week of the year in current time zone.

The `week` returned will be between *1*  and *53* (week starting on Monday).

```javascript
const week = dateTime.getWeek();
```

**Get Week Day**

Get the local day of the week in current time zone.

The `weekDay` returned will be between *1* and *7*.

```javascript
const weekDay = dateTime.getWeekDay();
```

**Get Week Day In Month**

Get the day of the week in the month, in current time zone.

The `weekDayInMonth` returned will be between *1* and *5*.

```javascript
const weekDayInMonth = dateTime.getWeekDayInMonth();
```

**Get Week Of Month**

Get the week of the month in current time zone.

The `weekOfMonth` returned will be between *1*  and *5*.

```javascript
const weekOfMonth = dateTime.getWeekOfMonth();
```

**Get Week Year**

Get the week year in current time zone.

This method is identical to `getYear()` except in cases where the week belongs to the previous or next year, then that value will be used instead.

```javascript
const weekYear = dateTime.getWeekYear();
```

**Set Week**

Set the week in current time zone.

- `week` is a number representing the week.
- `weekDay` is a number representing the day (between *1* and *7*), and will default to the current value.

```javascript
const newDateTime = dateTime.setWeek(week, weekDay);
```

**Set Week Day**

Set the local day of the week in current time zone.

- `weekDay` is a number representing the week day (between *1* and *7*).

```javascript
const newDateTime = dateTime.setWeekDay(weekDay);
```

**Set Week Day In Month**

Set the day of the week in the month, in current time zone.

- `weekDayInMonth` is a number representing the day of the week in month (between *1* and *5*).

```javascript
const newDateTime = dateTime.setWeekDayInMonth(weekDayInMonth);
```

**Set Week Of Month**

Set the week of the month in current time zone.

- `weekOfMonth` is a number representing the week of the month (between *1*  and *5*).

```javascript
const newDateTime = dateTime.setWeekOfMonth(weekOfMonth);
```

**Set Week Year**

Set the week year in current time zone.

- `weekYear` is a number representing the year.
- `week` is a number representing the week, and will default to the current value.
- `weekDay` is a number representing the day (between *1* and *7*), and will default to the current value.

```javascript
const newDateTime = dateTime.setWeekYear(weekYear, week, weekDay);
```


## Time Attributes

**Get Hours**

Get the hours of the day in current time zone.

The `hours` returned will be between *0* and *23*.

```javascript
const hours = dateTime.getHours();
```

**Get Milliseconds**

Get the milliseconds of the second in current time zone.

The `milliseconds` returned will be between *0* and *999*.

```javascript
const milliseconds = dateTime.getMilliseconds();
```

**Get Minutes**

Get the minutes of the hour in current time zone.

The `minutes` returned will be between *0* and *59*.

```javascript
const minutes = dateTime.getMinutes();
```

**Get Seconds**

Get the seconds of the minute in current time zone.

The `seconds` returned will be between *0* and *59*.

```javascript
const seconds = dateTime.getSeconds();
```

**Set Hours**

Set the hours of the day in current time zone.

- `hours` is a number representing the hours of the day (between *0* and *23*).
- `minutes` is a number representing the minutes of the hour (between *0* and *59*), and will default to the current value.
- `seconds` is a number representing the seconds of the minute (between *0* and *59*), and will default to the current value.
- `milliseconds` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
const newDateTime = dateTime.setHours(hours, minutes, seconds, milliseconds);
```

**Set Milliseconds**

Set the milliseconds of the second in current time zone.

- `milliseconds` is a number representing the milliseconds of the second (between *0* and *999*).

```javascript
const newDateTime = dateTime.setMilliseconds(milliseconds);
```

**Set Minutes**

Set the minutes of the hour in current time zone.

- `minutes` is a number representing the minutes of the hour (between *0* and *59*).
- `seconds` is a number representing the seconds of the minute (between *0* and *59*), and will default to the current value.
- `milliseconds` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
const newDateTime = dateTime.setMinutes(minutes, seconds, milliseconds);
```

**Set Seconds**

Set the seconds of the minute in current time zone.

- `seconds` is a number representing the seconds of the minute (between *0* and *59*).
- `milliseconds` is a number representing the milliseconds of the second (between *0* and *999*), and will default to the current value.

```javascript
const newDateTime = dateTime.setSeconds(seconds, milliseconds);
```


## Timestamps

**Get Milliseconds**

Get the number of milliseconds since the UNIX epoch.

```javascript
const time = dateTime.getTime();
```

**Get Seconds**

Get the number of seconds since the UNIX epoch.

```javascript
const timestamp = dateTime.getTimestamp();
```

**Set Milliseconds**

Set the number of milliseconds since the UNIX epoch.

```javascript
const newDateTime = dateTime.setTime(time);
```

**Set Seconds**

Set the number of seconds since the UNIX epoch.

```javascript
const newDateTime = dateTime.setTimestamp(timestamp);
```


## Time Zones

**Get Time Zone**

Get the name of the current time zone.

```javascript
const timeZone = dateTime.getTimeZone();
```

**Get Time Zone Offset**

Get the UTC offset (in minutes) of the current time zone.

```javascript
const offset = dateTime.getTimeZoneOffset();
```

**Set Time Zone**

Set the current time zone.

- `timeZone` is the name of the new time zone, which can be either "*UTC*", a supported value from the [IANA timeZone database](https://www.iana.org/time-zones) or an offset string.

```javascript
const newDateTime = dateTime.setTimeZone(timeZone);
```

**Set Time Zone Offset**

Set the UTC offset (in minutes).

- `offset` is the UTC offset (in minutes).

```javascript
const newDateTime = dateTime.setTimeZoneOffset(offset);
```


## Locales

**Get Locale**

Get the name of the current locale.

```javascript
const locale = dateTime.getLocale();
```

**Set Locale**

Set the current locale.

- `locale` is the name of the new locale.

```javascript
const newDateTime = dateTime.setLocale(locale);
```


## Manipulation

**Add Day**

Add a day to the current date.

```javascript
const newDateTime = dateTime.addDay();
```

**Add Days**

Add days to the current date.

- `amount` is a number representing the amount of days to add.

```javascript
const newDateTime = dateTime.addDay(amount);
```

**Add Hour**

Add a hour to the current date.

```javascript
const newDateTime = dateTime.addHour();
```

**Add Hours**

Add hours to the current date.

- `amount` is a number representing the amount of hours to add.

```javascript
const newDateTime = dateTime.addHours(amount);
```

**Add Minute**

Add a minute to the current date.

```javascript
const newDateTime = dateTime.addMinute();
```

**Add Minutes**

Add minutes to the current date.

- `amount` is a number representing the amount of minutes to add.

```javascript
const newDateTime = dateTime.addMinutes(amount);
```

**Add Month**

Add a month to the current date.

```javascript
const newDateTime = dateTime.addMonth();
```

**Add Months**

Add months to the current date.

- `amount` is a number representing the amount of months to add.

```javascript
const newDateTime = dateTime.addMonths(amount);
```

**Add Second**

Add a second to the current date.

```javascript
const newDateTime = dateTime.addSecond();
```

**Add Seconds**

Add seconds to the current date.

- `amount` is a number representing the amount of seconds to add.

```javascript
const newDateTime = dateTime.addSeconds(amount);
```

**Add Week**

Add a week to the current date.

```javascript
const newDateTime = dateTime.addWeek();
```

**Add Weeks**

Add weeks to the current date.

- `amount` is a number representing the amount of weeks to add.

```javascript
const newDateTime = dateTime.addWeeks(amount);
```

**Add Year**

Add a year to the current date.

```javascript
const newDateTime = dateTime.addYear();
```

**Add Years**

Add years to the current date.

- `amount` is a number representing the amount of years to add.

```javascript
const newDateTime = dateTime.addYears(amount);
```

**End Of Day**

Set the date to the end of the day in current time zone.

```javascript
const newDateTime = dateTime.endOfDay();
```

**End Of Hour**

Set the date to the end of the hour in current time zone.

```javascript
const newDateTime = dateTime.endOfHour();
```

**End Of Minute**

Set the date to the end of the minute in current time zone.

```javascript
const newDateTime = dateTime.endOfMinute();
```

**End Of Month**

Set the date to the end of the month in current time zone.

```javascript
const newDateTime = dateTime.endOfMonth();
```

**End Of Quarter**

Set the date to the end of the quarter in current time zone.

```javascript
const newDateTime = dateTime.endOfQuarter();
```

**End Of Second**

Set the date to the end of the second in current time zone.

```javascript
const newDateTime = dateTime.endOfSecond();
```

**End Of Week**

Set the date to the end of the week in current time zone.

```javascript
const newDateTime = dateTime.endOfWeek();
```

**End Of Year**

Set the date to the end of the year in current time zone.

```javascript
const newDateTime = dateTime.endOfYear();
```

**Start Of Day**

Set the date to the start of the day in current time zone.

```javascript
const newDateTime = dateTime.startOfDay();
```

**Start Of Hour**

Set the date to the start of the hour in current time zone.

```javascript
const newDateTime = dateTime.startOfHour();
```

**Start Of Minute**

Set the date to the start of the minute in current time zone.

```javascript
const newDateTime = dateTime.startOfMinute();
```

**Start Of Month**

Set the date to the start of the month in current time zone.

```javascript
const newDateTime = dateTime.startOfMonth();
```

**Start Of Quarter**

Set the date to the start of the quarter in current time zone.

```javascript
const newDateTime = dateTime.startOfQuarter();
```

**Start Of Second**

Set the date to the start of the second in current time zone.

```javascript
const newDateTime = dateTime.startOfSecond();
```

**Start Of Week**

Set the date to the start of the week in current time zone.

```javascript
const newDateTime = dateTime.startOfWeek();
```

**Start Of Year**

Set the date to the start of the year in current time zone.

```javascript
const newDateTime = dateTime.startOfYear();
```

**Subtract Day**

Subtract a day to the current date.

```javascript
const newDateTime = dateTime.subtractDay();
```

**Subtract Days**

Subtract days to the current date.

- `amount` is a number representing the amount of days to subtract.

```javascript
const newDateTime = dateTime.subtractDay(amount);
```

**Subtract Hour**

Subtract a hour to the current date.

```javascript
const newDateTime = dateTime.subtractHour();
```

**Subtract Hours**

Subtract hours to the current date.

- `amount` is a number representing the amount of hours to subtract.

```javascript
const newDateTime = dateTime.subtractHours(amount);
```

**Subtract Minute**

Subtract a minute to the current date.

```javascript
const newDateTime = dateTime.subtractMinute();
```

**Subtract Minutes**

Subtract minutes to the current date.

- `amount` is a number representing the amount of minutes to subtract.

```javascript
const newDateTime = dateTime.subtractMinutes(amount);
```

**Subtract Month**

Subtract a month to the current date.

```javascript
const newDateTime = dateTime.subtractMonth();
```

**Subtract Months**

Subtract months to the current date.

- `amount` is a number representing the amount of months to subtract.

```javascript
const newDateTime = dateTime.subtractMonths(amount);
```

**Subtract Second**

Subtract a second to the current date.

```javascript
const newDateTime = dateTime.subtractSecond();
```

**Subtract Seconds**

Subtract seconds to the current date.

- `amount` is a number representing the amount of seconds to subtract.

```javascript
const newDateTime = dateTime.subtractSeconds(amount);
```

**Subtract Week**

Subtract a week to the current date.

```javascript
const newDateTime = dateTime.subtractWeek();
```

**Subtract Weeks**

Subtract weeks to the current date.

- `amount` is a number representing the amount of weeks to subtract.

```javascript
const newDateTime = dateTime.subtractWeeks(amount);
```

**Subtract Year**

Subtract a year to the current date.

```javascript
const newDateTime = dateTime.subtractYear();
```

**Subtract Years**

Subtract years to the current date.

- `amount` is a number representing the amount of years to subtract.

```javascript
const newDateTime = dateTime.subtractYears(amount);
```


## Comparisons

**Difference**

Get the difference between two dates in milliseconds.

- `other` is the *DateTime* object to compare to.

```javascript
const diff = dateTime.diff(other);
```

**Difference In Days**

Get the difference between two dates in days.

- `other` is the *DateTime* object to compare to.
- `options` is an object containing options for how to compare the dates.
    - `relative` is a boolean indicating whether to return the relative difference, and will default to *true*.

```javascript
const diff = dateTime.diffInDays(other, options);
```

If `relative` is *true* (default) the value returned will be the relative difference, ignoring higher precision properties.

**Difference In Hours**

Get the difference between two dates in hours.

- `other` is the *DateTime* object to compare to.
- `options` is an object containing options for how to compare the dates.
    - `relative` is a boolean indicating whether to return the relative difference, and will default to *true*.

```javascript
const diff = dateTime.diffInHours(other, options);
```

If `relative` is *true* (default) the value returned will be the relative difference, ignoring higher precision properties.

**Difference In Minutes**

Get the difference between two dates in minutes.

- `other` is the *DateTime* object to compare to.
- `options` is an object containing options for how to compare the dates.
    - `relative` is a boolean indicating whether to return the relative difference, and will default to *true*.

```javascript
const diff = dateTime.diffInMinutes(other, options);
```

If `relative` is *true* (default) the value returned will be the relative difference, ignoring higher precision properties.

**Difference In Months**

Get the difference between two dates in months.

- `other` is the *DateTime* object to compare to.
- `options` is an object containing options for how to compare the dates.
    - `relative` is a boolean indicating whether to return the relative difference, and will default to *true*.

```javascript
const diff = dateTime.diffInMonths(other, options);
```

If `relative` is *true* (default) the value returned will be the relative difference, ignoring higher precision properties.

**Difference In Seconds**

Get the difference between two dates in seconds.

- `other` is the *DateTime* object to compare to.
- `options` is an object containing options for how to compare the dates.
    - `relative` is a boolean indicating whether to return the relative difference, and will default to *true*.

```javascript
const diff = dateTime.diffInSeconds(other, options);
```

If `relative` is *true* (default) the value returned will be the relative difference, ignoring higher precision properties.

**Difference In Weeks**

Get the difference between two dates in weeks.

- `other` is the *DateTime* object to compare to.
- `options` is an object containing options for how to compare the dates.
    - `relative` is a boolean indicating whether to return the relative difference, and will default to *true*.

```javascript
const diff = dateTime.diffInWeeks(other, options);
```

If `relative` is *true* (default) the value returned will be the relative difference, ignoring higher precision properties.

**Difference In Years**

Get the difference between two dates in years.

- `other` is the *DateTime* object to compare to.
- `options` is an object containing options for how to compare the dates.
    - `relative` is a boolean indicating whether to return the relative difference, and will default to *true*.

```javascript
const diff = dateTime.diffInYears(other, options);
```

If `relative` is *true* (default) the value returned will be the relative difference, ignoring higher precision properties.

**Human Difference**

Get the relative difference between two Dates in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiff(other);
```

The most significant non-zero value is determined where the unit of time has a non-relative difference, or the next relative difference value is greater than or equal to the unit of time.

```javascript
DateTime.fromFormat('yyyy-MM-dd', '2019-01-01').humanDiff(DateTime.fromFormat('yyyy-MM-dd', '2018-12-31')); // "tomorrow"
DateTime.fromFormat('yyyy-MM-dd', '2019-02-27').humanDiff(DateTime.fromFormat('yyyy-MM-dd', '2019-01-31')); // "in 27 days"
DateTime.fromFormat('yyyy-MM-dd', '2019-02-28').humanDiff(DateTime.fromFormat('yyyy-MM-dd', '2019-01-31')); // "next month"
DateTime.fromFormat('yyyy-MM-dd', '2019-01-01').humanDiff(DateTime.fromFormat('yyyy-MM-dd', '2018-06-01')); // "in 6 months"
DateTime.fromFormat('yyyy-MM-dd', '2019-01-01').humanDiff(DateTime.fromFormat('yyyy-MM-dd', '2018-01-31')); // "next year"
DateTime.fromFormat('yyyy-MM-dd', '2019-01-01').humanDiff(DateTime.fromFormat('yyyy-MM-dd', '2017-12-31')); // "in 2 years"
```

**Human Difference In Days**

Get the relative difference between two Dates in days in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiffInDays(other);
```

**Human Difference In Hours**

Get the relative difference between two Dates in hours in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiffInHours(other);
```

**Human Difference In Minutes**

Get the relative difference between two Dates in minutes in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiffInMinutes(other);
```

**Human Difference In Months**

Get the relative difference between two Dates in months in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiffInMonths(other);
```

**Human Difference In Seconds**

Get the relative difference between two Dates in seconds in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiffInSeconds(other);
```

**Human Difference In Weeks**

Get the relative difference between two Dates in weeks in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiffInWeeks(other);
```

**Human Difference In Years**

Get the relative difference between two Dates in years in a human readable format using the current locale.

- `other` is the *DateTime* object to compare to.

```javascript
const humanDiff = dateTime.humanDiffInYears(other);
```

**Is After?**

Return *true* if the *DateTime* is after another date.

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfter(other);
```

**Is After Day?**

Return *true* if the *DateTime* is after another date (comparing by day).

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfterDay(other);
```

**Is After Hour?**

Return *true* if the *DateTime* is after another date (comparing by hour).

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfterHour(other);
```

**Is After Minute?**

Return *true* if the *DateTime* is after another date (comparing by minute).

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfterMinute(other);
```

**Is After Month?**

Return *true* if the *DateTime* is after another date (comparing by month).

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfterMonth(other);
```

**Is After Second?**

Return *true* if the *DateTime* is after another date (comparing by second).

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfterSecond(other);
```

**Is After Week?**

Return *true* if the *DateTime* is after another date (comparing by week).

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfterWeek(other);
```

**Is After Year?**

Return *true* if the *DateTime* is after another date (comparing by year).

- `other` is the *DateTime* object to compare to.

```javascript
const isAfter = dateTime.isAfterYear(other);
```

**Is Before?**

Return *true* if the *DateTime* is before another date.

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBefore(other);
```

**Is Before Day?**

Return *true* if the *DateTime* is before another date (comparing by day).

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBeforeDay(other);
```

**Is Before Hour?**

Return *true* if the *DateTime* is before another date (comparing by hour).

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBeforeHour(other);
```

**Is Before Minute?**

Return *true* if the *DateTime* is before another date (comparing by minute).

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBeforeMinute(other);
```

**Is Before Month?**

Return *true* if the *DateTime* is before another date (comparing by month).

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBeforeMonth(other);
```

**Is Before Second?**

Return *true* if the *DateTime* is before another date (comparing by second).

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBeforeSecond(other);
```

**Is Before Week?**

Return *true* if the *DateTime* is before another date (comparing by week).

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBeforeWeek(other);
```

**Is Before Year?**

Return *true* if the *DateTime* is before another date (comparing by year).

- `other` is the *DateTime* object to compare to.

```javascript
const isBefore = dateTime.isBeforeYear(other);
```

**Is Between?**

Return *true* if the *DateTime* is between two other dates.

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetween(start, end);
```

**Is Between Day?**

Return *true* if the *DateTime* is between two other dates (comparing by day).

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetweenDay(start, end);
```

**Is Between Hour?**

Return *true* if the *DateTime* is between two other dates (comparing by hour).

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetweenHour(start, end);
```

**Is Between Minute?**

Return *true* if the *DateTime* is between two other dates (comparing by minute).

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetweenMinute(start, end);
```

**Is Between Month?**

Return *true* if the *DateTime* is between two other dates (comparing by month).

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetweenMonth(start, end);
```

**Is Between Second?**

Return *true* if the *DateTime* is between two other dates (comparing by second).

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetweenSecond(start, end);
```

**Is Between Week?**

Return *true* if the *DateTime* is between two other dates (comparing by week).

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetweenWeek(start, end);
```

**Is Between Year?**

Return *true* if the *DateTime* is between two other dates (comparing by year).

- `start` is the starting *DateTime* object to compare to.
- `end` is the ending *DateTime* object to compare to.

```javascript
const isBetween = dateTime.isBetweenYear(start, end);
```

**Is Same?**

Return *true* if the *DateTime* is the same as another date.

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSame(other);
```

**Is Same Day?**

Return *true* if the *DateTime* is the same as another date (comparing by day).

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSameDay(other);
```

**Is Same Hour?**

Return *true* if the *DateTime* is the same as another date (comparing by hour).

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSameHour(other);
```

**Is Same Minute?**

Return *true* if the *DateTime* is the same as another date (comparing by minute).

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSameMinute(other);
```

**Is Same Month?**

Return *true* if the *DateTime* is the same as another date (comparing by month).

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSameMonth(other);
```

**Is Same Second?**

Return *true* if the *DateTime* is the same as another date (comparing by second).

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSameSecond(other);
```

**Is Same Week?**

Return *true* if the *DateTime* is the same as another date (comparing by week).

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSameWeek(other);
```

**Is Same Year?**

Return *true* if the *DateTime* is the same as another date (comparing by year).

- `other` is the *DateTime* object to compare to.

```javascript
const isSame = dateTime.isSameYear(other);
```

**Is Same Or After?**

Return *true* if the *DateTime* is the same as or after another date.

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfter(other);
```

**Is Same Or After Day?**

Return *true* if the *DateTime* is the same as or after another date (comparing by day).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfterDay(other);
```

**Is Same Or After Hour?**

Return *true* if the *DateTime* is the same as or after another date (comparing by hour).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfterHour(other);
```

**Is Same Or After Minute?**

Return *true* if the *DateTime* is the same as or after another date (comparing by minute).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfterMinute(other);
```

**Is Same Or After Month?**

Return *true* if the *DateTime* is the same as or after another date (comparing by month).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfterMonth(other);
```

**Is Same Or After Second?**

Return *true* if the *DateTime* is the same as or after another date (comparing by second).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfterSecond(other);
```

**Is Same Or After Week?**

Return *true* if the *DateTime* is the same as or after another date (comparing by week).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfterWeek(other);
```

**Is Same Or After Year?**

Return *true* if the *DateTime* is the same as or after another date (comparing by year).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrAfter = dateTime.isSameOrAfterYear(other);
```

**Is Same Or Before?**

Return *true* if the *DateTime* is the same as or before another date.

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBefore(other);
```

**Is Same Or Before Day?**

Return *true* if the *DateTime* is the same as or before another date (comparing by day).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBeforeDay(other);
```

**Is Same Or Before Hour?**

Return *true* if the *DateTime* is the same as or before another date (comparing by hour).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBeforeHour(other);
```

**Is Same Or Before Minute?**

Return *true* if the *DateTime* is the same as or before another date (comparing by minute).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBeforeMinute(other);
```

**Is Same Or Before Month?**

Return *true* if the *DateTime* is the same as or before another date (comparing by month).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBeforeMonth(other);
```

**Is Same Or Before Second?**

Return *true* if the *DateTime* is the same as or before another date (comparing by second).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBeforeSecond(other);
```

**Is Same Or Before Week?**

Return *true* if the *DateTime* is the same as or before another date (comparing by week).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBeforeWeek(other);
```

**Is Same Or Before Year?**

Return *true* if the *DateTime* is the same as or before another date (comparing by year).

- `other` is the *DateTime* object to compare to.

```javascript
const isSameOrBefore = dateTime.isSameOrBeforeYear(other);
```


## Utility Methods

**Day Name**

Get the name of the day of the week in current time zone and locale.

- `type` can be either "*long*", "*short*" or "*narrow*", and will default to "*long*" if it is not set.

```javascript
const dayName = dateTime.dayName(type);
```

**Day Period**

Get the day period in current time zone and locale.

- `type` can be either "*long*" or "*short*", and will default to "*long*" if it is not set.

```javascript
const dayPeriod = dateTime.dayPeriod(type);
```

**Days In Month**

Get the number of days in the current month.

```javascript
const daysInMonth = dateTime.daysInMonth();
```

**Days In Year**

Get the number of days in the current year.

```javascript
const daysInYear = dateTime.daysInYear();
```

**Era**

Get the era in current time zone and locale.

- `type` can be either "*long*", "*short*" or "*narrow*", and will default to "*long*" if it is not set.

```javascript
const era = dateTime.era(type);
```

**Is DST?**

Return *true* if the *DateTime* is in daylight savings.

```javascript
const isDST = dateTime.isDST();
```

**Is Leap Year?**

Return *true* if the year is a leap year.

```javascript
const isLeapYear = dateTime.isLeapYear();
```

**Month Name**

Get the name of the month in current time zone and locale.

- `type` can be either "*long*", "*short*" or "*narrow*", and will default to "*long*" if it is not set.

```javascript
const monthName = dateTime.monthName(type);
```

**Time Zone Name**

Get the name of the current time zone and locale.

- `type` can be either "*long*" or "*short*", and will default to "*long*" if it is not set.

```javascript
const timeZoneName = dateTime.timeZoneName(type);
```

**Weeks In Year**

Get the number of weeks in the current year.

```javascript
const weeksInYear = dateTime.weeksInYear();
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

**Get Default Locale**

Get the default locale.

```javascript
const locale = DateTime.getDefaultLocale();
```

**Get Default Time Zone**

Get the default time zone.

```javascript
const timeZone = DateTime.getDefaultTimeZone();
```

**Is Leap Year?**

Return *true* if the year is a leap year.

- `year` is a number representing the year.

```javascript
const isLeapYear = DateTime.isLeapYear(year);
```

**Set Date Clamping**

Set whether dates will be clamped when changing months.

- `clampDates` is a boolean indicating whether to clamp dates.

```javascript
DateTime.setDateClamping(clampDates);
```

**Set Default Locale**

Set the default locale.

- `locale` is the name of the locale.

```javascript
DateTime.setDefaultLocale(locale);
```

**Set Default Time Zone**

Set the default time zone.

- `timeZone` is the name of the time zone, which can be either "*UTC*", a supported value from the [IANA timeZone database](https://www.iana.org/time-zones) or an offset string.

```javascript
DateTime.setDefaultTimeZone(timeZone);
```

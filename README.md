# FrostDateTime

**FrostDateTime** is a free, open-source date manipulation library for *JavaScript*.

It features full support for PHP DateTime formats, as well as timezones.


## Table of contents
- [Date Creation](#date-creation)
- [Date Output](#date-output)
- [Date Attributes](#date-attributes)
- [ISO Attributes](#iso-attributes)
- [Time Attributes](#time-attributes)
- [UTC Attributes](#utc-attributes)
- [Timezones](#timezones)
- [Timestamps](#timestamps)
- [Utility Methods](#utility-methods)
- [Date Intervals](#date-intervals)



## Date Creation

New dates are created using the following syntax, where `date` is either a timestamp, a date string, or an array of values matching the native Date.UTC method.

If the `timezone` argument is omitted, the users local timezone will be used instead.

```javascript
const date = new DateTime(date, timezone);
```

#### Immutable DateTime

By default, DateTime objects are mutable, but if you wish to create an immutable reference you can use the following syntax.

Immutable DateTime objects return a new DateTimeImmutable whenever they are modified.

```javascript
const date = new DateTimeImmutable(date, timezone);
```

#### From Format

If you wish to parse a date string and you know the exact format, you can use the `fromFormat` static method.

This method functions very differently from the native JS Date parser, and is fully compatible with the PHP [DateTime::createFromFormat();](http://php.net/manual/en/datetime.createfromformat.php) method.

```javascript
const date = DateTime.fromFormat(dateString, format);
```


## Date Output

#### Date Format

Once you have created a DateTime object, you can format it using a specific syntax using the `format` method.

This method is fully compatible with the PHP [date();](http://php.net/manual/en/function.date.php) function.

```javascript
const dateString = date.format(format);
```


## Date Attributes

#### Year

To get the year of a DateTime object according to the current timezone, use the `getFullYear()` method.

```javascript
const year = date.getFullYear();
```

You can also set the year according to the current timezone with the `setFullYear()` method.

The `month` and `date` parameters are optional, and will default to the current values.

```javascript
date.setFullYear(year, month, date);
```

#### Month

To get the month of a DateTime object according to the current timezone, use the `getFullMonth()` method.

The `month` returned will be between 0 (January) and 11 (December).

```javascript
const month = date.getMonth();
```

You can also set the month according to the current timezone with the `setMonth()` method.

The `date` parameters is optional, and will default to the current value.

```javascript
date.setMonth(month, date);
```

#### Date

To get the day of the month for a DateTime object according to the current timezone, use the `getDate()` method.

```javascript
const date = date.getDate();
```

You can also set the date according to the current timezone with the `setDate()` method.

```javascript
date.setDate(date);
```

#### Day Of Week

To get the day of the week for a DateTime object according to the current timezone, use the `getDay()` method.

The `day` returned will be between 0 (Sunday) and 6 (Saturday).

```javascript
const day = date.getDay();
```

You can also set the day of the week according to the current timezone with the `setDay()` method.

```javascript
date.setDay(day);
```

#### Day Of Year

To get the day of the year for a DateTime object according to the current timezone, use the `getDayOfYear()` method.

The `dayOfYear` returned will be between 0 and 365.

```javascript
const dayOfYear = date.getDayOfYear();
```

You can also set the day of the year according to the current timezone with the `setDayOfYear()` method.

```javascript
date.setDayOfYear(dayOfYear);
```

#### Quarter

To get the quarter of the year for a DateTime object according to the current timezone, use the `getQuarter()` method.

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

To get the ISO-8601 year of a DateTime object according to the current timezone, use the following methods.

This method is identical to `getFullYear()` except in cases where the ISO week belongs to the previous or next year, then that value will be used instead.

```javascript
const isoYear = date.getIsoYear();
```

You can also set the ISO-8601 year according to the current timezone with the `setIsoYear()` method.

The `isoWeek` and `isoDay` parameters are optional, and will default to the current values.

```javascript
date.setIsoYear(isoYear, isoWeek, isoDay);
```

#### ISO Week

To get the ISO-8601 week number of year for a DateTime object according to the current timezone, use the following methods.

The `isoWeek` returned will be between 1 and 53 (week staring on Monday).

```javascript
const isoWeek = date.getIsoWeek();
```

You can also set the ISO-8601 week number of year according to the current timezone with the `setIsoWeek()` method.

The `isoDay` parameters is optional, and will default to the current value.

```javascript
date.setIsoWeek(isoWeek, isoDay);
```


#### ISO Day

To get the ISO-8601 day of the week for a DateTime object according to the current timezone, use the `getIsoDay()` method.

The `isoDay` returned will be between 1 (Monday) and 7 (Sunday).

```javascript
const isoDay = date.getIsoDay();
```

You can also set the ISO-8601 day of the week according to the current timezone with the `setIsoDay()` method.

```javascript
date.setIsoDay(isoDay);
```


## Time Attributes

#### Hours

To get the hour of a DateTime object according to the current timezone, use the `getHours()` method.

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

To get the minute of a DateTime object according to the current timezone, use the `getMinutes()` method.

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

To get the second of a DateTime object according to the current timezone, use the `getSeconds()` method.

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

To get the millisecond of a DateTime object according to the current timezone, use the `getMilliseconds()` method.

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

To get the current timezone of a DateTime object, use the `getTimezone()` method.

```javascript
const timezone = date.getTimezone();
```

You can also set the current timezone with the `setTimezone` method.

```javascript
date.setTimezone(timezone);
```

#### Timezone Offset

To get the current timezone offset of a DateTime object, use the `getTimezoneOffset()` method.

```javascript
const offset = date.getTimezoneOffset();
```

```javascript
date.setTimezoneOffset(offset);
```


## Timestamps

```javascript
const time = date.getTime();
```

```javascript
date.setTime(time);
```

```javascript
const timestamp = date.getTimestamp();
```

```javascript
date.setTime(time);
```


## Utility Methods

#### Date Suffix

The `dateSuffix()` method returns the ordinal suffix ('st', 'nd', 'rd', 'th') for the current date.

```javascript
date.dateSuffix();
```

#### Days In Month

The `daysInMonth()` method returns number of days in the current month.

```javascript
date.daysInMonth();
```

#### Days In Year

The `daysInYear()` method returns the number of days in the current year.

```javascript
date.daysInYear();
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

The `isoWeeksInYear()` method returns the number of ISO weeks in the current year.

```javascript
date.isoWeeksInYear();
```

#### Standard Offset

The `standardOffset()` method returns the standard offset (non-daylight savings) for the current timezone.

```javascript
date.standardOffset();
```


## UTC Attributes

```javascript
const utcYear = date.getUTCFullYear();
const utcMonth = date.getUTCMonth();
const utcDate = date.getUTCDate();
const utcDay = date.getUTCDay();
const utcDayOfYear = date.getUTCDayOfYear();
const utcQuarter = date.getUTCQuarter();

const utcIsoYear = date.getUTCIsoYear();
const utcIsoWeek = date.getUTCIsoWeek();
const utcIsoDay = date.getUTCIsoDay();

const utcHours = date.getUTCHours();
const utcMinutes = date.getUTCMinutes();
const utcSeconds = date.getUTCSeconds();
const utcMillis = date.getUTCMilliseconds();
```

```javascript
date.setUTCFullYear(utcYear, utcMonth, utcDate);
date.setUTCMonth(utcMonth, utcDate);
date.setUTCDate(utcDate);
date.setUTCDay(utcDay);
date.setUTCDayOfYear(utcDayOfYear);
date.setUTCQuarter(utcQuarter);

date.setUTCIsoYear(utcIsoYear, utcIsoWeek, utcIsoDay);
date.setUTCIsoWeek(utcIsoWeek, utcIsoDay);
date.setUTCIsoDay(utcIsoDay);

date.setUTCHours(utcHours, utcMinutes, utcSeconds, utcMillis);
date.setUTCMinutes(utcMinutes, utcSeconds, utcMillis);
date.setUTCSeconds(utcSeconds, utcMillis);
date.setUTCMilliseconds(utcMillis);
```


## Date Intervals

```javascript
const interval = new DateInterval('P10DT5H');
```

```javascript
const interval = DateInterval.fromString('5 days');
```

```javascript
date.add(interval);
date.sub(interval);
```

```javascript
date.add('5 months');
date.sub('10 days');
```

```javascript
const diff = date.diff(otherDate, absolute);
```

```javascript
interval.format('%d days, %h hours');
```
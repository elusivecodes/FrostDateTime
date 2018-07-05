# FrostDateTime

**FrostDateTime** is a free, open-source Date manipulation library for *JavaScript*.

It is built as an extension for the **FrostCore** library, and features full support for PHP DateTime formats, as well as timezones.

## Table of contents
- [Basic usage](#basic-usage)
- [DateTime formats](#datetime-formats)
- [Date methods](#date-methods)
- [ISO methods](#iso-methods)
- [Time methods](#time-methods)
- [UTC methods](#utc-methods)
- [Timezones](#timezones)
- [Timestamps](#timestamps)
- [Utility methods](#utility-methods)
- [Date intervals](#date-intervals)



## Basic Usage

```javascript
const date = new frost.DateTime(date, timezone);
```

```javascript
const date = new frost.DateTimeImmutable(date, timezone);
```


## DateTime Formats

```javascript
const date = frost.DateTime.fromFormat(dateString, format);
```

```javascript
const dateString = date.format(format);
```


## Date Methods

```javascript
const year = date.getFullYear();
const month = date.getMonth();
const date = date.getDate();
const dayOfYear = date.getDayOfYear();
const day = date.getDay();
```

```javascript
const monthName = date.getMonthName();
const dayName = date.getDayName();
```

```javascript
date.setFullYear(year);
date.setMonth(month);
date.setDate(date);
date.setDayOfYear(dayOfYear);
date.setDay(day);
```

```javascript
const year = date.year();
const month = date.month();
const date = date.date();
const dayOfYear = date.dayOfYear();
const day = date.day();

date.year(year);
date.month(month);
date.date(date);
date.dayOfYear(dayOfYear);
date.day(day);
```


## ISO Methods

```javascript
const isoYear = date.getIsoYear();
const isoWeek = date.getIsoWeek();
const isoDay = date.getIsoDay();
```

```javascript
date.setIsoYear(isoYear);
date.setIsoWeek(isoWeek);
date.setIsoDay(isoDay);
```


## Time Methods

```javascript
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const millis = date.getMilliseconds();
```

```javascript
date.setHours(hours);
date.setMinutes(minutes);
date.setSeconds(seconds);
date.setMilliseconds(millis);
```


## UTC Methods

```javascript
const utcYear = date.getUTCFullYear();
const utcMonth = date.getUTCMonth();
const utcDate = date.getUTCDate();
const utcDayOfYear = date.getUTCDayOfYear();
const utcDay = date.getUTCDay();
const utcIsoYear = date.getUTCIsoYear();
const utcIsoWeek = date.getUTCIsoWeek();
const utcIsoDay = date.getUTCIsoDay();
const utcHours = date.getUTCHours();
const utcMinutes = date.getUTCMinutes();
const utcSeconds = date.getUTCSeconds();
const utcMillis = date.getUTCMilliseconds();
```

```javascript
date.setUTCFullYear(utcYear);
date.setUTCMonth(utcMonth);
date.setUTCDate(utcDate);
date.setUTCDayOfYear(utcDayOfYear);
date.setUTCDay(utcDay);
date.setUTCIsoYear(utcIsoYear);
date.setUTCIsoWeek(utcIsoWeek);
date.setUTCIsoDay(utcIsoDay);
date.setUTCHours(utcHours);
date.setUTCMinutes(utcMinutes);
date.setUTCSeconds(utcSeconds);
date.setUTCMilliseconds(utcMillis);
```


## Timezones

```javascript
const timezone = date.getTimezone();
const offset = date.getTimezoneOffset();
```

```javascript
date.setTimezone(timezone);
date.setTimezoneOffset(offset);
```


## Timestamps

```javascript
const time = date.getTime();
const timestamp = date.getTimestamp();
```

```javascript
date.setTime(time);
date.setTimestamp(timestamp);
```


## Utility Methods

```javascript
date.dateSuffix();
date.daysInMonth();
date.daysInYear();
date.isDST();
date.isLeapYear();
date.isoWeeksInYear();
date.standardOffset();
```


## Date Intervals

```javascript
const interval = new frost.DateInterval('P10DT5H');
```

```javascript
const interval = frost.DateInterval.fromString('5 days');
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
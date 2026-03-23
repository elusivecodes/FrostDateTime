# FrostDateTime

[![CI](https://github.com/elusivecodes/FrostDateTime/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/elusivecodes/FrostDateTime/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/%40fr0st%2Fdatetime?style=flat-square)](https://www.npmjs.com/package/@fr0st/datetime)
[![npm downloads](https://img.shields.io/npm/dm/%40fr0st%2Fdatetime?style=flat-square)](https://www.npmjs.com/package/@fr0st/datetime)
[![minzipped size](https://img.shields.io/bundlejs/size/%40fr0st/datetime?format=minzip&style=flat-square)](https://bundlejs.com/?q=@fr0st/datetime)
[![license](https://img.shields.io/github/license/elusivecodes/FrostDateTime?style=flat-square)](./LICENSE)

Immutable date and time handling for JavaScript with locale-aware formatting, parsing, calendar math, and IANA or fixed-offset time zones. FrostDateTime works in Node and bundlers, and also ships a browser-friendly UMD bundle that exposes `globalThis.DateTime`.

## Highlights

- Default ESM `DateTime` export for Node and bundlers
- Browser UMD bundle in `dist/` exposed as `globalThis.DateTime`
- No runtime dependencies
- Immutable operations across getters, setters, and date math
- Locale-aware formatting, parsing, relative time, and week rules through `Intl`
- IANA time zones such as `Australia/Brisbane` and fixed offsets such as `+10:00`
- JSDoc-powered IntelliSense

## Installation

### Node / bundlers

```bash
npm i @fr0st/datetime
```

FrostDateTime is ESM-only. Import the default `DateTime` export in Node and bundlers.

```js
import DateTime from '@fr0st/datetime';
```

### Browser (UMD)

Load the bundle from your own copy or a CDN:

```html
<script src="/path/to/dist/frost-datetime.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/@fr0st/datetime@latest/dist/frost-datetime.min.js"></script>
<script>
    const date = DateTime.now({ timeZone: 'UTC' });
    console.log(date.toISOString());
</script>
```

## Quick Start

```js
import DateTime from '@fr0st/datetime';

const meeting = DateTime.fromFormat(
    'yyyy-MM-dd HH:mm:ss',
    '2026-03-23 09:30:00',
    { timeZone: 'Australia/Brisbane' },
);

const nextWeek = meeting.addWeeks(1);

nextWeek.toString();
// Mon Mar 30 2026 09:30:00 +1000 (Australia/Brisbane)

nextWeek.setTimeZone('UTC').toISOString();
// 2026-03-29T23:30:00.000+00:00

nextWeek.monthName();
// March
```

TypeScript note: FrostDateTime is written in JavaScript and uses JSDoc types, which most editors surface as IntelliSense.

## Date Model

FrostDateTime revolves around an immutable `DateTime` class and a small set of predictable parsing and formatting rules.

- Every setter and manipulation method returns a new instance
- Constructor numbers are milliseconds since the UNIX epoch
- `fromTimestamp()` and `setTimestamp()` use seconds since the UNIX epoch
- Strings without a zone designator are interpreted in the requested or default time zone
- Week calculations such as `getWeek()`, `getWeekYear()`, `setWeekYear()`, and `weeksInYear()` use the active locale's week rules

```js
const a = DateTime.fromArray([2026, 3, 23]);
const b = a.addDays(1);

a.toISOString(); // 2026-03-23T00:00:00.000+00:00
b.toISOString(); // 2026-03-24T00:00:00.000+00:00

new DateTime('January 1, 2019 00:00:00', { timeZone: 'Australia/Brisbane' })
    .toISOString();
// 2018-12-31T14:00:00.000+00:00
```

## API

FrostDateTime exports a default `DateTime` class from `@fr0st/datetime`.

### Creating dates

All creation methods accept an optional options object:

```ts
{
    timeZone?: string;
    locale?: string;
}
```

- `new DateTime(date?, options?)`: create from now, milliseconds, or a string accepted by `Date.parse()`
- `DateTime.fromArray(dateArray, options?)`: create from `[year, month, date, hours, minutes, seconds, milliseconds]`
- `DateTime.fromDate(date, options?)`: wrap a native `Date`
- `DateTime.fromFormat(formatString, dateString, options?)`: parse a string with a known token pattern
- `DateTime.fromISOString(dateString, options?)`: parse `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`
- `DateTime.fromTimestamp(timestamp, options?)`: create from seconds since the UNIX epoch
- `DateTime.now(options?)`: create the current time

```js
const now = new DateTime();
const fromMillis = new DateTime(1711152000000);
const fromArray = DateTime.fromArray([2026, 3, 23, 9, 30], {
    timeZone: 'Europe/London',
});
const fromFormat = DateTime.fromFormat(
    'dd/MM/yyyy HH:mm:ss',
    '23/03/2026 09:30:00',
    { timeZone: 'Australia/Brisbane' },
);
```

`fromFormat()` and `fromISOString()` can return an invalid `DateTime` when the text parses structurally but the calendar values are impossible.

```js
const invalid = DateTime.fromFormat('yyyy-MM-dd', '2019-02-31');
invalid.isValid; // false
```

`fromFormat()` does not support narrow month parsing tokens `MMMMM` and `LLLLL`; those tokens are output-only.

Format tokens are documented in [Formats.md](./Formats.md).

### Formatting and output

- `format(formatString)`: format with FrostDateTime's token set
- `toString()`: `eee MMM dd yyyy HH:mm:ss xx (VV)`
- `toDateString()`: `eee MMM dd yyyy`
- `toTimeString()`: `HH:mm:ss xx (VV)`
- `toISOString()`: `yyyy-MM-dd'T'HH:mm:ss.SSSxxx` in English and UTC
- `toJSON()`: same UTC ISO string for valid dates, `null` for invalid dates
- `toUTCString()`: `toString()` shape in English and UTC

```js
const date = DateTime.fromArray([2026, 3, 23, 9, 30, 15], {
    timeZone: 'Australia/Brisbane',
});

date.format('eee MMM dd yyyy HH:mm:ss xxx (VV)');
// Mon Mar 23 2026 09:30:15 +10:00 (Australia/Brisbane)
```

Supported format tokens are listed in [Formats.md](./Formats.md).

### Locale and time-zone helpers

Relevant instance methods:

- `getLocale()`
- `setLocale(locale)`
- `getTimeZone()`
- `getTimeZoneOffset()`
- `setTimeZone(timeZone)`
- `setTimeZoneOffset(offsetMinutes)`
- `dayName(type?)`
- `dayPeriod(type?)`
- `monthName(type?)`
- `era(type?)`
- `timeZoneName(type?)`

Accepted time-zone formats:

- IANA names such as `UTC`, `Europe/London`, and `America/New_York`
- Numeric offsets such as `+10:00`, `+1000`, and `-05:30`
- GMT offsets such as `GMT+10:00`

```js
const brisbane = DateTime.fromArray([2026, 3, 23, 9, 30], {
    timeZone: 'Australia/Brisbane',
});

brisbane.setTimeZone('UTC').toISOString();
// 2026-03-22T23:30:00.000+00:00

DateTime.fromArray([2026, 3, 23], { locale: 'ar-eg' }).toDateString();
```

### Getters and setters

#### Calendar fields

| Value | Getter | Setter |
| --- | --- | --- |
| day of month | `getDate()` | `setDate(date)` |
| day of week (`0-6`, Sunday-based) | `getDay()` | `setDay(day)` |
| day of year | `getDayOfYear()` | `setDayOfYear(dayOfYear)` |
| month (`1-12`) | `getMonth()` | `setMonth(month, date?)` |
| quarter (`1-4`) | `getQuarter()` | `setQuarter(quarter)` |
| year | `getYear()` | `setYear(year, month?, date?)` |

#### Week fields

| Value | Getter | Setter |
| --- | --- | --- |
| locale-aware week of year | `getWeek()` | `setWeek(week, day?)` |
| locale-aware day of week (`1-7`) | `getWeekDay()` | `setWeekDay(day)` |
| week day in month | `getWeekDayInMonth()` | `setWeekDayInMonth(week)` |
| week of month | `getWeekOfMonth()` | `setWeekOfMonth(week)` |
| locale-aware week year | `getWeekYear()` | `setWeekYear(year, week?, day?)` |

#### Time fields

| Value | Getter | Setter |
| --- | --- | --- |
| hour | `getHours()` | `setHours(hours, minutes?, seconds?, milliseconds?)` |
| minute | `getMinutes()` | `setMinutes(minutes, seconds?, milliseconds?)` |
| second | `getSeconds()` | `setSeconds(seconds, milliseconds?)` |
| millisecond | `getMilliseconds()` | `setMilliseconds(milliseconds)` |
| seconds since UNIX epoch | `getTimestamp()` | `setTimestamp(timestamp)` |
| milliseconds since UNIX epoch | `getTime()` | `setTime(time)` |

### Manipulation

#### Add and subtract

| Add | Subtract |
| --- | --- |
| `addDay()` / `addDays(amount)` | `subDay()` / `subDays(amount)` |
| `addWeek()` / `addWeeks(amount)` | `subWeek()` / `subWeeks(amount)` |
| `addMonth()` / `addMonths(amount)` | `subMonth()` / `subMonths(amount)` |
| `addYear()` / `addYears(amount)` | `subYear()` / `subYears(amount)` |
| `addHour()` / `addHours(amount)` | `subHour()` / `subHours(amount)` |
| `addMinute()` / `addMinutes(amount)` | `subMinute()` / `subMinutes(amount)` |
| `addSecond()` / `addSeconds(amount)` | `subSecond()` / `subSeconds(amount)` |

#### Boundaries

| Start | End |
| --- | --- |
| `startOfDay()` | `endOfDay()` |
| `startOfWeek()` | `endOfWeek()` |
| `startOfMonth()` | `endOfMonth()` |
| `startOfQuarter()` | `endOfQuarter()` |
| `startOfYear()` | `endOfYear()` |
| `startOfHour()` | `endOfHour()` |
| `startOfMinute()` | `endOfMinute()` |
| `startOfSecond()` | `endOfSecond()` |

### Differences and comparisons

#### Numeric differences

- `diff(other)`: milliseconds
- `diffInDays(other, options?)`
- `diffInWeeks(other, options?)`
- `diffInMonths(other, options?)`
- `diffInYears(other, options?)`
- `diffInHours(other, options?)`
- `diffInMinutes(other, options?)`
- `diffInSeconds(other, options?)`

`options.relative` defaults to `true` for unit-based differences.

```js
const a = DateTime.fromArray([2026, 3, 23]);
const b = DateTime.fromArray([2026, 3, 30]);

a.diffInDays(b); // -7
```

#### Human-readable differences

- `humanDiff(other)`
- `humanDiffInDays(other)`
- `humanDiffInWeeks(other)`
- `humanDiffInMonths(other)`
- `humanDiffInYears(other)`
- `humanDiffInHours(other)`
- `humanDiffInMinutes(other)`
- `humanDiffInSeconds(other)`

```js
DateTime.fromArray([2026, 3, 30]).humanDiff(DateTime.fromArray([2026, 3, 23]));
// "in 7 days"
```

#### Boolean comparisons

Base comparisons:

- `isAfter(other)`
- `isBefore(other)`
- `isBetween(start, end)`
- `isSame(other)`
- `isSameOrAfter(other)`
- `isSameOrBefore(other)`

Scoped comparisons exist for these units:

- `Day`
- `Week`
- `Month`
- `Year`
- `Hour`
- `Minute`
- `Second`

Examples:

- `isAfterDay(other)`
- `isBetweenMonth(start, end)`
- `isSameWeek(other)`
- `isSameOrBeforeYear(other)`

### Utility methods

#### Instance helpers

- `daysInMonth()`
- `daysInYear()`
- `weeksInYear()`
- `isLeapYear()`
- `isDst()`

#### Static helpers

- `DateTime.dayOfYear(year, month, date)`
- `DateTime.daysInMonth(year, month)`
- `DateTime.daysInYear(year)`
- `DateTime.isLeapYear(year)`

### Global configuration

These affect new instances when you do not pass explicit options:

- `DateTime.getDefaultLocale()`
- `DateTime.setDefaultLocale(locale)`
- `DateTime.getDefaultTimeZone()`
- `DateTime.setDefaultTimeZone(timeZone)`
- `DateTime.setDateClamping(enabled)`
- `DateTime.clearDataCache()`

```js
DateTime.setDateClamping(true);
DateTime.clearDataCache();
```

## Behavior Notes

- Constructor-based parsing throws on invalid strings or unsupported time zones.
- `fromFormat()` rejects trailing characters and marks impossible parsed dates as `isValid === false`.
- `fromISOString()` parses the RFC 3339 / ISO-style shape used by `toISOString()`.
- `toJSON()` returns the same value as `toISOString()` for valid dates and `null` for invalid dates.
- `setTimeZone()` keeps the same instant and changes representation.
- `setTimeZoneOffset()` returns a fixed-offset view of the same instant.
- Date clamping controls whether month and year changes clamp invalid dates.
- `DateTime.clearDataCache()` clears cached formatter and locale data, which is mainly useful in tests and long-lived processes.

## Development

```bash
npm test
npm run js-lint
npm run build
```

## License

FrostDateTime is released under the [MIT License](./LICENSE).

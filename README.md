# Frost DateTime

[![CI](https://github.com/frost-js/datetime/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/frost-js/datetime/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/frost-js/datetime/branch/main/graph/badge.svg)](https://codecov.io/gh/frost-js/datetime)
[![npm version](https://img.shields.io/npm/v/%40fr0st%2Fdatetime?style=flat-square)](https://www.npmjs.com/package/@fr0st/datetime)
[![npm downloads](https://img.shields.io/npm/dm/%40fr0st%2Fdatetime?style=flat-square)](https://www.npmjs.com/package/@fr0st/datetime)
[![JS gzip size](https://img.badgesize.io/frost-js/datetime/main/dist/frost-datetime.min.js?compression=gzip&label=JS%20gzip%20size&style=flat-square)](https://github.com/frost-js/datetime/blob/main/dist/frost-datetime.min.js)
[![license](https://img.shields.io/github/license/frost-js/datetime?style=flat-square)](./LICENSE)

Immutable date and time handling for JavaScript with locale-aware formatting, parsing, calendar math, and IANA or fixed-offset time zones. Frost DateTime works in Node and bundlers, and also ships a browser-friendly UMD bundle that exposes `globalThis.DateTime`.

## Highlights

- Default ESM `DateTime` export for Node and bundlers
- Prebuilt ESM and UMD bundles in `dist/`
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

Frost DateTime's package entry point is ESM-only. Import the default `DateTime` export in Node and bundlers.

```js
import DateTime from '@fr0st/datetime';
```

### Browser (ESM)

Import the minified ESM bundle directly from a CDN:

```html
<script type="module">
    import DateTime from 'https://cdn.jsdelivr.net/npm/@fr0st/datetime@latest/dist/frost-datetime.esm.min.js';

    const date = DateTime.now({ timeZone: 'UTC' });
    console.log(date.toIsoString());
</script>
```

### Browser (UMD)

Load the bundle from your own copy or a CDN:

```html
<script src="/path/to/dist/frost-datetime.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/@fr0st/datetime@latest/dist/frost-datetime.min.js"></script>
<script>
    const date = globalThis.DateTime.now({ timeZone: 'UTC' });
    console.log(date.toIsoString());
</script>
```

The package root resolves to the prebuilt ESM bundle. Published files under `dist/` and `src/` are also available through matching package subpaths.

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

nextWeek.toIsoString();
// 2026-03-29T23:30:00.000+00:00

nextWeek.monthName();
// March
```

TypeScript note: Frost DateTime is written in JavaScript and uses JSDoc types, which most editors surface as IntelliSense.

## Date Model

Frost DateTime revolves around an immutable `DateTime` class and a small set of predictable parsing and formatting rules.

- Every setter and manipulation method returns a new instance
- Constructor numbers are milliseconds since the UNIX epoch
- `fromTimestamp()` and `withTimestamp()` use seconds since the UNIX epoch
- Strings without a zone designator are interpreted in the requested or default time zone
- Strings with an explicit zone or offset define an instant; `options.timeZone` only changes its representation
- Calendar fields and localized date names use the Gregorian calendar
- Week calculations such as `getWeek()`, `getWeekYear()`, `withWeekYear()`, and `weeksInYear()` use the active locale's week rules, including Unicode `rg` region overrides

```js
const a = DateTime.fromArray([2026, 3, 23], { timeZone: 'UTC' });
const b = a.addDays(1);

a.toIsoString(); // 2026-03-23T00:00:00.000+00:00
b.toIsoString(); // 2026-03-24T00:00:00.000+00:00

new DateTime('January 1, 2019 00:00:00', { timeZone: 'Australia/Brisbane' })
    .toIsoString();
// 2018-12-31T14:00:00.000+00:00
```

## API

Frost DateTime exports a default `DateTime` class from `@fr0st/datetime`.

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

For constructor strings, an explicit `Z` or numeric offset defines the instant. Passing a different `options.timeZone` changes only how that instant is represented. Supported unzoned ISO forms are interpreted as wall time in the requested or default time zone:

- `yyyy`
- `yyyy-MM`
- `yyyy-MM-dd`
- `yyyy-MM-dd HH:mm[:ss[.fraction]]`
- `yyyy-MM-ddTHH:mm[:ss[.fraction]]`

Omitted month and day fields default to `1`, and omitted time fields default to local midnight. Other accepted string shapes are parsed through `Date.parse()`; unzoned results are likewise interpreted as local wall time in the requested or default time zone.

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

Exactly two input digits parsed with `y`, `yy`, `Y`, or `YY` use ICU's moving 100-year window. The window starts 80 calendar years before the UTC reference time captured at the beginning of each `fromFormat()` call. The complete parsed date, including its time and offset, determines the century at the boundary. Week dates retain their locale-specific week number and weekday when the century changes.

Single-digit and longer input years are interpreted literally. Patterns with three or more year letters (`yyy`, `yyyy`, `YYY`, `YYYY`, etc.) also interpret the year literally.

A time-only `fromFormat()` pattern starts from January 1, 1970 in the requested local time zone. Directly adjacent numeric tokens consume their pattern widths exactly, so compact fixed-width patterns can be parsed; standalone numeric tokens are not capped at the pattern width:

```js
DateTime.fromFormat('yyyyMMddHHmmss', '20190102123456');
```

`fromFormat()` rejects output-only or intentionally unsupported token widths.

Format tokens are documented in [Formats.md](./Formats.md).

### Formatting and output

- `format(formatString)`: format with Frost DateTime's token set
- `toString()`: `eee MMM dd yyyy HH:mm:ss xx (VV)`
- `toDateString()`: `eee MMM dd yyyy`
- `toTimeString()`: `HH:mm:ss xx (VV)`
- `toIsoString()`: `yyyy-MM-dd'T'HH:mm:ss.SSSxxx` in English and UTC
- `toJSON()`: same UTC ISO string for valid dates, `null` for invalid dates
- `toUTCString()`: `toString()` shape in English and UTC

```js
const date = DateTime.fromArray([2026, 3, 23, 9, 30, 15], {
    locale: 'en',
    timeZone: 'Australia/Brisbane',
});

date.format('eee MMM dd yyyy HH:mm:ss xxx (VV)');
// Mon Mar 23 2026 09:30:15 +10:00 (Australia/Brisbane)
```

Supported format tokens are listed in [Formats.md](./Formats.md).

### Locale and time-zone helpers

Relevant instance methods:

- `getLocale()`
- `withLocale(locale)`
- `getTimeZone()`
- `getTimeZoneOffset()`
- `withTimeZone(timeZone)`
- `withTimeZoneOffset(offsetMinutes)`
- `dayName(type?)`
- `dayPeriod(type?)`
- `monthName(type?)`
- `era(type?)`
- `timeZoneName(type?)`

Accepted time-zone formats:

- IANA names such as `UTC`, `Europe/London`, and `America/New_York`
- Numeric offsets in `±HH`, `±HHMM`, `±HH:MM`, `±HHMMSS`, or `±HH:MM:SS` form
- The same numeric forms prefixed with `GMT`, such as `GMT+10:00`

The absolute fixed offset must be less than 24 hours and have whole-second precision. `getTimeZoneOffset()` and `withTimeZoneOffset()` use the native `Date#getTimezoneOffset()` sign convention: a `UTC-10:00` zone reports `600`, while `UTC+10:00` reports `-600`. Fractional minutes can represent whole seconds, such as `31 / 60` for 31 seconds.

```js
const brisbane = DateTime.fromArray([2026, 3, 23, 9, 30], {
    timeZone: 'Australia/Brisbane',
});

brisbane.withTimeZone('UTC').toString();
// Sun Mar 22 2026 23:30:00 +0000 (UTC)

DateTime.fromArray([2026, 3, 23], { locale: 'ar-eg' }).toDateString();
```

### Getters and copy methods

#### Calendar fields

| Value | Getter | With |
| --- | --- | --- |
| day of month | `getDate()` | `withDate(date)` |
| day of week (`0-6`, Sunday-based) | `getDay()` | `withDay(day)` |
| day of year | `getDayOfYear()` | `withDayOfYear(dayOfYear)` |
| month (`1-12`) | `getMonth()` | `withMonth(month, date?)` |
| quarter (`1-4`) | `getQuarter()` | `withQuarter(quarter)` |
| year | `getYear()` | `withYear(year, month?, date?)` |

#### Week fields

| Value | Getter | With |
| --- | --- | --- |
| locale-aware week of year | `getWeek()` | `withWeek(week, day?)` |
| locale-aware day of week (`1-7`) | `getWeekDay()` | `withWeekDay(day)` |
| week day in month | `getWeekDayInMonth()` | `withWeekDayInMonth(week)` |
| week of month | `getWeekOfMonth()` | `withWeekOfMonth(week)` |
| locale-aware week year | `getWeekYear()` | `withWeekYear(year, week?, day?)` |

`getWeekDayInMonth()` counts occurrences of the current weekday within the month (`1-5`). `getWeekOfMonth()` follows the locale's first weekday and minimum days in the first week; an opening partial week can be week `0`, as with January 1, 2021 in `en-GB`.

#### Time fields

| Value | Getter | With |
| --- | --- | --- |
| hour | `getHours()` | `withHours(hours, minutes?, seconds?, milliseconds?)` |
| minute | `getMinutes()` | `withMinutes(minutes, seconds?, milliseconds?)` |
| second | `getSeconds()` | `withSeconds(seconds, milliseconds?)` |
| millisecond | `getMilliseconds()` | `withMilliseconds(milliseconds)` |
| seconds since UNIX epoch | `getTimestamp()` | `withTimestamp(timestamp)` |
| milliseconds since UNIX epoch | `getTime()` | `withTime(time)` |

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

`options.relative` defaults to `true` for unit-based differences and compares calendar boundaries. For days and weeks, this uses local calendar dates and locale-aware week starts rather than elapsed 24-hour periods. Set `relative: false` to count completed elapsed units instead.

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
const earlier = DateTime.fromArray([2026, 3, 23], {
    locale: 'en',
    timeZone: 'UTC',
});

earlier.addWeeks(1).humanDiff(earlier);
// "next week"
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
- Copies and arithmetic preserve `isValid`; invalid dates remain invalid.
- `fromISOString()` parses the RFC 3339 / ISO-style shape used by `toIsoString()`.
- `toIsoString()` always returns a UTC string regardless of the instance time zone.
- `toJSON()` returns the same value as `toIsoString()` for valid dates and `null` for invalid dates.
- `withTimeZone()` keeps the same instant and changes representation.
- `withTimeZoneOffset()` returns a fixed-offset view of the same instant.
- A nonexistent local wall time moves forward to the next valid time, while a repeated wall time uses the later occurrence.
- Calendar addition and subtraction across a fully deleted day follow the operation direction.
- Date clamping controls whether month and year changes clamp invalid dates.
- `DateTime.clearDataCache()` clears cached formatter and locale data, which is mainly useful in tests and long-lived processes.

## Development

```bash
npm test
npm run lint
npm run build
```

## License

Frost DateTime is released under the [MIT License](./LICENSE).

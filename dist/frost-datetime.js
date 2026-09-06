(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =  factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.DateTime = factory()));
})(this, function() {
//#region src/factory.js
/**
	* DateTime Factory
	*/
	var data = /* @__PURE__ */ new Map();
	/**
	* Clears all cached formatter and locale values.
	*/
	function clearDataCache() {
		data.clear();
	}
	/**
	* Gets a cached value, creating it on first access.
	* @template T
	* @param {string} key The key for the values.
	* @param {() => T} callback The callback to generate the values.
	* @returns {T} The cached value.
	*/
	function getData(key, callback) {
		if (!data.has(key)) data.set(key, callback());
		return data.get(key);
	}
	/**
	* Creates a date formatter for a time zone.
	* @param {string} timeZone The time zone.
	* @returns {Intl.DateTimeFormat} The formatter instance.
	*/
	function getDateFormatter(timeZone) {
		return getData(`dateFormatter.${timeZone}`, () => makeFormatter("en", {
			timeZone,
			hourCycle: "h23",
			era: "short",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			fractionalSecondDigits: 3
		}));
	}
	/**
	* Creates a relative-time formatter for a locale.
	* @param {string} locale The locale.
	* @returns {Intl.RelativeTimeFormat|null} The formatter instance, or null when unsupported.
	*/
	function getRelativeFormatter(locale) {
		if (!("RelativeTimeFormat" in Intl)) return null;
		return getData(`relativeFormatter.${locale}`, () => new Intl.RelativeTimeFormat(locale, {
			numeric: "auto",
			style: "long"
		}));
	}
	/**
	* Creates a formatter for a locale.
	* @param {string} locale The locale.
	* @param {Intl.DateTimeFormatOptions} options The options for the formatter.
	* @returns {Intl.DateTimeFormat} The formatter instance.
	*/
	function makeFormatter(locale, options) {
		return new Intl.DateTimeFormat(locale, {
			timeZone: "UTC",
			...options,
			calendar: "gregory"
		});
	}

//#endregion
//#region src/vars.js
/**
	* DateTime Variables
	*/
	var resolvedOptions = new Intl.DateTimeFormat().resolvedOptions();
	var config = {
		clampDates: true,
		defaultLocale: resolvedOptions.locale,
		defaultTimeZone: resolvedOptions.timeZone
	};
	var dateStringTimeZoneRegExp = /(?:\b(?:UTC|GMT)\b|[T\s]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?\s*(?:Z|[+-]\d{2}(?::?\d{2})?)\b)/i;
	var formats = {
		date: "eee MMM dd yyyy",
		rfc3339_extended: `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`,
		string: "eee MMM dd yyyy HH:mm:ss xx (VV)",
		time: "HH:mm:ss xx (VV)"
	};
	var formatTokenRegExp = /([a-z])\1*|''|'(?:[^']|'')*'/i;
	var monthDays = [
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	var offsetRegExp = /^(?:GMT)?([+-])([01]\d|2[0-3])(?:(:?)([0-5]\d)(?:\3([0-5]\d))?)?$/;
	var parseOrderKeys = [
		"year",
		"weekYear",
		"era",
		"quarter",
		"month",
		"week",
		"dayOfYear",
		"date",
		"weekOfMonth",
		"weekDay",
		"weekDayInMonth",
		"hours24",
		"hours12",
		"dayPeriod",
		"minutes",
		"seconds",
		"milliseconds"
	];
	var diffMethods = {
		year: "diffInYears",
		month: "diffInMonths",
		week: "diffInWeeks",
		day: "diffInDays",
		hour: "diffInHours",
		minute: "diffInMinutes",
		second: "diffInSeconds"
	};
	var thresholds = {
		month: 12,
		week: null,
		day: 7,
		hour: 24,
		minute: 60,
		second: 60
	};

//#endregion
//#region src/helpers.js
/** @import DateTime from './date-time.js' */
	/**
	* @typedef {{key: string, value: number|string, literal: string, token: string, length: number}} ParsedDateValue
	*/
	/**
	* DateTime Helpers
	*/
	/**
	* Applies parsed fields in calendar order and validates their final values.
	* @param {DateTime} datetime The base date.
	* @param {ParsedDateValue[]} values The parsed fields.
	* @returns {DateTime} The parsed date.
	*/
	function applyDateValues(datetime, values) {
		const methods = parseFactory({ weekDayWithinMonth: values.some(({ key }) => key === "weekDayInMonth") && !values.some(({ key }) => key === "week" || key === "weekOfMonth") });
		const testValues = [];
		for (const parseKey of parseOrderKeys) {
			if (parseKey === "era" && !values.some((data) => data.key === "year")) continue;
			for (const data of values) {
				const { key, value } = data;
				if (key !== parseKey) continue;
				datetime = methods[key].set(datetime, value);
				testValues.push(data);
			}
		}
		datetime.isValid = testValues.every(({ key, value }) => methods[key].get(datetime) === value);
		return datetime;
	}
	/**
	* Escapes a string for safe use inside a RegExp source.
	* @param {string} value The string to escape.
	* @returns {string} The escaped string.
	*/
	function escapeRegExp(value) {
		return value.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
	}
	/**
	* Gets a stable day number from a DateTime's local calendar fields.
	* @param {DateTime} date The DateTime.
	* @returns {number} The local calendar day number.
	*/
	function calendarDay(date) {
		const calendarDate = /* @__PURE__ */ new Date(0);
		calendarDate.setUTCFullYear(date.getYear(), date.getMonth() - 1, date.getDate());
		return calendarDate.getTime() / 864e5;
	}
	/**
	* Calculates the difference between two dates in a given time unit.
	* @param {DateTime} date The base DateTime.
	* @param {DateTime} other The DateTime to compare to.
	* @param {'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'} timeUnit The time unit to compare in.
	* @param {boolean} [relative=true] Whether to use relative boundaries when calculating the difference.
	* @returns {number} The difference between the dates in the given time unit.
	*/
	function calculateDiff(date, other, timeUnit, relative = true) {
		if (relative || timeUnit === "year" || timeUnit === "month") other = other.withTimeZone(date.getTimeZone());
		switch (timeUnit) {
			case "year": return compensateDiff(date, other.withYear(date.getYear()), date.getYear() - other.getYear(), !relative, -1);
			case "month": return compensateDiff(date, other.withYear(date.getYear(), date.getMonth()), (date.getYear() - other.getYear()) * 12 + date.getMonth() - other.getMonth(), !relative, -1);
			case "week":
				if (relative) {
					const dateWeek = date.startOfWeek();
					const otherWeek = other.withLocale(date.getLocale()).startOfWeek();
					return (calendarDay(dateWeek) - calendarDay(otherWeek)) / 7;
				}
				return Math.trunc((date - other) / 6048e5);
			case "day":
				if (relative) return calendarDay(date) - calendarDay(other);
				return Math.trunc((date - other) / 864e5);
			case "hour":
				if (!relative) return Math.trunc((date - other) / 36e5);
				return compensateDiff(date, other.withYear(date.getYear(), date.getMonth(), date.getDate()).withHours(date.getHours()), (date - other) / 36e5);
			case "minute":
				if (!relative) return Math.trunc((date - other) / 6e4);
				return compensateDiff(date, other.withYear(date.getYear(), date.getMonth(), date.getDate()).withHours(date.getHours(), date.getMinutes()), (date - other) / 6e4);
			case "second":
				if (!relative) return Math.trunc((date - other) / 1e3);
				return compensateDiff(date, other.withYear(date.getYear(), date.getMonth(), date.getDate()).withHours(date.getHours(), date.getMinutes(), date.getSeconds()), (date - other) / 1e3);
			default: throw new Error("Invalid time unit supplied");
		}
	}
	/**
	* Gets the RegExp for a list of string values.
	* Longer values are matched first to avoid prefix collisions.
	* @param {string[]} values The values to include in the RegExp.
	* @returns {string} The values RegExp.
	*/
	function valuesRegExp(values) {
		return values.slice().sort((a, b) => b.length - a.length).map((value) => escapeRegExp(`${value}`)).join("|");
	}
	/**
	* Compensates the difference between two dates.
	* @param {DateTime} date The DateTime.
	* @param {DateTime} other The DateTime to compare to.
	* @param {number} amount The amount to compensate.
	* @param {boolean} [compensate=true] Whether to compensate the amount.
	* @param {number} [compensation=1] The compensation offset.
	* @returns {number} The compensated amount.
	*/
	function compensateDiff(date, other, amount, compensate = true, compensation = 1) {
		if (amount > 0) {
			amount = Math.floor(amount);
			if (compensate && date < other) amount += compensation;
		} else if (amount < 0) {
			amount = Math.ceil(amount);
			if (compensate && date > other) amount -= compensation;
		}
		return amount;
	}
	/**
	* Gets the biggest difference between two dates.
	* @param {DateTime} date The DateTime.
	* @param {DateTime} [other] The DateTime to compare to.
	* @returns {[number, string]} The biggest difference (amount and time unit).
	*/
	function getBiggestDiff(date, other) {
		let lastResult;
		for (const [timeUnit, diffMethod] of Object.entries(diffMethods)) {
			const relativeDiff = date[diffMethod](other);
			if (lastResult && thresholds[timeUnit] && Math.abs(relativeDiff) >= thresholds[timeUnit]) return lastResult;
			if (date[diffMethod](other, { relative: false })) return [relativeDiff, timeUnit];
			if (relativeDiff) lastResult = [relativeDiff, timeUnit];
			else lastResult = null;
		}
		return lastResult ? lastResult : [0, "second"];
	}
	/**
	* Gets the offset for a DateTime.
	* @param {DateTime} date The DateTime.
	* @returns {number} The offset.
	*/
	function getOffset(date) {
		const timeZone = date.getTimeZone();
		if (timeZone === "UTC") return 0;
		const values = Object.fromEntries(getDateFormatter(timeZone).formatToParts(date).filter((part) => part.type !== "literal").map(({ type, value }) => [type, value]));
		let year = parseInt(values.year, 10);
		if (values.era === "BC") year = 1 - year;
		const localDate = /* @__PURE__ */ new Date(0);
		localDate.setUTCFullYear(year, parseInt(values.month, 10) - 1, parseInt(values.day, 10));
		const localTime = localDate.setUTCHours(parseInt(values.hour, 10), parseInt(values.minute, 10), parseInt(values.second, 10), parseInt(values.fractionalSecond, 10));
		return (date.getTime() - localTime) / 6e4;
	}
	/**
	* Gets the number of milliseconds since the UNIX epoch (offset to timeZone).
	* @param {DateTime} date The DateTime.
	* @returns {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
	*/
	function getOffsetTime(date) {
		return date.getTime() - date.getTimeZoneOffset() * 6e4;
	}
	/**
	* Compares a literal format string with a date string.
	* @param {string} formatString The literal format string.
	* @param {string} dateString The date string.
	*/
	function parseCompare(formatString, dateString) {
		let i = 0;
		for (const char of formatString) {
			if (char !== dateString[i]) throw new Error(`Unmatched character in DateTime string: ${char}`);
			i++;
		}
	}
	/**
	* Resolves two-digit years in a moving century window and applies parsed fields.
	* The window starts 80 calendar years before the reference time in UTC.
	* @param {DateTime} baseDate The base date in the parsing locale and time zone.
	* @param {ParsedDateValue[]} values The parsed fields.
	* @param {number} referenceTime The epoch milliseconds captured when parsing began.
	* @returns {DateTime} The parsed date.
	*/
	function parseDateValues(baseDate, values, referenceTime) {
		const shortYears = values.filter(({ key, literal, length }) => (key === "year" || key === "weekYear") && length <= 2 && Array.from(literal).length === 2);
		let centuryStart = null;
		let startYear;
		if (shortYears.length) {
			centuryStart = new Date(referenceTime);
			startYear = centuryStart.getUTCFullYear() - 80;
			const month = centuryStart.getUTCMonth();
			const day = Math.min(centuryStart.getUTCDate(), baseDate.constructor.daysInMonth(startYear, month + 1));
			centuryStart.setUTCFullYear(startYear, month, day);
			for (const data of shortYears) data.value += Math.floor(startYear / 100) * 100 + (data.value < startYear % 100 ? 100 : 0);
		}
		let datetime = applyDateValues(baseDate, values);
		if (centuryStart && datetime < centuryStart) {
			const boundaryYears = shortYears.filter(({ value }) => value === startYear);
			if (boundaryYears.length) {
				for (const data of boundaryYears) data.value += 100;
				datetime = applyDateValues(baseDate, values);
			}
		}
		return datetime;
	}
	/**
	* Parses a supported unzoned ISO string as a neutral wall-clock timestamp.
	* @param {string} dateString The date string to parse.
	* @returns {number|null} The timestamp, or null if the shape is not supported.
	*/
	function parseLocalTimestamp(dateString) {
		const match = dateString.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/) || dateString.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?$/);
		if (!match) return null;
		const [, year, month = 1, day = 1, hours = 0, minutes = 0, seconds = 0, fraction = ""] = match;
		const date = /* @__PURE__ */ new Date(0);
		date.setUTCFullYear(year, month - 1, day);
		date.setUTCHours(hours, minutes, seconds, fraction.padEnd(3, "0").substring(0, 3));
		return date.getTime();
	}
	/**
	* Generates methods for parsing a date.
	* @param {object} [options={}] The parsing options.
	* @param {boolean} [options.weekDayWithinMonth=false] Whether to select the first weekday occurrence in the month.
	* @returns {Record<string, {get: Function, set: Function}>} An object containing date parsing methods.
	*/
	function parseFactory({ weekDayWithinMonth = false } = {}) {
		let isPM = false;
		let lastAM = true;
		return {
			date: {
				get: (datetime) => datetime.getDate(),
				set: (datetime, value) => datetime.withDate(value)
			},
			dayPeriod: {
				get: (datetime) => datetime.getHours() < 12 ? 0 : 1,
				set: (datetime, value) => {
					isPM = value;
					let hours = value ? 12 : 0;
					if (lastAM) hours += datetime.getHours();
					return datetime.withHours(hours);
				}
			},
			dayOfYear: {
				get: (datetime) => datetime.getDayOfYear(),
				set: (datetime, value) => datetime.withDayOfYear(value)
			},
			era: {
				get: (datetime) => datetime.getYear() < 0 ? 0 : 1,
				set: (datetime, value) => {
					const offset = value ? 1 : -1;
					return datetime.withYear(datetime.getYear() * offset);
				}
			},
			hours12: {
				get: (datetime) => datetime.getHours() % 12,
				set: (datetime, value) => {
					if (isPM) value += 12;
					lastAM = true;
					return datetime.withHours(value);
				}
			},
			hours24: {
				get: (datetime) => datetime.getHours(),
				set: (datetime, value) => {
					lastAM = false;
					return datetime.withHours(value);
				}
			},
			milliseconds: {
				get: (datetime) => datetime.getMilliseconds(),
				set: (datetime, value) => datetime.withMilliseconds(value)
			},
			minutes: {
				get: (datetime) => datetime.getMinutes(),
				set: (datetime, value) => datetime.withMinutes(value)
			},
			month: {
				get: (datetime) => datetime.getMonth(),
				set: (datetime, value) => datetime.withMonth(value)
			},
			quarter: {
				get: (datetime) => datetime.getQuarter(),
				set: (datetime, value) => datetime.withQuarter(value)
			},
			seconds: {
				get: (datetime) => datetime.getSeconds(),
				set: (datetime, value) => datetime.withSeconds(value)
			},
			week: {
				get: (datetime) => datetime.getWeek(),
				set: (datetime, value) => datetime.withWeek(value)
			},
			weekDay: {
				get: (datetime) => datetime.getWeekDay(),
				set: (datetime, value) => {
					if (!weekDayWithinMonth) return datetime.withWeekDay(value);
					const first = datetime.withDate(1);
					return first.withDate(1 + (value - first.getWeekDay() + 7) % 7);
				}
			},
			weekDayInMonth: {
				get: (datetime) => datetime.getWeekDayInMonth(),
				set: (datetime, value) => datetime.withWeekDayInMonth(value)
			},
			weekOfMonth: {
				get: (datetime) => datetime.getWeekOfMonth(),
				set: (datetime, value) => datetime.withWeekOfMonth(value)
			},
			weekYear: {
				get: (datetime) => datetime.getWeekYear(),
				set: (datetime, value) => datetime.withWeekYear(value)
			},
			year: {
				get: (datetime) => {
					const year = datetime.getYear();
					return Math.abs(year);
				},
				set: (datetime, value) => datetime.withYear(value)
			}
		};
	}
	/**
	* Selects the later occurrence of a matching local wall time.
	* @param {DateTime} date A date matching the requested wall time.
	* @param {number} time The requested wall-clock timestamp.
	* @returns {DateTime} The later matching date.
	*/
	function resolveRepeatedTime(date, time) {
		const nextTime = Math.min(date.getTime() + 864e5, 864e13);
		const nextOffset = date.withTime(nextTime).getTimeZoneOffset();
		const laterDate = date.withTime(time + nextOffset * 6e4);
		return laterDate > date && getOffsetTime(laterDate) === time ? laterDate : date;
	}
	/**
	* Sets the number of milliseconds since the UNIX epoch (offset to timeZone).
	* @param {DateTime} date The DateTime.
	* @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
	* @param {number} [direction=1] The direction to resolve a gap.
	* @returns {DateTime} A new DateTime instance.
	*/
	function setOffsetTime(date, time, direction = 1) {
		const newDate = date.withTime(time + date.getTimeZoneOffset() * 6e4);
		const newOffsetTime = getOffsetTime(newDate);
		if (newOffsetTime === time) return resolveRepeatedTime(newDate, time);
		const adjustedDate = date.withTime(time + newDate.getTimeZoneOffset() * 6e4);
		const adjustedOffsetTime = getOffsetTime(adjustedDate);
		if (adjustedOffsetTime === time) return resolveRepeatedTime(adjustedDate, time);
		if (direction < 0) return newOffsetTime < adjustedOffsetTime ? newDate : adjustedDate;
		return newOffsetTime > adjustedOffsetTime ? newDate : adjustedDate;
	}

//#endregion
//#region src/formatter/values.js
/**
	* Formatter value caches.
	*/
	/**
	* Gets cached localized day-period labels.
	* @param {string} locale The locale.
	* @param {string} [type='long'] The formatting type.
	* @returns {string[]} The localized day-period labels.
	*/
	function getDayPeriods(locale, type = "long") {
		return getData(`periods.${locale}.${type}`, () => {
			const dayPeriodFormatter = makeFormatter(locale, {
				hour: "numeric",
				hourCycle: "h11"
			});
			return new Array(2).fill().map((_, index) => dayPeriodFormatter.formatToParts(Date.UTC(2018, 0, 1, index * 12)).find((part) => part.type === "dayPeriod").value);
		});
	}
	/**
	* Gets cached localized weekday labels.
	* @param {string} locale The locale.
	* @param {string} [type='long'] The formatting type.
	* @param {boolean} [standalone=true] Whether the values are standalone.
	* @returns {string[]} The localized weekday labels.
	*/
	function getDays(locale, type = "long", standalone = true) {
		return getData(`days.${locale}.${type}.${standalone}`, () => {
			if (standalone) {
				const dayFormatter = makeFormatter(locale, { weekday: type });
				return new Array(7).fill().map((_, index) => dayFormatter.format(Date.UTC(2018, 0, index)));
			}
			const dayFormatter = makeFormatter(locale, {
				year: "numeric",
				month: "numeric",
				day: "numeric",
				weekday: type
			});
			return new Array(7).fill().map((_, index) => dayFormatter.formatToParts(Date.UTC(2018, 0, index)).find((part) => part.type === "weekday").value);
		});
	}
	/**
	* Gets cached localized era labels.
	* @param {string} locale The locale.
	* @param {string} [type='long'] The formatting type.
	* @returns {string[]} The localized era labels.
	*/
	function getEras(locale, type = "long") {
		return getData(`eras.${locale}.${type}`, () => {
			const eraFormatter = makeFormatter(locale, { era: type });
			return new Array(2).fill().map((_, index) => eraFormatter.formatToParts(Date.UTC(index - 1, 0, 1)).find((part) => part.type === "era").value);
		});
	}
	/**
	* Gets cached localized month labels.
	* @param {string} locale The locale.
	* @param {string} [type='long'] The formatting type.
	* @param {boolean} [standalone=true] Whether the values are standalone.
	* @returns {string[]} The localized month labels.
	*/
	function getMonths(locale, type = "long", standalone = true) {
		return getData(`months.${locale}.${type}.${standalone}`, () => {
			if (standalone) {
				const monthFormatter = makeFormatter(locale, { month: type });
				return new Array(12).fill().map((_, index) => monthFormatter.format(Date.UTC(2018, index, 1)));
			}
			const monthFormatter = makeFormatter(locale, {
				year: "numeric",
				month: type,
				day: "numeric"
			});
			return new Array(12).fill().map((_, index) => monthFormatter.formatToParts(Date.UTC(2018, index, 1)).find((part) => part.type === "month").value);
		});
	}
	/**
	* Gets cached localized digit glyphs.
	* @param {string} locale The locale.
	* @returns {string[]} The localized digit glyphs.
	*/
	function getNumbers(locale) {
		return getData(`numbers.${locale}`, () => {
			const numberFormatter = makeFormatter(locale, { minute: "numeric" });
			return new Array(10).fill().map((_, index) => numberFormatter.format(Date.UTC(2018, 0, 1, 0, index)));
		});
	}
	/**
	* Gets the RegExp for the number values.
	* @param {string} locale The locale.
	* @param {number|null} [length=null] The exact number of digits to match.
	* @returns {string} The number values RegExp.
	*/
	function numberRegExp(locale, length = null) {
		const quantifier = length === null ? "+" : `{${length}}`;
		return `(?:${valuesRegExp(getNumbers(locale))})${quantifier}`;
	}

//#endregion
//#region src/formatter/format.js
/**
	* Formats a day as a locale string.
	* @param {string} locale The locale.
	* @param {number} day The day to format (0-6).
	* @param {string} [type='long'] The formatting type.
	* @param {boolean} [standalone=true] Whether the value is standalone.
	* @returns {string} The formatted string.
	*/
	function formatDay(locale, day, type = "long", standalone = true) {
		return getDays(locale, type, standalone)[day];
	}
	/**
	* Formats a day period as a locale string.
	* @param {string} locale The locale.
	* @param {number} period The day-period index to format. (0-1)
	* @param {string} [type='long'] The formatting type.
	* @returns {string} The formatted string.
	*/
	function formatDayPeriod(locale, period, type = "long") {
		return getDayPeriods(locale, type)[period];
	}
	/**
	* Formats an era as a locale string.
	* @param {string} locale The locale.
	* @param {number} era The era index to format. (0-1)
	* @param {string} [type='long'] The formatting type.
	* @returns {string} The formatted string.
	*/
	function formatEra(locale, era, type = "long") {
		return getEras(locale, type)[era];
	}
	/**
	* Formats a month as a locale string.
	* @param {string} locale The locale.
	* @param {number} month The month to format (1-12).
	* @param {string} [type='long'] The formatting type.
	* @param {boolean} [standalone=true] Whether the value is standalone.
	* @returns {string} The formatted string.
	*/
	function formatMonth(locale, month, type = "long", standalone = true) {
		return getMonths(locale, type, standalone)[month - 1];
	}
	/**
	* Formats a number as a locale number string.
	* @param {string} locale The locale.
	* @param {number} number The number to format.
	* @param {number} [padding=0] The amount of padding to use.
	* @returns {string} The formatted string.
	*/
	function formatNumber(locale, number, padding = 0) {
		const numbers = getNumbers(locale);
		return `${number}`.padStart(padding, "0").replace(/\d/g, (match) => numbers[match]);
	}
	/**
	* Formats a number to an offset string.
	* @param {number} offset The offset to format.
	* @param {boolean} [useColon=true] Whether to use a colon separator.
	* @param {boolean} [optionalMinutes=false] Whether minutes are optional.
	* @param {boolean} [includeSeconds=true] Whether seconds are included.
	* @returns {string} The formatted offset string.
	*/
	function formatOffset(offset, useColon = true, optionalMinutes = false, includeSeconds = true) {
		const absoluteSeconds = Math.abs(offset * 60);
		const totalSeconds = Math.round(absoluteSeconds);
		const precision = Number.EPSILON * Math.max(1, absoluteSeconds);
		const roundingError = Math.abs(absoluteSeconds - totalSeconds);
		if (!Number.isFinite(absoluteSeconds) || roundingError > precision || totalSeconds >= 86400) throw new Error("Invalid time zone offset supplied");
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor(totalSeconds % 3600 / 60);
		const seconds = totalSeconds % 60;
		const sign = offset > 0 ? "-" : "+";
		const parts = [`${hours}`.padStart(2, "0")];
		if (!optionalMinutes || minutes || seconds) parts.push(`${minutes}`.padStart(2, "0"));
		if (includeSeconds && seconds) parts.push(`${seconds}`.padStart(2, "0"));
		return sign + parts.join(useColon ? ":" : "");
	}
	/**
	* Formats a relative duration as a locale string.
	* @param {string} locale The locale.
	* @param {number} amount The amount of duration.
	* @param {string} unit The time unit.
	* @returns {string} The relative duration.
	*/
	function formatRelative(locale, amount, unit) {
		const relativeFormatter = getRelativeFormatter(locale);
		if (!relativeFormatter) throw new Error("RelativeTimeFormat not supported");
		return relativeFormatter.format(amount, unit);
	}
	/**
	* Formats a time zone as a locale string.
	* @param {string} locale The locale.
	* @param {number} timestamp The timestamp to use.
	* @param {string} timeZone The time zone to format.
	* @param {string} [type='long'] The formatting type.
	* @returns {string} The formatted string.
	*/
	function formatTimeZoneName(locale, timestamp, timeZone, type = "long") {
		return makeFormatter(locale, {
			second: "numeric",
			timeZone,
			timeZoneName: type
		}).formatToParts(timestamp).find((part) => part.type === "timeZoneName").value;
	}

//#endregion
//#region src/formatter/locales.js
	var weekStart = {
		"1": [
			"af",
			"am",
			"ar-il",
			"ar-sa",
			"ar-ye",
			"as",
			"bn",
			"bo",
			"brx",
			"ccp",
			"ceb",
			"chr",
			"dav",
			"doi",
			"dz",
			"ebu",
			"en",
			"es-br",
			"es-bz",
			"es-co",
			"es-do",
			"es-gt",
			"es-hn",
			"es-mx",
			"es-ni",
			"es-pa",
			"es-pe",
			"es-ph",
			"es-pr",
			"es-py",
			"es-sv",
			"es-us",
			"es-ve",
			"fil",
			"fr-ca",
			"gu",
			"guz",
			"haw",
			"he",
			"hi",
			"id",
			"ii",
			"ja",
			"jv",
			"kam",
			"ki",
			"kln",
			"km",
			"kn",
			"ko",
			"kok",
			"ks",
			"lkt",
			"lo",
			"luo",
			"luy",
			"mai",
			"mas",
			"mer",
			"mgh",
			"ml",
			"mni",
			"mr",
			"ms-id",
			"ms-sg",
			"mt",
			"my",
			"nd",
			"ne",
			"om",
			"or",
			"pa",
			"ps-pk",
			"pt",
			"qu",
			"sa",
			"saq",
			"sat",
			"sd",
			"seh",
			"sn",
			"so-et",
			"so-ke",
			"su",
			"sw-ke",
			"ta",
			"te",
			"teo-ke",
			"th",
			"ti",
			"ug",
			"ur",
			"xh",
			"yue",
			"zh",
			"zu"
		],
		"2": [
			"af-na",
			"ar-001",
			"ar-eh",
			"ar-er",
			"ar-km",
			"ar-lb",
			"ar-ma",
			"ar-mr",
			"ar-ps",
			"ar-so",
			"ar-ss",
			"ar-td",
			"ar-tn",
			"en-001",
			"en-150",
			"en-ai",
			"en-at",
			"en-au",
			"en-bb",
			"en-be",
			"en-bi",
			"en-bm",
			"en-cc",
			"en-ch",
			"en-ck",
			"en-cm",
			"en-cx",
			"en-cy",
			"en-de",
			"en-dg",
			"en-dk",
			"en-er",
			"en-fi",
			"en-fj",
			"en-fk",
			"en-fm",
			"en-gb",
			"en-gd",
			"en-gg",
			"en-gh",
			"en-gi",
			"en-gm",
			"en-gy",
			"en-ie",
			"en-im",
			"en-io",
			"en-je",
			"en-ki",
			"en-kn",
			"en-ky",
			"en-lc",
			"en-lr",
			"en-ls",
			"en-mg",
			"en-mp",
			"en-ms",
			"en-mu",
			"en-mw",
			"en-my",
			"en-na",
			"en-nf",
			"en-ng",
			"en-nl",
			"en-nr",
			"en-nu",
			"en-nz",
			"en-pg",
			"en-pn",
			"en-pw",
			"en-rw",
			"en-sb",
			"en-sc",
			"en-se",
			"en-sh",
			"en-si",
			"en-sl",
			"en-ss",
			"en-sx",
			"en-sz",
			"en-tc",
			"en-tk",
			"en-to",
			"en-tv",
			"en-tz",
			"en-ug",
			"en-vc",
			"en-vg",
			"en-vu",
			"en-zm",
			"ko-kp",
			"mas-tz",
			"pt-ao",
			"pt-ch",
			"pt-cv",
			"pt-gq",
			"pt-gw",
			"pt-lu",
			"pt-st",
			"pt-tl",
			"qu-bo",
			"qu-ec",
			"ta-lk",
			"ta-my",
			"ti-er"
		],
		"7": [
			"ar",
			"ckb",
			"en-ae",
			"en-sd",
			"fa",
			"fr-dj",
			"fr-dz",
			"fr-sy",
			"kab",
			"lrc",
			"mzn",
			"ps",
			"so-dj",
			"uz-arab",
			"uz-arab-af"
		]
	};
	var minDaysInFirstWeek = {
		"4": [
			"ast",
			"bg",
			"br",
			"ca",
			"ce",
			"cs",
			"cy",
			"da",
			"de",
			"dsb",
			"el",
			"en-at",
			"en-be",
			"en-ch",
			"en-de",
			"en-dk",
			"en-fi",
			"en-fj",
			"en-gb",
			"en-gg",
			"en-gi",
			"en-ie",
			"en-im",
			"en-je",
			"en-nl",
			"en-se",
			"es",
			"et",
			"eu",
			"fi",
			"fo",
			"fr",
			"fur",
			"fy",
			"ga",
			"gd",
			"gl",
			"gsw",
			"gv",
			"hsb",
			"hu",
			"is",
			"it",
			"ksh",
			"kw",
			"lb",
			"lt",
			"nb",
			"nl",
			"nn",
			"no",
			"os-ru",
			"pl",
			"pt-ch",
			"pt-lu",
			"pt-pt",
			"rm",
			"ru",
			"sah",
			"sc",
			"se",
			"sk",
			"smn",
			"sv",
			"tt",
			"wae"
		],
		"1": [
			"da-gl",
			"el-cy",
			"es-419",
			"es-ar",
			"es-bo",
			"es-br",
			"es-bz",
			"es-cl",
			"es-co",
			"es-cr",
			"es-cu",
			"es-do",
			"es-ea",
			"es-ec",
			"es-gq",
			"es-gt",
			"es-hn",
			"es-ic",
			"es-mx",
			"es-ni",
			"es-pa",
			"es-pe",
			"es-ph",
			"es-pr",
			"es-py",
			"es-sv",
			"es-us",
			"es-uy",
			"es-ve",
			"fr-bf",
			"fr-bi",
			"fr-bj",
			"fr-bl",
			"fr-ca",
			"fr-cd",
			"fr-cf",
			"fr-cg",
			"fr-ci",
			"fr-cm",
			"fr-dj",
			"fr-dz",
			"fr-ga",
			"fr-gn",
			"fr-gq",
			"fr-ht",
			"fr-km",
			"fr-ma",
			"fr-mf",
			"fr-mg",
			"fr-ml",
			"fr-mr",
			"fr-mu",
			"fr-nc",
			"fr-ne",
			"fr-pf",
			"fr-pm",
			"fr-rw",
			"fr-sc",
			"fr-sn",
			"fr-sy",
			"fr-td",
			"fr-tg",
			"fr-tn",
			"fr-vu",
			"fr-wf",
			"fr-yt",
			"nl-aw",
			"nl-bq",
			"nl-cw",
			"nl-sr",
			"nl-sx",
			"ru-by",
			"ru-kg",
			"ru-kz",
			"ru-md",
			"ru-ua"
		]
	};

//#endregion
//#region src/formatter/locale.js
/**
	* Gets a locale value from generated data.
	* @param {object} data The generated locale data.
	* @param {string[]} candidates The locale candidates.
	* @param {number} fallback The fallback value.
	* @returns {number} The locale value.
	*/
	function generatedValue(data, candidates, fallback) {
		for (const candidate of candidates) for (const [value, valueLocales] of Object.entries(data)) if (valueLocales.includes(candidate)) return parseInt(value, 10);
		return fallback;
	}
	/**
	* Gets generated-data candidates for a locale.
	* @param {Intl.Locale} locale The locale.
	* @returns {string[]} The locale candidates.
	*/
	function localeCandidates(locale) {
		const region = locale.toString().split("-x-", 1)[0].match(/-u-(?:[a-z0-9]{2,8}-)*rg-([a-z]{2}|\d{3})zzzz(?:-|$)/i)?.[1] || locale.region;
		return [
			[
				locale.language,
				locale.script,
				region
			],
			[locale.language, region],
			[locale.language, locale.script],
			[locale.language]
		].map((parts) => parts.filter((part) => !!part).join("-").toLowerCase());
	}
	/**
	* Gets week information for a locale.
	* @param {string} locale The locale.
	* @returns {{firstDay: number, minimalDays: number}} The week information.
	*/
	function getWeekInfo(locale) {
		return getData(`weekInfo.${locale}`, () => {
			const localeData = new Intl.Locale(locale);
			let { firstDay = null, minimalDays = null } = localeData.getWeekInfo?.() || localeData.weekInfo || {};
			const candidates = firstDay && minimalDays ? [] : localeCandidates(localeData);
			if (!firstDay) {
				const phpFirstDay = generatedValue(weekStart, candidates, 2);
				firstDay = phpFirstDay === 1 ? 7 : phpFirstDay - 1;
			}
			if (!minimalDays) minimalDays = generatedValue(minDaysInFirstWeek, candidates, 1);
			return {
				firstDay,
				minimalDays
			};
		});
	}

//#endregion
//#region src/formatter/utility.js
/**
	* Decodes a quoted ICU format literal.
	* @param {string} literal The literal to decode.
	* @returns {string} The decoded literal.
	*/
	function decodeLiteral(literal) {
		return literal === `''` ? `'` : literal.slice(1, -1).replace(/''/g, `'`);
	}
	/**
	* Gets the formatting type from the component token length.
	* @param {number} length The component token length.
	* @returns {string} The formatting type.
	*/
	function getType(length) {
		switch (length) {
			case 5: return "narrow";
			case 4: return "long";
			default: return "short";
		}
	}
	/**
	* Gets the parsing RegExp data for a format token.
	* @param {string} source The token RegExp.
	* @param {string|null} nextSource The next token RegExp.
	* @param {number} length The token length.
	* @param {string} locale The parsing locale.
	* @param {boolean} previousNumeric Whether the previous token was an adjacent numeric token.
	* @returns {{numeric: boolean, source: string}} The token RegExp data.
	*/
	function getTokenRegExp(source, nextSource, length, locale, previousNumeric) {
		const numberSource = numberRegExp(locale);
		let numeric = true;
		if (source !== numberSource) numeric = false;
		else if (previousNumeric || nextSource === numberSource) source = numberRegExp(locale, length);
		return {
			numeric,
			source
		};
	}
	/**
	* Gets the locale's minimum days in the first week of the year.
	* @param {string} locale The locale.
	* @returns {number} The minimum day count.
	*/
	function minimumDays(locale) {
		return getWeekInfo(locale).minimalDays;
	}
	/**
	* Converts a Sunday-based day-of-week value to the locale's week numbering.
	* @param {string} locale The locale.
	* @param {number} day The day of the week. (0 = Sunday, 6 = Saturday)
	* @returns {number} The local day of the week.
	*/
	function weekDay(locale, day) {
		return (7 + parseInt(day, 10) - getWeekInfo(locale).firstDay % 7) % 7 + 1;
	}

//#endregion
//#region src/formatter/parse.js
/**
	* Parses a day from a locale string.
	* @param {string} locale The locale.
	* @param {string} value The value to parse.
	* @param {string} [type='long'] The formatting type.
	* @param {boolean} [standalone=true] Whether the value is standalone.
	* @returns {number} The local day of the week (1-7).
	*/
	function parseDay(locale, value, type = "long", standalone = true) {
		const day = getDays(locale, type, standalone).indexOf(value);
		if (day === -1) throw new Error(`Unmatched day string in DateTime string: ${value}`);
		return weekDay(locale, day);
	}
	/**
	* Parses a day period from a locale string.
	* @param {string} locale The locale.
	* @param {string} value The value to parse.
	* @param {string} [type='long'] The formatting type.
	* @returns {number} The day period (0-1).
	*/
	function parseDayPeriod(locale, value, type = "long") {
		return getDayPeriods(locale, type).indexOf(value);
	}
	/**
	* Parses an era from a locale string.
	* @param {string} locale The locale.
	* @param {string} value The value to parse.
	* @param {string} [type='long'] The formatting type.
	* @returns {number} The era (0-1).
	*/
	function parseEra(locale, value, type = "long") {
		return getEras(locale, type).indexOf(value);
	}
	/**
	* Parses a month from a locale string.
	* @param {string} locale The locale.
	* @param {string} value The value to parse.
	* @param {string} [type='long'] The formatting type.
	* @param {boolean} [standalone=true] Whether the value is standalone.
	* @returns {number} The month number (1-12).
	*/
	function parseMonth(locale, value, type = "long", standalone = true) {
		return getMonths(locale, type, standalone).indexOf(value) + 1;
	}
	/**
	* Parses locale digits into an ASCII digit string.
	* @param {string} locale The locale.
	* @param {string} value The value to parse.
	* @returns {string} The parsed ASCII digit string.
	*/
	function parseNumberString(locale, value) {
		const numbers = getNumbers(locale);
		return Array.from(value, (digit) => numbers.indexOf(digit)).join("");
	}
	/**
	* Parses a number from a locale number string.
	* @param {string} locale The locale.
	* @param {string} value The value to parse.
	* @returns {number} The parsed number.
	*/
	function parseNumber(locale, value) {
		return parseInt(parseNumberString(locale, value), 10);
	}

//#endregion
//#region src/formatter/tokens.js
/**
	* DateFormatter Format Data
	*/
	var tokens_default = {
		G: {
			key: "era",
			regex: (locale, length) => {
				const type = getType(length);
				return valuesRegExp(getEras(locale, type));
			},
			input: (locale, value, length) => {
				const type = getType(length);
				return parseEra(locale, value, type);
			},
			output: (datetime, length) => {
				const type = getType(length);
				return datetime.era(type);
			}
		},
		y: {
			key: "year",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => {
				let year = datetime.getYear();
				if (length === 2) year = `${year}`.slice(-2);
				return formatNumber(datetime.getLocale(), Math.abs(year), length);
			}
		},
		Y: {
			key: "weekYear",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => {
				let year = datetime.getWeekYear();
				if (length === 2) year = `${year}`.slice(-2);
				return formatNumber(datetime.getLocale(), Math.abs(year), length);
			}
		},
		Q: {
			key: "quarter",
			supportsLength: (length) => length !== 3 && length !== 4,
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getQuarter(), length < 3 ? length : 0)
		},
		q: {
			key: "quarter",
			supportsLength: (length) => length !== 3 && length !== 4,
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getQuarter(), length < 3 ? length : 0)
		},
		M: {
			key: "month",
			supportsLength: (length, parsing) => !parsing || length !== 5,
			regex: (locale, length) => {
				switch (length) {
					case 5:
					case 4:
					case 3: {
						const type = getType(length);
						return valuesRegExp(getMonths(locale, type, false));
					}
					default: return numberRegExp(locale);
				}
			},
			input: (locale, value, length) => {
				switch (length) {
					case 4:
					case 3: {
						const type = getType(length);
						return parseMonth(locale, value, type, false);
					}
					default: return parseNumber(locale, value);
				}
			},
			output: (datetime, length) => {
				const locale = datetime.getLocale();
				const month = datetime.getMonth();
				switch (length) {
					case 5:
					case 4:
					case 3: {
						const type = getType(length);
						return formatMonth(locale, month, type, false);
					}
					default: return formatNumber(locale, month, length);
				}
			}
		},
		L: {
			key: "month",
			supportsLength: (length, parsing) => !parsing || length !== 5,
			regex: (locale, length) => {
				switch (length) {
					case 5:
					case 4:
					case 3: {
						const type = getType(length);
						return valuesRegExp(getMonths(locale, type));
					}
					default: return numberRegExp(locale);
				}
			},
			input: (locale, value, length) => {
				switch (length) {
					case 4:
					case 3: {
						const type = getType(length);
						return parseMonth(locale, value, type);
					}
					default: return parseNumber(locale, value);
				}
			},
			output: (datetime, length) => {
				const locale = datetime.getLocale();
				const month = datetime.getMonth();
				switch (length) {
					case 5:
					case 4:
					case 3: {
						const type = getType(length);
						return formatMonth(locale, month, type);
					}
					default: return formatNumber(locale, month, length);
				}
			}
		},
		w: {
			key: "week",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getWeek(), length)
		},
		W: {
			key: "weekOfMonth",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getWeekOfMonth(), length)
		},
		d: {
			key: "date",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getDate(), length)
		},
		D: {
			key: "dayOfYear",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getDayOfYear(), length)
		},
		F: {
			key: "weekDayInMonth",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getWeekDayInMonth(), length)
		},
		E: {
			key: "weekDay",
			supportsLength: (length, parsing) => length !== 6 && (!parsing || length !== 5),
			regex: (locale, length) => {
				const type = getType(length);
				return valuesRegExp(getDays(locale, type, false));
			},
			input: (locale, value, length) => {
				const type = getType(length);
				return parseDay(locale, value, type, false);
			},
			output: (datetime, length) => {
				const type = getType(length);
				const locale = datetime.getLocale();
				const day = datetime.getDay();
				return formatDay(locale, day, type, false);
			}
		},
		e: {
			key: "weekDay",
			supportsLength: (length, parsing) => length !== 6 && (!parsing || length !== 5),
			regex: (locale, length) => {
				if (length < 3) return numberRegExp(locale);
				const type = getType(length);
				return valuesRegExp(getDays(locale, type, false));
			},
			input: (locale, value, length) => {
				if (length < 3) return parseNumber(locale, value);
				const type = getType(length);
				return parseDay(locale, value, type, false);
			},
			output: (datetime, length) => {
				const locale = datetime.getLocale();
				if (length < 3) return formatNumber(locale, datetime.getWeekDay(), length);
				const type = getType(length);
				return formatDay(locale, datetime.getDay(), type, false);
			}
		},
		c: {
			key: "weekDay",
			supportsLength: (length, parsing) => length !== 6 && (!parsing || length !== 5),
			regex: (locale, length) => {
				if (length < 3) return numberRegExp(locale);
				const type = getType(length);
				return valuesRegExp(getDays(locale, type));
			},
			input: (locale, value, length) => {
				if (length < 3) return parseNumber(locale, value);
				const type = getType(length);
				return parseDay(locale, value, type);
			},
			output: (datetime, length) => {
				const locale = datetime.getLocale();
				if (length < 3) return formatNumber(locale, datetime.getWeekDay());
				const type = getType(length);
				return formatDay(locale, datetime.getDay(), type);
			}
		},
		a: {
			key: "dayPeriod",
			supportsLength: (length) => length <= 4,
			regex: (locale, length) => {
				const type = getType(length);
				return valuesRegExp(getDayPeriods(locale, type));
			},
			input: (locale, value, length) => {
				const type = getType(length);
				return parseDayPeriod(locale, value, type);
			},
			output: (datetime, length) => {
				const type = getType(length);
				return datetime.dayPeriod(type);
			}
		},
		h: {
			key: "hours12",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => {
				value = parseNumber(locale, value);
				if (value === 12) value = 0;
				return value;
			},
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getHours() % 12 || 12, length)
		},
		H: {
			key: "hours24",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getHours(), length)
		},
		K: {
			key: "hours12",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getHours() % 12, length)
		},
		k: {
			key: "hours24",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => {
				value = parseNumber(locale, value);
				if (value === 24) value = 0;
				return value;
			},
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getHours() || 24, length)
		},
		m: {
			key: "minutes",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getMinutes(), length)
		},
		s: {
			key: "seconds",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseNumber(locale, value),
			output: (datetime, length) => formatNumber(datetime.getLocale(), datetime.getSeconds(), length)
		},
		S: {
			key: "milliseconds",
			regex: (locale) => numberRegExp(locale),
			input: (locale, value) => parseInt(parseNumberString(locale, value).padEnd(3, "0").slice(0, 3), 10),
			output: (datetime, length) => {
				const milliseconds = `${datetime.getMilliseconds()}`.padStart(3, "0");
				return formatNumber(datetime.getLocale(), milliseconds.padEnd(length, "0").slice(0, length));
			}
		},
		z: {
			supportsLength: (_, parsing) => !parsing,
			output: (datetime, length) => {
				const type = getType(Math.min(length, 4));
				return datetime.timeZoneName(type);
			}
		},
		Z: {
			key: "timeZone",
			regex: (_, length) => {
				if (length === 5) return `[\\+\\-]\\d{2}\\:\\d{2}(?:\\:\\d{2})?|Z`;
				return length >= 4 ? `GMT[\\+\\-]\\d{2}\\:\\d{2}|GMT` : `[\\+\\-]\\d{4}`;
			},
			input: (_, value) => value,
			output: (datetime, length) => {
				const offset = datetime.getTimeZoneOffset();
				let useColon = true;
				let prefix = "";
				if (length === 5) {
					if (!offset) return "Z";
				} else if (length >= 4) {
					prefix = "GMT";
					if (!offset) return prefix;
				} else useColon = false;
				return prefix + formatOffset(offset, useColon, false, length === 5);
			}
		},
		O: {
			key: "timeZone",
			supportsLength: (length) => length === 1 || length === 4,
			regex: (_, length) => {
				switch (length) {
					case 4: return `GMT(?:[+-]\\d{2}:\\d{2}(?::\\d{2})?)?`;
					default: return `GMT(?:[+-]\\d{2}(?::\\d{2}(?::\\d{2})?)?)?`;
				}
			},
			input: (_, value) => value,
			output: (datetime, length) => {
				const offset = datetime.getTimeZoneOffset();
				const prefix = "GMT";
				if (!offset) return prefix;
				return prefix + formatOffset(offset, true, length !== 4);
			}
		},
		V: {
			key: "timeZone",
			supportsLength: (length) => length === 2,
			regex: (_) => "(?:[+-]\\d{2}:\\d{2}(?::\\d{2})?|[A-Za-z0-9_.+\\-/]+)",
			input: (_, value) => value,
			output: (datetime) => datetime.getTimeZone()
		},
		X: {
			key: "timeZone",
			supportsLength: (length) => length <= 5,
			regex: (_, length) => {
				switch (length) {
					case 5: return `[\\+\\-]\\d{2}\\:\\d{2}(?:\\:\\d{2})?|Z`;
					case 4: return `[\\+\\-]\\d{4}(?:\\d{2})?|Z`;
					case 3: return `[\\+\\-]\\d{2}\\:\\d{2}|Z`;
					case 2: return `[\\+\\-]\\d{4}|Z`;
					default: return `[\\+\\-]\\d{2}(?:\\d{2})?|Z`;
				}
			},
			input: (_, value) => value,
			output: (datetime, length) => {
				const offset = datetime.getTimeZoneOffset();
				if (!offset) return "Z";
				return formatOffset(offset, length === 3 || length === 5, length === 1, length >= 4);
			}
		},
		x: {
			key: "timeZone",
			supportsLength: (length) => length <= 5,
			regex: (_, length) => {
				switch (length) {
					case 5: return `[\\+\\-]\\d{2}\\:\\d{2}(?:\\:\\d{2})?`;
					case 4: return `[\\+\\-]\\d{4}(?:\\d{2})?`;
					case 3: return `[\\+\\-]\\d{2}\\:\\d{2}`;
					case 2: return `[\\+\\-]\\d{4}`;
					default: return `[\\+\\-]\\d{2}(?:\\d{2})?`;
				}
			},
			input: (_, value) => value,
			output: (datetime, length) => {
				const useColon = length === 3 || length === 5;
				return formatOffset(datetime.getTimeZoneOffset(), useColon, length === 1, length >= 4);
			}
		}
	};

//#endregion
//#region src/date-time.js
/**
	* @typedef {{timeZone?: string, locale?: string}} DateTimeOptions
	*/
	/**
	* An immutable date and time object with locale-aware formatting and time-zone support.
	*/
	var DateTime = class {
		#date;
		#dynamicTz;
		#locale;
		#offset;
		#timeZone;
		/**
		* Clears cached formatter and locale data.
		*/
		static clearDataCache() {
			clearDataCache();
		}
		/**
		* Gets the day of the year for a year, month and date.
		* @param {number} year The year.
		* @param {number} month The month. (1-12)
		* @param {number} date The date.
		* @returns {number} The day of the year. (1-366)
		*/
		static dayOfYear(year, month, date) {
			return new Array(month - 1).fill().reduce((d, _, i) => d + this.daysInMonth(year, i + 1), date);
		}
		/**
		* Gets the number of days in a month for a given year.
		* @param {number} year The year.
		* @param {number} month The month. (1-12)
		* @returns {number} The number of days in the month.
		*/
		static daysInMonth(year, month) {
			const date = /* @__PURE__ */ new Date(0);
			date.setUTCFullYear(year, month - 1, 1);
			month = date.getUTCMonth();
			return monthDays[month] + (month === 1 && this.isLeapYear(date.getUTCFullYear()) ? 1 : 0);
		}
		/**
		* Gets the number of days in a given year.
		* @param {number} year The year.
		* @returns {number} The number of days in the year.
		*/
		static daysInYear(year) {
			return !this.isLeapYear(year) ? 365 : 366;
		}
		/**
		* Creates a new DateTime from an array. Missing month/date values default to 1.
		* Missing time values default to 0.
		* @param {number[]} dateArray The date to parse.
		* @param {DateTimeOptions} [options={}] Options for the new DateTime.
		* @param {string} [options.timeZone] The time zone to use.
		* @param {string} [options.locale] The locale to use.
		* @returns {DateTime} A new DateTime instance.
		*/
		static fromArray(dateArray, options = {}) {
			const dateValues = dateArray.slice(0, 3);
			const timeValues = dateArray.slice(3);
			if (dateValues.length < 3) dateValues.push(...new Array(3 - dateValues.length).fill(1));
			if (timeValues.length < 4) timeValues.push(...new Array(4 - timeValues.length).fill(0));
			return new this(0, options).withYear(...dateValues).withHours(...timeValues);
		}
		/**
		* Creates a new DateTime from a Date.
		* @param {Date} date The date.
		* @param {DateTimeOptions} [options={}] Options for the new DateTime.
		* @param {string} [options.timeZone] The time zone to use.
		* @param {string} [options.locale] The locale to use.
		* @returns {DateTime} A new DateTime instance.
		*/
		static fromDate(date, options = {}) {
			return new this(date.getTime(), options);
		}
		/**
		* Creates a new DateTime from a format string.
		* @param {string} formatString The format string.
		* @param {string} dateString The date string.
		* @param {DateTimeOptions} [options={}] Options for the new DateTime.
		* @param {string} [options.timeZone] The time zone to use.
		* @param {string} [options.locale] The locale to use.
		* @returns {DateTime} A new DateTime instance.
		* @throws {Error} When the format contains unsupported parsing tokens such as
		* `MMMMM` or `LLLLL`.
		*/
		static fromFormat(formatString, dateString, options = {}) {
			const referenceTime = Date.now();
			const locale = "locale" in options ? options.locale : config.defaultLocale;
			const requestedTimeZone = "timeZone" in options ? options.timeZone : config.defaultTimeZone;
			const values = [];
			let match;
			let previousTokenNumeric = false;
			while (formatString && (match = formatString.match(formatTokenRegExp))) {
				const token = match[1];
				const position = match.index;
				const length = match[0].length;
				if (position) {
					const formatTest = formatString.substring(0, position);
					parseCompare(formatTest, dateString);
				}
				formatString = formatString.substring(position + length);
				dateString = dateString.substring(position);
				if (!token) {
					const literal = decodeLiteral(match[0]);
					parseCompare(literal, dateString);
					dateString = dateString.substring(literal.length);
					previousTokenNumeric = false;
					continue;
				}
				if (!(token in tokens_default)) throw new Error(`Invalid token in DateTime format: ${token}`);
				if (tokens_default[token].supportsLength?.(length, true) === false) throw new Error(`Unsupported parsing token in DateTime format: ${token.repeat(length)}`);
				const previousNumeric = previousTokenNumeric && !position;
				let nextSource = null;
				if (!previousNumeric) {
					const nextToken = formatString[0];
					if (nextToken && nextToken in tokens_default) {
						const nextLength = formatString.match(/^(.)\1*/)[0].length;
						nextSource = tokens_default[nextToken].regex(locale, nextLength);
					}
				}
				const { numeric, source } = getTokenRegExp(tokens_default[token].regex(locale, length), nextSource, length, locale, previousNumeric);
				const matchedValue = dateString.match(new RegExp(`^(?:${source})`));
				if (!matchedValue) throw new Error(`Unmatched token in DateTime string: ${token}`);
				const literal = matchedValue[0];
				const value = tokens_default[token].input(locale, literal, length);
				if (value !== null) {
					const key = tokens_default[token].key;
					values.push({
						key,
						value,
						literal,
						token,
						length
					});
				}
				dateString = dateString.substring(literal.length);
				previousTokenNumeric = numeric;
			}
			if (formatString) {
				parseCompare(formatString, dateString);
				dateString = dateString.substring(formatString.length);
			}
			if (dateString) throw new Error(`Unmatched trailing characters in DateTime string: ${dateString}`);
			const timeZone = values.findLast(({ key }) => key === "timeZone")?.value ?? requestedTimeZone;
			const datetime = parseDateValues(this.fromArray([
				1970,
				1,
				1
			], {
				locale,
				timeZone
			}), values, referenceTime);
			return requestedTimeZone !== timeZone ? datetime.withTimeZone(requestedTimeZone) : datetime;
		}
		/**
		* Creates a new DateTime from an ISO format string.
		* @param {string} dateString The date string.
		* @param {DateTimeOptions} [options={}] Options for the new DateTime.
		* @param {string} [options.timeZone] The time zone to use.
		* @param {string} [options.locale] The locale to use.
		* @returns {DateTime} A new DateTime instance.
		*/
		static fromISOString(dateString, options = {}) {
			let date = this.fromFormat(formats.rfc3339_extended, dateString, { locale: "en" });
			if ("timeZone" in options) date = date.withTimeZone(options.timeZone);
			if ("locale" in options) date = date.withLocale(options.locale);
			return date;
		}
		/**
		* Creates a new DateTime from a timestamp.
		* @param {number} timestamp The number of seconds since the UNIX epoch.
		* @param {DateTimeOptions} [options={}] Options for the new DateTime.
		* @param {string} [options.timeZone] The time zone to use.
		* @param {string} [options.locale] The locale to use.
		* @returns {DateTime} A new DateTime instance.
		*/
		static fromTimestamp(timestamp, options = {}) {
			return new this(null, options).withTimestamp(timestamp);
		}
		/**
		* Gets the default locale.
		* @returns {string} The locale.
		*/
		static getDefaultLocale() {
			return config.defaultLocale;
		}
		/**
		* Gets the default time zone.
		* @returns {string} The default time zone.
		*/
		static getDefaultTimeZone() {
			return config.defaultTimeZone;
		}
		/**
		* Checks whether the year is a leap year.
		* @param {number} year The year.
		* @returns {boolean} Whether the given year is a leap year.
		*/
		static isLeapYear(year) {
			const date = /* @__PURE__ */ new Date(0);
			date.setUTCFullYear(year, 1, 29);
			return date.getUTCDate() === 29;
		}
		/**
		* Creates a new DateTime for the current time.
		* @param {DateTimeOptions} [options={}] Options for the new DateTime.
		* @param {string} [options.timeZone] The time zone to use.
		* @param {string} [options.locale] The locale to use.
		* @returns {DateTime} A new DateTime instance.
		*/
		static now(options = {}) {
			return new this(null, options);
		}
		/**
		* Sets whether dates will be clamped when changing months.
		* @param {boolean} clampDates Whether to clamp dates.
		*/
		static setDateClamping(clampDates) {
			config.clampDates = clampDates;
		}
		/**
		* Sets the default locale.
		* @param {string} locale The locale.
		*/
		static setDefaultLocale(locale) {
			config.defaultLocale = locale;
		}
		/**
		* Sets the default time zone.
		* @param {string} timeZone The time zone name.
		*/
		static setDefaultTimeZone(timeZone) {
			config.defaultTimeZone = timeZone;
		}
		/**
		* Creates a new DateTime from the current time, epoch milliseconds, or a date string.
		* @param {string|number|null} [date=null] The source date. Numbers are interpreted as milliseconds since the UNIX epoch.
		* @param {DateTimeOptions} [options={}] Options for the new DateTime.
		* @param {string} [options.timeZone] The time zone to use.
		* @param {string} [options.locale] The locale to use.
		*/
		constructor(date = null, options = {}) {
			let timestamp;
			let adjustOffset = false;
			if (date === null) timestamp = Date.now();
			else if (typeof date === "number" && Number.isFinite(date)) timestamp = date;
			else if (date === `${date}`) {
				timestamp = Date.parse(date);
				if (isNaN(timestamp)) throw new Error("Invalid date string supplied");
				adjustOffset = !dateStringTimeZoneRegExp.test(date);
				if (adjustOffset) {
					const localTimestamp = parseLocalTimestamp(date);
					if (localTimestamp === null) timestamp -= new Date(timestamp).getTimezoneOffset() * 6e4;
					else timestamp = localTimestamp;
				}
			} else throw new Error("Invalid date supplied");
			this.#date = new Date(timestamp);
			this.#dynamicTz = false;
			this.isValid = true;
			let timeZone = options.timeZone;
			if (!timeZone) timeZone = config.defaultTimeZone;
			if (["Z", "GMT"].includes(timeZone)) timeZone = "UTC";
			const match = timeZone.match(offsetRegExp);
			if (match) {
				this.#offset = match[2] * 60 + parseInt(match[4] || 0, 10) + parseInt(match[5] || 0, 10) / 60;
				if (this.#offset && match[1] === "+") this.#offset *= -1;
				if (this.#offset) this.#timeZone = formatOffset(this.#offset);
				else {
					this.#dynamicTz = true;
					this.#timeZone = "UTC";
				}
			} else {
				this.#dynamicTz = true;
				this.#timeZone = timeZone;
			}
			this.#locale = "locale" in options ? options.locale : config.defaultLocale;
			if (this.#dynamicTz) this.#offset = getOffset(this);
			if (adjustOffset) {
				const resolvedDate = setOffsetTime(this, timestamp);
				this.#date.setTime(resolvedDate.getTime());
				this.#offset = resolvedDate.getTimeZoneOffset();
			}
		}
		/**
		* Adds a day to the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		addDay() {
			return this.addDays(1);
		}
		/**
		* Adds days to the current DateTime.
		* @param {number} amount The number of days to add.
		* @returns {DateTime} A new DateTime instance.
		*/
		addDays(amount) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCDate(this.getDate() + amount), amount);
		}
		/**
		* Adds an hour to the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		addHour() {
			return this.addHours(1);
		}
		/**
		* Adds hours to the current DateTime.
		* @param {number} amount The number of hours to add.
		* @returns {DateTime} A new DateTime instance.
		*/
		addHours(amount) {
			return this.withTime(this.getTime() + amount * 36e5);
		}
		/**
		* Adds a minute to the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		addMinute() {
			return this.addMinutes(1);
		}
		/**
		* Adds minutes to the current DateTime.
		* @param {number} amount The number of minutes to add.
		* @returns {DateTime} A new DateTime instance.
		*/
		addMinutes(amount) {
			return this.withTime(this.getTime() + amount * 6e4);
		}
		/**
		* Adds a month to the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		addMonth() {
			return this.addMonths(1);
		}
		/**
		* Adds months to the current DateTime.
		* @param {number} amount The number of months to add.
		* @returns {DateTime} A new DateTime instance.
		*/
		addMonths(amount) {
			return this.withMonth(this.getMonth() + amount);
		}
		/**
		* Adds a second to the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		addSecond() {
			return this.addSeconds(1);
		}
		/**
		* Adds seconds to the current DateTime.
		* @param {number} amount The number of seconds to add.
		* @returns {DateTime} A new DateTime instance.
		*/
		addSeconds(amount) {
			return this.withTime(this.getTime() + amount * 1e3);
		}
		/**
		* Adds a week to the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		addWeek() {
			return this.addWeeks(1);
		}
		/**
		* Adds weeks to the current DateTime.
		* @param {number} amount The number of weeks to add.
		* @returns {DateTime} A new DateTime instance.
		*/
		addWeeks(amount) {
			return this.addDays(amount * 7);
		}
		/**
		* Adds a year to the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		addYear() {
			return this.addYears(1);
		}
		/**
		* Adds years to the current DateTime.
		* @param {number} amount The number of years to add.
		* @returns {DateTime} A new DateTime instance.
		*/
		addYears(amount) {
			return this.withYear(this.getYear() + amount);
		}
		/**
		* Gets the localized day name for the current date.
		* @param {'long'|'short'|'narrow'} [type='long'] The type of day name to return.
		* @returns {string} The localized day name.
		*/
		dayName(type = "long") {
			return formatDay(this.getLocale(), this.getDay(), type);
		}
		/**
		* Gets the localized day period for the current time.
		* @param {'long'|'short'|'narrow'} [type='long'] The type of day period to return.
		* @returns {string} The localized day period.
		*/
		dayPeriod(type = "long") {
			return formatDayPeriod(this.getLocale(), this.getHours() < 12 ? 0 : 1, type);
		}
		/**
		* Gets the number of days in the current month.
		* @returns {number} The number of days in the current month.
		*/
		daysInMonth() {
			return this.constructor.daysInMonth(this.getYear(), this.getMonth());
		}
		/**
		* Gets the number of days in the current year.
		* @returns {number} The number of days in the current year.
		*/
		daysInYear() {
			return this.constructor.daysInYear(this.getYear());
		}
		/**
		* Gets the difference between this and another Date in milliseconds.
		* @param {DateTime} other The date to compare to.
		* @returns {number} The difference.
		*/
		diff(other) {
			return this - other;
		}
		/**
		* Gets the difference between this and another Date in days.
		* @param {DateTime} other The date to compare to.
		* @param {{relative?: boolean}} [options] Options for comparing the dates.
		* @returns {number} The difference.
		*/
		diffInDays(other, { relative = true } = {}) {
			return calculateDiff(this, other, "day", relative);
		}
		/**
		* Gets the difference between this and another Date in hours.
		* @param {DateTime} other The date to compare to.
		* @param {{relative?: boolean}} [options] Options for comparing the dates.
		* @returns {number} The difference.
		*/
		diffInHours(other, { relative = true } = {}) {
			return calculateDiff(this, other, "hour", relative);
		}
		/**
		* Gets the difference between this and another Date in minutes.
		* @param {DateTime} other The date to compare to.
		* @param {{relative?: boolean}} [options] Options for comparing the dates.
		* @returns {number} The difference.
		*/
		diffInMinutes(other, { relative = true } = {}) {
			return calculateDiff(this, other, "minute", relative);
		}
		/**
		* Gets the difference between this and another Date in months.
		* @param {DateTime} other The date to compare to.
		* @param {{relative?: boolean}} [options] Options for comparing the dates.
		* @returns {number} The difference.
		*/
		diffInMonths(other, { relative = true } = {}) {
			return calculateDiff(this, other, "month", relative);
		}
		/**
		* Gets the difference between this and another Date in seconds.
		* @param {DateTime} other The date to compare to.
		* @param {{relative?: boolean}} [options] Options for comparing the dates.
		* @returns {number} The difference.
		*/
		diffInSeconds(other, { relative = true } = {}) {
			return calculateDiff(this, other, "second", relative);
		}
		/**
		* Gets the difference between this and another Date in weeks.
		* @param {DateTime} other The date to compare to.
		* @param {{relative?: boolean}} [options] Options for comparing the dates.
		* @returns {number} The difference.
		*/
		diffInWeeks(other, { relative = true } = {}) {
			return calculateDiff(this, other, "week", relative);
		}
		/**
		* Gets the difference between this and another Date in years.
		* @param {DateTime} other The date to compare to.
		* @param {{relative?: boolean}} [options] Options for comparing the dates.
		* @returns {number} The difference.
		*/
		diffInYears(other, { relative = true } = {}) {
			return calculateDiff(this, other, "year", relative);
		}
		/**
		* Sets the DateTime to the end of the day.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfDay() {
			return this.withHours(23, 59, 59, 999);
		}
		/**
		* Sets the DateTime to the end of the hour.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfHour() {
			return this.withMinutes(59, 59, 999);
		}
		/**
		* Sets the DateTime to the end of the minute.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfMinute() {
			return this.withSeconds(59, 999);
		}
		/**
		* Sets the DateTime to the end of the month.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfMonth() {
			return this.withDate(this.daysInMonth()).endOfDay();
		}
		/**
		* Sets the DateTime to the end of the quarter.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfQuarter() {
			const month = this.getQuarter() * 3;
			return this.withMonth(month, this.constructor.daysInMonth(this.getYear(), month)).endOfDay();
		}
		/**
		* Sets the DateTime to the end of the second.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfSecond() {
			return this.withMilliseconds(999);
		}
		/**
		* Sets the DateTime to the end of the week.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfWeek() {
			return this.withWeekDay(7).endOfDay();
		}
		/**
		* Sets the DateTime to the end of the year.
		* @returns {DateTime} A new DateTime instance.
		*/
		endOfYear() {
			return this.withMonth(12, 31).endOfDay();
		}
		/**
		* Gets the localized era for the current date.
		* @param {'long'|'short'|'narrow'} [type='long'] The type of era to return.
		* @returns {string} The localized era.
		*/
		era(type = "long") {
			return formatEra(this.getLocale(), this.getYear() < 0 ? 0 : 1, type);
		}
		/**
		* Formats the current date using a format string.
		* @param {string} formatString The format string.
		* @returns {string} The formatted date string.
		*/
		format(formatString) {
			let match;
			let output = "";
			while (formatString && (match = formatString.match(formatTokenRegExp))) {
				const token = match[1];
				const position = match.index;
				const length = match[0].length;
				if (position) output += formatString.substring(0, position);
				formatString = formatString.substring(position + length);
				if (!token) {
					output += decodeLiteral(match[0]);
					continue;
				}
				if (!(token in tokens_default)) throw new Error(`Invalid token in DateTime format: ${token}`);
				if (tokens_default[token].supportsLength?.(length) === false) throw new Error(`Unsupported token in DateTime format: ${token.repeat(length)}`);
				output += tokens_default[token].output(this, length);
			}
			output += formatString;
			return output;
		}
		/**
		* Gets the date of the month in the current time zone.
		* @returns {number} The date of the month.
		*/
		getDate() {
			return new Date(getOffsetTime(this)).getUTCDate();
		}
		/**
		* Gets the day of the week in the current time zone.
		* @returns {number} The day of the week. (0 = Sunday, 6 = Saturday)
		*/
		getDay() {
			return new Date(getOffsetTime(this)).getUTCDay();
		}
		/**
		* Gets the day of the year in the current time zone.
		* @returns {number} The day of the year. (1-366)
		*/
		getDayOfYear() {
			return this.constructor.dayOfYear(this.getYear(), this.getMonth(), this.getDate());
		}
		/**
		* Gets the hours of the day in the current time zone.
		* @returns {number} The hours of the day. (0-23)
		*/
		getHours() {
			return new Date(getOffsetTime(this)).getUTCHours();
		}
		/**
		* Gets the current locale.
		* @returns {string} The locale.
		*/
		getLocale() {
			return this.#locale;
		}
		/**
		* Gets the milliseconds in the current time zone.
		* @returns {number} The milliseconds.
		*/
		getMilliseconds() {
			return new Date(getOffsetTime(this)).getUTCMilliseconds();
		}
		/**
		* Gets the minutes in the current time zone.
		* @returns {number} The minutes. (0-59)
		*/
		getMinutes() {
			return new Date(getOffsetTime(this)).getUTCMinutes();
		}
		/**
		* Gets the month in the current time zone.
		* @returns {number} The month. (1-12)
		*/
		getMonth() {
			return new Date(getOffsetTime(this)).getUTCMonth() + 1;
		}
		/**
		* Gets the quarter of the year in the current time zone.
		* @returns {number} The quarter of the year. (1-4)
		*/
		getQuarter() {
			return Math.ceil(this.getMonth() / 3);
		}
		/**
		* Gets the seconds in the current time zone.
		* @returns {number} The seconds. (0-59)
		*/
		getSeconds() {
			return new Date(getOffsetTime(this)).getUTCSeconds();
		}
		/**
		* Gets the number of milliseconds since the UNIX epoch.
		* @returns {number} The number of milliseconds since the UNIX epoch.
		*/
		getTime() {
			return this.#date.getTime();
		}
		/**
		* Gets the number of seconds since the UNIX epoch.
		* @returns {number} The number of seconds since the UNIX epoch.
		*/
		getTimestamp() {
			return Math.floor(this.getTime() / 1e3);
		}
		/**
		* Gets the current time zone.
		* @returns {string} The time zone.
		*/
		getTimeZone() {
			return this.#timeZone;
		}
		/**
		* Gets the current UTC offset in minutes.
		* @returns {number} The UTC offset in minutes.
		*/
		getTimeZoneOffset() {
			return this.#offset;
		}
		/**
		* Gets the local week in the current time zone.
		* @returns {number} The local week. (1-53)
		*/
		getWeek() {
			const thisWeek = this.startOfDay().withWeekDay(1);
			const firstWeek = thisWeek.withWeek(1, 1);
			return 1 + Math.floor((getOffsetTime(thisWeek) - getOffsetTime(firstWeek)) / 6048e5);
		}
		/**
		* Gets the local day of the week in the current time zone.
		* @returns {number} The local day of the week. (1-7)
		*/
		getWeekDay() {
			return weekDay(this.getLocale(), this.getDay());
		}
		/**
		* Gets the week day in month in the current time zone.
		* @returns {number} The weekday occurrence in the month. (1-5)
		*/
		getWeekDayInMonth() {
			return Math.ceil(this.getDate() / 7);
		}
		/**
		* Gets the week of month in the current time zone.
		* @returns {number} The locale-aware week of month. (0-6)
		*/
		getWeekOfMonth() {
			const firstDay = this.withDate(1).getWeekDay();
			const firstWeek = 8 - firstDay >= minimumDays(this.getLocale()) ? 1 : 0;
			return Math.floor((this.getDate() + firstDay - 2) / 7) + firstWeek;
		}
		/**
		* Gets the week year in the current time zone.
		* @returns {number} The week year.
		*/
		getWeekYear() {
			const minDays = minimumDays(this.getLocale());
			return this.withWeekDay(7 - minDays + 1).getYear();
		}
		/**
		* Gets the year in the current time zone.
		* @returns {number} The year.
		*/
		getYear() {
			return new Date(getOffsetTime(this)).getUTCFullYear();
		}
		/**
		* Gets the difference between this and another Date in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in human readable form.
		*/
		humanDiff(other) {
			const [amount, unit] = getBiggestDiff(this, other);
			return formatRelative(this.getLocale(), amount, unit);
		}
		/**
		* Gets the difference between this and another Date in days in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in days in human readable form.
		*/
		humanDiffInDays(other) {
			return formatRelative(this.getLocale(), this.diffInDays(other), "day");
		}
		/**
		* Gets the difference between this and another Date in hours in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in hours in human readable form.
		*/
		humanDiffInHours(other) {
			return formatRelative(this.getLocale(), this.diffInHours(other), "hour");
		}
		/**
		* Gets the difference between this and another Date in minutes in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in minutes in human readable form.
		*/
		humanDiffInMinutes(other) {
			return formatRelative(this.getLocale(), this.diffInMinutes(other), "minute");
		}
		/**
		* Gets the difference between this and another Date in months in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in months in human readable form.
		*/
		humanDiffInMonths(other) {
			return formatRelative(this.getLocale(), this.diffInMonths(other), "month");
		}
		/**
		* Gets the difference between this and another Date in seconds in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in seconds in human readable form.
		*/
		humanDiffInSeconds(other) {
			return formatRelative(this.getLocale(), this.diffInSeconds(other), "second");
		}
		/**
		* Gets the difference between this and another Date in weeks in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in weeks in human readable form.
		*/
		humanDiffInWeeks(other) {
			return formatRelative(this.getLocale(), this.diffInWeeks(other), "week");
		}
		/**
		* Gets the difference between this and another Date in years in human readable form.
		* @param {DateTime} other The date to compare to.
		* @returns {string} The difference in years in human readable form.
		*/
		humanDiffInYears(other) {
			return formatRelative(this.getLocale(), this.diffInYears(other), "year");
		}
		/**
		* Checks whether this DateTime is after another date.
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date.
		*/
		isAfter(other) {
			return this.diff(other) > 0;
		}
		/**
		* Checks whether this DateTime is after another date (comparing by day).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date (comparing by day).
		*/
		isAfterDay(other) {
			return this.diffInDays(other) > 0;
		}
		/**
		* Checks whether this DateTime is after another date (comparing by hour).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date (comparing by hour).
		*/
		isAfterHour(other) {
			return this.diffInHours(other) > 0;
		}
		/**
		* Checks whether this DateTime is after another date (comparing by minute).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date (comparing by minute).
		*/
		isAfterMinute(other) {
			return this.diffInMinutes(other) > 0;
		}
		/**
		* Checks whether this DateTime is after another date (comparing by month).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date (comparing by month).
		*/
		isAfterMonth(other) {
			return this.diffInMonths(other) > 0;
		}
		/**
		* Checks whether this DateTime is after another date (comparing by second).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date (comparing by second).
		*/
		isAfterSecond(other) {
			return this.diffInSeconds(other) > 0;
		}
		/**
		* Checks whether this DateTime is after another date (comparing by week).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date (comparing by week).
		*/
		isAfterWeek(other) {
			return this.diffInWeeks(other) > 0;
		}
		/**
		* Checks whether this DateTime is after another date (comparing by year).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is after the other date (comparing by year).
		*/
		isAfterYear(other) {
			return this.diffInYears(other) > 0;
		}
		/**
		* Checks whether this DateTime is before another date.
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date.
		*/
		isBefore(other) {
			return this.diff(other) < 0;
		}
		/**
		* Checks whether this DateTime is before another date (comparing by day).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date (comparing by day).
		*/
		isBeforeDay(other) {
			return this.diffInDays(other) < 0;
		}
		/**
		* Checks whether this DateTime is before another date (comparing by hour).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date (comparing by hour).
		*/
		isBeforeHour(other) {
			return this.diffInHours(other) < 0;
		}
		/**
		* Checks whether this DateTime is before another date (comparing by minute).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date (comparing by minute).
		*/
		isBeforeMinute(other) {
			return this.diffInMinutes(other) < 0;
		}
		/**
		* Checks whether this DateTime is before another date (comparing by month).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date (comparing by month).
		*/
		isBeforeMonth(other) {
			return this.diffInMonths(other) < 0;
		}
		/**
		* Checks whether this DateTime is before another date (comparing by second).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date (comparing by second).
		*/
		isBeforeSecond(other) {
			return this.diffInSeconds(other) < 0;
		}
		/**
		* Checks whether this DateTime is before another date (comparing by week).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date (comparing by week).
		*/
		isBeforeWeek(other) {
			return this.diffInWeeks(other) < 0;
		}
		/**
		* Checks whether this DateTime is before another date (comparing by year).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is before the other date (comparing by year).
		*/
		isBeforeYear(other) {
			return this.diffInYears(other) < 0;
		}
		/**
		* Checks whether this DateTime is between two other dates.
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates.
		*/
		isBetween(start, end) {
			return this.isAfter(start) && this.isBefore(end);
		}
		/**
		* Checks whether this DateTime is between two other dates (comparing by day).
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates (comparing by day).
		*/
		isBetweenDay(start, end) {
			return this.isAfterDay(start) && this.isBeforeDay(end);
		}
		/**
		* Checks whether this DateTime is between two other dates (comparing by hour).
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates (comparing by hour).
		*/
		isBetweenHour(start, end) {
			return this.isAfterHour(start) && this.isBeforeHour(end);
		}
		/**
		* Checks whether this DateTime is between two other dates (comparing by minute).
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates (comparing by minute).
		*/
		isBetweenMinute(start, end) {
			return this.isAfterMinute(start) && this.isBeforeMinute(end);
		}
		/**
		* Checks whether this DateTime is between two other dates (comparing by month).
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates (comparing by month).
		*/
		isBetweenMonth(start, end) {
			return this.isAfterMonth(start) && this.isBeforeMonth(end);
		}
		/**
		* Checks whether this DateTime is between two other dates (comparing by second).
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates (comparing by second).
		*/
		isBetweenSecond(start, end) {
			return this.isAfterSecond(start) && this.isBeforeSecond(end);
		}
		/**
		* Checks whether this DateTime is between two other dates (comparing by week).
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates (comparing by week).
		*/
		isBetweenWeek(start, end) {
			return this.isAfterWeek(start) && this.isBeforeWeek(end);
		}
		/**
		* Checks whether this DateTime is between two other dates (comparing by year).
		* @param {DateTime} start The first date to compare to.
		* @param {DateTime} end The second date to compare to.
		* @returns {boolean} Whether this DateTime is between two other dates (comparing by year).
		*/
		isBetweenYear(start, end) {
			return this.isAfterYear(start) && this.isBeforeYear(end);
		}
		/**
		* Checks whether the DateTime is in daylight saving time.
		* @returns {boolean} Whether the current time is in daylight saving time.
		*/
		isDst() {
			if (!this.#dynamicTz) return false;
			const year = this.getYear();
			const dateA = this.constructor.fromArray([
				year,
				1,
				1
			], { timeZone: this.getTimeZone() });
			const dateB = this.constructor.fromArray([
				year,
				6,
				1
			], { timeZone: this.getTimeZone() });
			return this.getTimeZoneOffset() < Math.max(dateA.getTimeZoneOffset(), dateB.getTimeZoneOffset());
		}
		/**
		* Checks whether the year is a leap year.
		* @returns {boolean} Whether the current year is a leap year.
		*/
		isLeapYear() {
			return this.constructor.isLeapYear(this.getYear());
		}
		/**
		* Checks whether this DateTime is the same as another date.
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date.
		*/
		isSame(other) {
			return this.diff(other) === 0;
		}
		/**
		* Checks whether this DateTime is the same as another date (comparing by day).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date (comparing by day).
		*/
		isSameDay(other) {
			return this.diffInDays(other) === 0;
		}
		/**
		* Checks whether this DateTime is the same as another date (comparing by hour).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date (comparing by hour).
		*/
		isSameHour(other) {
			return this.diffInHours(other) === 0;
		}
		/**
		* Checks whether this DateTime is the same as another date (comparing by minute).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date (comparing by minute).
		*/
		isSameMinute(other) {
			return this.diffInMinutes(other) === 0;
		}
		/**
		* Checks whether this DateTime is the same as another date (comparing by month).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date (comparing by month).
		*/
		isSameMonth(other) {
			return this.diffInMonths(other) === 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date.
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date.
		*/
		isSameOrAfter(other) {
			return this.diff(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date (comparing by day).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date (comparing by day).
		*/
		isSameOrAfterDay(other) {
			return this.diffInDays(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date (comparing by hour).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date (comparing by hour).
		*/
		isSameOrAfterHour(other) {
			return this.diffInHours(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date (comparing by minute).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date (comparing by minute).
		*/
		isSameOrAfterMinute(other) {
			return this.diffInMinutes(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date (comparing by month).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date (comparing by month).
		*/
		isSameOrAfterMonth(other) {
			return this.diffInMonths(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date (comparing by second).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date (comparing by second).
		*/
		isSameOrAfterSecond(other) {
			return this.diffInSeconds(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date (comparing by week).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date (comparing by week).
		*/
		isSameOrAfterWeek(other) {
			return this.diffInWeeks(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or after another date (comparing by year).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or after the other date (comparing by year).
		*/
		isSameOrAfterYear(other) {
			return this.diffInYears(other) >= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date.
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date.
		*/
		isSameOrBefore(other) {
			return this.diff(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date (comparing by day).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date (comparing by day).
		*/
		isSameOrBeforeDay(other) {
			return this.diffInDays(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date (comparing by hour).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date (comparing by hour).
		*/
		isSameOrBeforeHour(other) {
			return this.diffInHours(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date (comparing by minute).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date (comparing by minute).
		*/
		isSameOrBeforeMinute(other) {
			return this.diffInMinutes(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date (comparing by month).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date (comparing by month).
		*/
		isSameOrBeforeMonth(other) {
			return this.diffInMonths(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date (comparing by second).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date (comparing by second).
		*/
		isSameOrBeforeSecond(other) {
			return this.diffInSeconds(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date (comparing by week).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date (comparing by week).
		*/
		isSameOrBeforeWeek(other) {
			return this.diffInWeeks(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as or before another date (comparing by year).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as or before the other date (comparing by year).
		*/
		isSameOrBeforeYear(other) {
			return this.diffInYears(other) <= 0;
		}
		/**
		* Checks whether this DateTime is the same as another date (comparing by second).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date (comparing by second).
		*/
		isSameSecond(other) {
			return this.diffInSeconds(other) === 0;
		}
		/**
		* Checks whether this DateTime is the same as another date (comparing by week).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date (comparing by week).
		*/
		isSameWeek(other) {
			return this.diffInWeeks(other) === 0;
		}
		/**
		* Checks whether this DateTime is the same as another date (comparing by year).
		* @param {DateTime} other The date to compare to.
		* @returns {boolean} Whether this DateTime is the same as the other date (comparing by year).
		*/
		isSameYear(other) {
			return this.diffInYears(other) === 0;
		}
		/**
		* Gets the localized month name for the current date.
		* @param {'long'|'short'|'narrow'} [type='long'] The type of month name to return.
		* @returns {string} The localized month name.
		*/
		monthName(type = "long") {
			return formatMonth(this.getLocale(), this.getMonth(), type);
		}
		/**
		* Sets the DateTime to the start of the day.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfDay() {
			return this.withHours(0, 0, 0, 0);
		}
		/**
		* Sets the DateTime to the start of the hour.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfHour() {
			return this.withMinutes(0, 0, 0);
		}
		/**
		* Sets the DateTime to the start of the minute.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfMinute() {
			return this.withSeconds(0, 0);
		}
		/**
		* Sets the DateTime to the start of the month.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfMonth() {
			return this.withDate(1).startOfDay();
		}
		/**
		* Sets the DateTime to the start of the quarter.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfQuarter() {
			const month = this.getQuarter() * 3 - 2;
			return this.withMonth(month, 1).startOfDay();
		}
		/**
		* Sets the DateTime to the start of the second.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfSecond() {
			return this.withMilliseconds(0);
		}
		/**
		* Sets the DateTime to the start of the week.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfWeek() {
			return this.withWeekDay(1).startOfDay();
		}
		/**
		* Sets the DateTime to the start of the year.
		* @returns {DateTime} A new DateTime instance.
		*/
		startOfYear() {
			return this.withMonth(1, 1).startOfDay();
		}
		/**
		* Subtracts a day from the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		subDay() {
			return this.addDays(-1);
		}
		/**
		* Subtracts days from the current DateTime.
		* @param {number} amount The number of days to subtract.
		* @returns {DateTime} A new DateTime instance.
		*/
		subDays(amount) {
			return this.addDays(-amount);
		}
		/**
		* Subtracts an hour from the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		subHour() {
			return this.addHours(-1);
		}
		/**
		* Subtracts hours from the current DateTime.
		* @param {number} amount The number of hours to subtract.
		* @returns {DateTime} A new DateTime instance.
		*/
		subHours(amount) {
			return this.addHours(-amount);
		}
		/**
		* Subtracts a minute from the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		subMinute() {
			return this.addMinutes(-1);
		}
		/**
		* Subtracts minutes from the current DateTime.
		* @param {number} amount The number of minutes to subtract.
		* @returns {DateTime} A new DateTime instance.
		*/
		subMinutes(amount) {
			return this.addMinutes(-amount);
		}
		/**
		* Subtracts a month from the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		subMonth() {
			return this.addMonths(-1);
		}
		/**
		* Subtracts months from the current DateTime.
		* @param {number} amount The number of months to subtract.
		* @returns {DateTime} A new DateTime instance.
		*/
		subMonths(amount) {
			return this.addMonths(-amount);
		}
		/**
		* Subtracts a second from the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		subSecond() {
			return this.addSeconds(-1);
		}
		/**
		* Subtracts seconds from the current DateTime.
		* @param {number} amount The number of seconds to subtract.
		* @returns {DateTime} A new DateTime instance.
		*/
		subSeconds(amount) {
			return this.addSeconds(-amount);
		}
		/**
		* Subtracts a week from the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		subWeek() {
			return this.addWeeks(-1);
		}
		/**
		* Subtracts weeks from the current DateTime.
		* @param {number} amount The number of weeks to subtract.
		* @returns {DateTime} A new DateTime instance.
		*/
		subWeeks(amount) {
			return this.addWeeks(-amount);
		}
		/**
		* Subtracts a year from the current DateTime.
		* @returns {DateTime} A new DateTime instance.
		*/
		subYear() {
			return this.addYears(-1);
		}
		/**
		* Subtracts years from the current DateTime.
		* @param {number} amount The number of years to subtract.
		* @returns {DateTime} A new DateTime instance.
		*/
		subYears(amount) {
			return this.addYears(-amount);
		}
		/**
		* Returns the primitive representation of the DateTime.
		* @param {'default'|'number'|'string'} hint The conversion hint.
		* @returns {string|number} A string for default/string coercion or epoch milliseconds for numeric coercion.
		*/
		[Symbol.toPrimitive](hint) {
			return hint === "number" ? this.valueOf() : this.toString();
		}
		/**
		* Gets the name of the current time zone.
		* @param {'long'|'short'} [type='long'] The formatting type.
		* @returns {string} The name of the time zone.
		*/
		timeZoneName(type = "long") {
			return this.#dynamicTz ? formatTimeZoneName(this.getLocale(), this.getTime(), this.getTimeZone(), type) : "GMT" + formatOffset(this.getTimeZoneOffset(), true, type === "short");
		}
		/**
		* Formats the current date using "eee MMM dd yyyy".
		* @returns {string} The formatted date string.
		*/
		toDateString() {
			return this.format(formats.date);
		}
		/**
		* Formats the current date using "yyyy-MM-dd'T'HH:mm:ss.SSSxxx".
		* @returns {string} The formatted date string.
		*/
		toIsoString() {
			return this.withLocale("en").withTimeZone("UTC").format(formats.rfc3339_extended);
		}
		/**
		* Returns the JSON representation of the current date.
		* @returns {string|null} The ISO string for valid dates or null for invalid dates.
		*/
		toJSON() {
			return this.isValid ? this.toIsoString() : null;
		}
		/**
		* Formats the current date using "eee MMM dd yyyy HH:mm:ss xx (VV)".
		* @returns {string} The formatted date string.
		*/
		toString() {
			return this.format(formats.string);
		}
		/**
		* Formats the current date using "HH:mm:ss xx (VV)".
		* @returns {string} The formatted date string.
		*/
		toTimeString() {
			return this.format(formats.time);
		}
		/**
		* Formats the current date in the UTC time zone using "eee MMM dd yyyy HH:mm:ss xx (VV)".
		* @returns {string} The formatted date string.
		*/
		toUTCString() {
			return this.withLocale("en").withTimeZone("UTC").toString();
		}
		/**
		* Returns the number of milliseconds since the UNIX epoch.
		* @returns {number} The number of milliseconds since the UNIX epoch.
		*/
		valueOf() {
			return this.getTime();
		}
		/**
		* Gets the number of weeks in the current year.
		* @returns {number} The number of weeks in the current year.
		*/
		weeksInYear() {
			const minDays = minimumDays(this.getLocale());
			return this.withMonth(12, 24 + minDays).getWeek();
		}
		/**
		* Returns a copy with the date of the month changed in the current time zone.
		* @param {number} date The date of the month.
		* @returns {DateTime} A new DateTime instance.
		*/
		withDate(date) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCDate(date));
		}
		/**
		* Returns a copy with the day of the week changed in the current time zone.
		* @param {number} day The day of the week. (0 = Sunday, 6 = Saturday)
		* @returns {DateTime} A new DateTime instance.
		*/
		withDay(day) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCDate(this.getDate() - this.getDay() + parseInt(day, 10)));
		}
		/**
		* Returns a copy with the day of the year changed in the current time zone.
		* @param {number} day The day of the year. (1-366)
		* @returns {DateTime} A new DateTime instance.
		*/
		withDayOfYear(day) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCMonth(0, day));
		}
		/**
		* Returns a copy with the hours changed in the current time zone.
		* @param {...number} args The hours (0-23), optionally followed by minutes
		* (0-59), seconds (0-59), and milliseconds.
		* @returns {DateTime} A new DateTime instance.
		*/
		withHours(...args) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCHours(...args));
		}
		/**
		* Returns a copy with a different locale.
		* @param {string} locale The locale to use.
		* @returns {DateTime} A new DateTime instance.
		*/
		withLocale(locale) {
			return this.#copy({ locale });
		}
		/**
		* Returns a copy with the milliseconds changed in the current time zone.
		* @param {number} milliseconds The milliseconds.
		* @returns {DateTime} A new DateTime instance.
		*/
		withMilliseconds(milliseconds) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCMilliseconds(milliseconds));
		}
		/**
		* Returns a copy with the minutes changed in the current time zone.
		* @param {...number} args The minutes (0-59), optionally followed by seconds
		* (0-59) and milliseconds.
		* @returns {DateTime} A new DateTime instance.
		*/
		withMinutes(...args) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCMinutes(...args));
		}
		/**
		* Returns a copy with the month changed in the current time zone.
		* @param {number} month The month. (1-12)
		* @param {number|null} [date] The date of the month.
		* @returns {DateTime} A new DateTime instance.
		*/
		withMonth(month, date = null) {
			if (date === null) {
				date = this.getDate();
				if (config.clampDates) date = Math.min(date, this.constructor.daysInMonth(this.getYear(), month));
			}
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCMonth(month - 1, date));
		}
		/**
		* Returns a copy with the quarter of the year changed in the current time zone.
		* @param {number} quarter The quarter of the year. (1-4)
		* @returns {DateTime} A new DateTime instance.
		*/
		withQuarter(quarter) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCMonth(quarter * 3 - 3));
		}
		/**
		* Returns a copy with the seconds changed in the current time zone.
		* @param {...number} args The seconds (0-59), optionally followed by
		* milliseconds.
		* @returns {DateTime} A new DateTime instance.
		*/
		withSeconds(...args) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCSeconds(...args));
		}
		/**
		* Returns a copy with a different epoch-millisecond value.
		* @param {number} time The number of milliseconds since the UNIX epoch.
		* @returns {DateTime} A new DateTime instance.
		*/
		withTime(time) {
			return this.#copy({ time });
		}
		/**
		* Returns a copy with a different number of seconds since the UNIX epoch.
		* @param {number} timestamp The number of seconds since the UNIX epoch.
		* @returns {DateTime} A new DateTime instance.
		*/
		withTimestamp(timestamp) {
			return this.withTime(timestamp * 1e3);
		}
		/**
		* Returns a copy in a different time zone.
		* @param {string} timeZone The time zone to use.
		* @returns {DateTime} A new DateTime instance.
		*/
		withTimeZone(timeZone) {
			return this.#copy({ timeZone });
		}
		/**
		* Returns a copy with a fixed numeric UTC offset.
		* @param {number} offset The UTC offset in minutes.
		* @returns {DateTime} A new DateTime instance.
		*/
		withTimeZoneOffset(offset) {
			return this.#copy({ timeZone: formatOffset(offset) });
		}
		/**
		* Returns a copy with the local week changed in the current time zone.
		* @param {number} week The local week.
		* @param {number|null} [day] The local day of the week. (1-7)
		* @returns {DateTime} A new DateTime instance.
		*/
		withWeek(week, day = null) {
			if (day === null) day = this.getWeekDay();
			const minDays = minimumDays(this.getLocale());
			return this.withYear(this.getWeekYear(), 1, minDays + (week - 1) * 7).withWeekDay(day);
		}
		/**
		* Returns a copy with the local day of the week changed in the current time zone.
		* @param {number} day The local day of the week. (1-7)
		* @returns {DateTime} A new DateTime instance.
		*/
		withWeekDay(day) {
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCDate(this.getDate() - this.getWeekDay() + parseInt(day, 10)));
		}
		/**
		* Returns a copy with the week day in month changed in the current time zone.
		* @param {number} week The week day in month.
		* @returns {DateTime} A new DateTime instance.
		*/
		withWeekDayInMonth(week) {
			return this.withDate(this.getDate() + (week - this.getWeekDayInMonth()) * 7);
		}
		/**
		* Returns a copy with the week of month changed in the current time zone.
		* @param {number} week The week of month.
		* @returns {DateTime} A new DateTime instance.
		*/
		withWeekOfMonth(week) {
			return this.withDate(this.getDate() + (week - this.getWeekOfMonth()) * 7);
		}
		/**
		* Returns a copy with the local week year changed in the current time zone.
		* @param {number} year The local week year.
		* @param {number|null} [week] The local week.
		* @param {number|null} [day] The local day of the week. (1-7)
		* @returns {DateTime} A new DateTime instance.
		*/
		withWeekYear(year, week = null, day = null) {
			const minDays = minimumDays(this.getLocale());
			const Constructor = this.constructor;
			if (week === null) week = Math.min(this.getWeek(), Constructor.fromArray([
				year,
				1,
				minDays
			], {
				locale: this.getLocale(),
				timeZone: this.getTimeZone()
			}).weeksInYear());
			if (day === null) day = this.getWeekDay();
			return this.withYear(year, 1, minDays + (week - 1) * 7).withWeekDay(day);
		}
		/**
		* Returns a copy with the year changed in the current time zone.
		* @param {number} year The year.
		* @param {number|null} [month] The month. (1-12)
		* @param {number|null} [date] The date of the month.
		* @returns {DateTime} A new DateTime instance.
		*/
		withYear(year, month = null, date = null) {
			if (month === null) month = this.getMonth();
			if (date === null) {
				date = this.getDate();
				if (config.clampDates) date = Math.min(date, this.constructor.daysInMonth(year, month));
			}
			return setOffsetTime(this, new Date(getOffsetTime(this)).setUTCFullYear(year, month - 1, date));
		}
		/**
		* Creates a copy with overridden values while preserving validity.
		* @param {DateTimeOptions & {time?: number}} options The values to override.
		* @returns {DateTime} A new DateTime instance.
		*/
		#copy({ time = this.getTime(), locale = this.#locale, timeZone = this.#timeZone }) {
			const date = new this.constructor(time, {
				locale,
				timeZone
			});
			date.isValid = this.isValid;
			return date;
		}
	};

//#endregion
return DateTime;
});
//# sourceMappingURL=frost-datetime.js.map
(function(Frost) {

class DateInterval {
    constructor(interval) {
        if (interval) {
            const match = interval.match(DateInterval.isoRegex);

            this.y = match[1] || 0;
            this.m = match[2] || 0;
            this.d = match[4] ? match[4] * 7 : match[3] || 0;
            this.h = match[5] || 0;
            this.i = match[6] || 0;
            this.s = match[7] || 0;
        } else {
            this.y = 0;
            this.m = 0;
            this.d = 0;
            this.h = 0;
            this.i = 0;
            this.s = 0;
        }

        this.days = null;
        this.invert = false;
    }

    format(formatString) {
        const formatTokens = {};

        Object.keys(this.formatData).forEach(key => {
            const token = this.formatData[key].token;
            formatTokens[token] = key;
        });

        let output = '';
        let prefixed = false;
        formatString.split('').forEach(char => {
            if ( ! prefixed && char === '%') {
                prefixed = true;
                return;
            }

            if ( ! prefixed || ! formatTokens[char]) {
                output += char;
                prefixed = false;
                return;
            }

            const key = formatTokens[char];
            output += DateInterval.formatData[key].output(this);
        });

        return output;
    }

    static fromString(string) {
        const interval = new DateInterval();

        const regex = new RegExp(DateInterval.stringRegex, 'gi');

        let match;
        while (match = regex.exec(string)) {
            const type = match[2];
            const value = parseInt(match[1]);
            if (type === 'year') {
                interval.y += value;
            } else if (type === 'month') {
                interval.m += value;
            } else if (type === 'day') {
                interval.d += value;
            } else if (type === 'fortnight' || type === 'forthnight') {
                interval.d += value * 14;
            } else if (type === 'week') {
                interval.d += value * 7;
            } else if (type === 'hour') {
                interval.h += value;
            } else if (type === 'min' || type === 'minute') {
                interval.i += value;
            } else if (type === 'sec' || type === 'second') {
                interval.s += value;
            }
        }

        return interval;
    }
}

Frost.DateInterval = DateInterval;
class DateTime {
    constructor(date = null, timezone = null, offset = null) {

        let timestamp;
        if (date === null) {
            timestamp = Date.now();
        } else if (Frost.isArray(date)) {
            timestamp = Date.UTC(...date);
        } else if (Frost.isNumeric(date)) {
            timestamp = date;
        } else if (Frost.isString(date)) {
            timestamp = Date.parse(date);
        } else if (date instanceof Date || date instanceof DateTime) {
            timestamp = date.getTime();
        } else {
            console.error('Invalid date supplied');
            return false;
        }

        if ( ! timezone) {
            if (offset !== null) {
                timezone = DateTime.timezoneFromOffset(timestamp + offset * 60000, offset);
            } else if (date instanceof DateTime) {
                timezone = date.getTimezone();
            }
        }

        this._timezone = timezone || DateTime.defaultTimezone;
        this._offset = DateTime.calculateTimezoneOffset(this._timezone, timestamp);

        if (this._offset && Frost.isArray(date)) {
            timestamp += this._offset * 60000;
        }

        this._date = new Date(timestamp);
        this._checkOffset();
    }

    getLocalTime() {
        return this._date.getTime() - (this._offset * 60000);
    }

    getLocalTimestamp() {
        return (this._date.getTime() - (this._offset * 60000)) / 1000;
    }

    getTime() {
        return this._date.getTime();
    }

    getTimestamp() {
        return this._date.getTime() / 1000;
    }

    getTimezone() {
        return this._timezone;
    }

    getTimezoneOffset() {
        return this._offset;
    }

    setLocalTime(time) {
        this._date.setTime(time + (this._offset * 60000));
        return this._checkOffset();
    }

    setLocalTimestamp(timestamp) {
        this._date.setTime((timestamp + (this._offset * 60000)) * 1000);
        return this._checkOffset();
    }

    setTime(time) {
        this._date.setTime(time);
        return this._checkOffset();
    }

    setTimestamp(timestamp) {
        this._date.setTime(timestamp * 1000);
        return this._checkOffset();
    }

    setTimezone(timezone) {
        this._timezone = timezone;
        return this._checkOffset();
    }

    setTimezoneOffset(offset) {
        const timezone = DateTime.timezoneFromOffset(this.getTime(), offset);
        if (timezone) {
            this.setTimezone(timezone);
        }
        return this;
    }

    toDateString() {
        return this.format(DateTime.formats.string)
    }

    toLocaleDateString() {
        return this._date.toLocaleDateString();
    }

    toLocaleString() {
        return this._date.toLocaleString();
    }

    toLocaleTimeString() {
        return this._date.toLocaleTimeString();
    }

    toISOString() {
        return this.format(DateTime.formats.rfc3339_extended)
    }

    toString() {
        return this.format(DateTime.formats.string);
    }

    toTimeString() {
        return this.format(DateTime.formats.time);
    }

    toUTCString() {
        return this._date.toUTCString();
    }

    valueOf() {
        return this.getTime();
    }

    [Symbol.toPrimitive](hint) {
        return this._date[Symbol.toPrimitive](hint);
    }

}

Frost.DateTime = DateTime;
class DateTimeImmutable extends DateTime {
    constructor() {
        super(...arguments);
    }

    setLocalTime(time) {
        return new DateTimeImmutable(time + (this._offset * 60000), this._timezone);
    }

    setTime(time) {
        return new DateTimeImmutable(time, this._timezone);
    }

    setTimezone(timezone) {
        return new DateTimeImmutable(this._date.getTime(), timezone);
    }

    setTimezoneOffset(offset) {
        return new DateTimeImmutable(this._date.getTime(), this._timezone, offset);
    }
}

Frost.DateTimeImmutable = DateTimeImmutable;
Object.assign(DateTime.prototype, {

    add(interval) {
        return this.modify(interval);
    },

    date(date = false) {
        return date === false ?
            this.getDate() :
            this.setDate(date);
    },

    day(day = false) {
        return day === false ?
            this.getDay() :
            this.setDay(day);
    },

    dayName(type = 'full') {
        return DateTime.getDayName(this.getDay(), type);
    },

    dayOfYear(day = false) {
        return day === false ?
            this.getDayOfYear() :
            this.setDayOfYear(day);
    },

    hours(hours = false) {
        return hours === false ?
            this.getHours() :
            this.setHours(hours);
    },

    isoDay(day = false) {
        return day === false ?
            this.getIsoDay() :
            this.setIsoDay(day);
    },

    isoWeek(week = false) {
        return week === false ?
            this.getIsoWeek() :
            this.setIsoWeek(week);
    },

    isoYear(year = false) {
        return year === false ?
            this.getIsoYear() :
            this.setIsoYear(year);
    },

    milliseconds(ms = false) {
        return ms === false ?
            this.getMilliseconds() :
            this.setMilliseconds(ms);
    },

    minutes(minutes = false) {
        return minutes === false ?
            this.getMinutes() :
            this.setMinutes(minutes);
    },

    modify(interval, invert = false) {
        if (Frost.isString(interval)) {
            interval = DateInterval.fromString(interval);
        }

        let modify = 1;
 
        if (interval.invert) {
            modify *= -1;
        }
  
        if (invert) {
            modify *= -1;
        }

        const tempDate = new Date(this.getLocalTime());

        if (interval.y) {
            tempDate.setUTCFullYear(tempDate.getUTCFullYear() + (interval.y * modify));
        }

        if (interval.m) {
            tempDate.setUTCMonth(tempDate.getUTCMonth() + (interval.m * modify));
        }

        if (interval.d) {
            tempDate.setUTCDate(tempDate.getUTCDate() + (interval.d * modify));
        }

        if (interval.h) {
            tempDate.setUTCHours(tempDate.getUTCHours() + (interval.h * modify));
        }

        if (interval.i) {
            tempDate.setUTCMinutes(tempDate.getUTCMinutes() + (interval.i * modify));
        }

        if (interval.s) {
            tempDate.setUTCSeconds(tempDate.getUTCSeconds() + (interval.s * modify));
        }

        if (interval.f) {
            tempDate.setUTCTime(tempDate.getUTCTime() + (interval.f * modify));
        }

        return this.setLocalTime(tempDate.getTime());
    },

    month(month = false) {
        return month === false ?
            this.getMonth() + 1 :
            this.setMonth(month - 1);
    },

    monthName(type = 'full') {
        return DateTime.getMonthName(this.getMonth(), type);
    },

    offset(offset = false) {
        return offset === false ?
            this.getTimezoneOffset() :
            this.setTimezoneOffset(offset);
    },

    quarter(quarter = false) {
        return quarter === false ?
            this.getQuarter() :
            this.setQuarter(quarter);
    },

    seconds(seconds = false) {
        return seconds === false ?
            this.getSeconds() :
            this.setSeconds(seconds);
    },

    sub(interval) {
        return this.modify(interval, true);
    },

    time(time = false) {
        return time === false ?
            this.getTime() :
            this.setTime(time);
    },

    timestamp(timestamp = false) {
        return timestamp === false ?
            this.getTimestamp() :
            this.setTimestamp(timestamp);
    },

    timezone(timezone = false) {
        return timezone === false ?
            this.getTimezone() :
            this.setTimezone(timezone);
    },

    year(year = false) {
        return year === false ?
            this.getFullYear() :
            this.setFullYear(year);
    }
});
Object.assign(DateTime.prototype, {

    // Returns the date of the month in local timezone
    getDate() {
        return new Date(this.getLocalTime()).getUTCDate();
    },

    // Returns the day of the week in local timezone
    // (0 - Sunday, 6 - Saturday)
    getDay() {
        return new Date(this.getLocalTime()).getUTCDay();
    },

    // Returns the day of the year in local timezone
    // (1, 366)
    getDayOfYear() {
        const tempDate = new Date(this.getLocalTime());
        return DateTime.dayOfYear(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    },

    // Returns the full year in local timezone
    getFullYear() {
        return new Date(this.getLocalTime()).getUTCFullYear();
    },

    // Returns the hours in local timezone
    // (0, 23)
    getHours() {
        return new Date(this.getLocalTime()).getUTCHours();
    },

    // Returns the ISO day of the week in local timezone
    // (1 - Monday, 7 - Sunday)
    getIsoDay() {
        return DateTime.getIsoDay(this.getDay());
    },

    // Returns the ISO week of the year in local timezone
    getIsoWeek() {
        const tempDate = new Date(this.getLocalTime());
        return DateTime.getIsoWeek(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    },

    // Returns the ISO year in local timezone
    getIsoYear() {
        const tempDate = new Date(this.getLocalTime());
        return DateTime.getIsoYear(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    },

    // Returns the milliseconds in local timezone
    getMilliseconds() {
        return new Date(this.getLocalTime()).getUTCMilliseconds();
    },

    // Returns the minutes in local timezone
    // (0, 59)
    getMinutes() {
        return new Date(this.getLocalTime()).getUTCMinutes();
    },

    // Returns the month in local timezone
    // (0, 11)
    getMonth() {
        return new Date(this.getLocalTime()).getUTCMonth();
    },

    // Returns the quarter of the year in local timezone
    // (1, 4)
    getQuarter() {
        return Math.ceil(this.getMonth() / 3);
    },

    // Returns the seconds in local timezone
    // (0, 59)
    getSeconds() {
        return new Date(this.getLocalTime()).getUTCSeconds();
    },

    // Sets the date of the month in local timezone
    setDate() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCDate(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the day of the week in local timezone
    // (0 - Sunday, 6 - Saturday)
    setDay(day) {
        day = DateTime.parseDay(day);

        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDate.getUTCDay() + day);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the day of the year in local timezone
    setDayOfYear(day) {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(day);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the full year in local timezone
    setFullYear(year, month = null, date = null) {
        const tempDate = new Date(this.getLocalTime());

        month = DateTime.parseMonth(month);

        if (month === null) {
            month = tempDate.getUTCMonth();
        }

        if (date === null) {
            date = tempDate.getUTCDate();
            const daysInMonth = DateTime.daysInMonth(year, month);
            if (date > daysInMonth) {
                date = daysInMonth;
            }
        }

        tempDate.setUTCFullYear(year, month, date);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the hours in local timezone
    // (0, 23)
    setHours() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCHours(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the ISO day of the week in local timezone
    // (1 - Monday, 7 - Sunday)
    setIsoDay(day) {
        day = DateTime.parseDay(day);

        const tempDate = new Date(this.getLocalTime());
        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the ISO week of the year in local timezone
    setIsoWeek(week, day = null) {
        const tempDate = new Date(this.getLocalTime());

        if (day === null) {
            day = DateTime.getIsoDay(tempDate.getUTCDay());
        }

        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(4 + ((week - 1) * 7));

        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
 
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the ISO year in local timezone
    setIsoYear(year, week = null, day = null) {
        const tempDate = new Date(this.getLocalTime());

        if (week === null) {
            week = DateTime.getIsoWeek(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
        }

        if (day === null) {
            day = DateTime.getIsoDay(tempDate.getUTCDay());
        }

        tempDate.setUTCFullYear(year, 0, 4);
        tempDate.setUTCDate(4 + ((week - 1) * 7));

        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);

        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the milliseconds in local timezone
    setMilliseconds() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMilliseconds(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the minutes in local timezone
    // (0, 59)
    setMinutes() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMinutes(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the month in local timezone
    // (0, 11)
    setMonth(month, date = null) {
        const tempDate = new Date(this.getLocalTime());
 
        month = DateTime.parseMonth(month);

        if (date === null) {
            date = tempDate.getUTCDate();
            const daysInMonth = DateTime.daysInMonth(tempDate.getUTCFullYear(), month);
            if (date > daysInMonth) {
                date = daysInMonth;
            }
        }

        tempDate.setUTCMonth(month, date);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the quarter in local timezone
    // (1, 4)
    setQuarter(quarter) {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMonth(quarter * 3 - 3);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the seconds in local timezone
    // (0, 59)
    setSeconds() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCSeconds(...arguments);
        return this.setLocalTime(tempDate.getTime());
    }
});
Object.assign(DateTime.prototype, {

    // Returns the date of the month in UTC timezone
    getUTCDate() {
        return this._date.getUTCDate();
    },

    // Returns the day of the week in UTC timezone
    // (0 - Sunday, 6 - Saturday)
    getUTCDay() {
        return this._date.getUTCDay();
    },

    // Returns the day of the year in UTC timezone
    // (1, 366)
    getUTCDayOfYear() {
        return DateTime.dayOfYear(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate());
    },

    // Returns the full year in UTC timezone
    getUTCFullYear() {
        return this._date.getUTCFullYear();
    },

    // Returns the hours in UTC timezone
    // (0, 23)
    getUTCHours() {
        return this._date.getUTCHours();
    },

    // Returns the ISO day of the week in UTC timezone
    // (1 - Monday, 7 - Sunday)
    getUTCIsoDay() {
        return DateTime.getIsoDay(this.getUTCDay());
    },

    // Returns the ISO week of the year in UTC timezone
    getUTCIsoWeek() {
        return DateTime.getIsoWeek(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate());
    },

    // Returns the ISO year in UTC timezone
    getUTCIsoYear() {
        return DateTime.getIsoYear(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate());
    },

    // Returns the milliseconds in UTC timezone
    getUTCMilliseconds() {
        return this._date.getUTCMilliseconds();
    },

    // Returns the minutes in UTC timezone
    // (0, 59)
    getUTCMinutes() {
        return this._date.getUTCMinutes();
    },

    // Returns the month in UTC timezone
    // (0, 11)
    getUTCMonth() {
        return this._date.getUTCMonth();
    },

    // Returns the quarter of the year in UTC timezone
    // (1, 4)
    getUTCQuarter() {
        return Math.ceil(this._date.getUTCMonth() / 3);
    },

    // Returns the seconds in UTC timezone
    // (0, 59)
    getUTCSeconds() {
        return this._date.getUTCSeconds();
    },

    // Sets the date of the month in UTC timezone
    setUTCDate() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCDate(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the day of the week in UTC timezone
    // (0 - Sunday, 6 - Saturday)
    setUTCDay(day) {
        day = DateTime.parseDay(day);

        const tempDate = new Date(this.getTime());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDate.getUTCDay() + day);
        return this.setTime(tempDate.getTime());
    },

    // Sets the day of the year in UTC timezone
    setUTCDayOfYear(day) {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(day);
        return this.setTime(tempDate.getTime());
    },

    // Sets the full year in UTC timezone
    setUTCFullYear(year, month = null, date = null) {
        const tempDate = new Date(this.getTime());

        month = DateTime.parseMonth(month);

        if (month === null) {
            month = tempDate.getUTCMonth();
        }

        if (date === null) {
            date = tempDate.getUTCDate();
            const daysInMonth = DateTime.daysInMonth(year, month);
            if (date > daysInMonth) {
                date = daysInMonth;
            }
        }

        tempDate.setUTCFullYear(year, month, date);
        return this.setTime(tempDate.getTime());
    },

    // Sets the hours in UTC timezone
    // (0, 23)
    setUTCHours() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCHours(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the ISO day of the week in UTC timezone
    // (1 - Monday, 7 - Sunday)
    setUTCIsoDay(day) {
        day = DateTime.parseDay(day);

        const tempDate = new Date(this.getTime());
        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
        return this.setTime(tempDate.getTime());
    },

    // Sets the ISO week of the year in UTC timezone
    setUTCIsoWeek(week, day = null) {
        const tempDate = new Date(this.getTime());

        if (day === null) {
            day = DateTime.getIsoDay(tempDate.getUTCDay());
        }

        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(4 + ((week - 1) * 7));

        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
 
        return this.setTime(tempDate.getTime());
    },

    // Sets the ISO year in UTC timezone
    setUTCIsoYear(year, week = null, day = null) {
        const tempDate = new Date(this.getTime());

        if (week === null) {
            week = DateTime.getIsoWeek(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
        }

        if (day === null) {
            day = DateTime.getIsoDay(tempDate.getUTCDay());
        }

        tempDate.setUTCFullYear(year, 0, 4);
        tempDate.setUTCDate(4 + ((week - 1) * 7));

        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);

        return this.setTime(tempDate.getTime());
    },

    // Sets the milliseconds in UTC timezone
    setUTCMilliseconds() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMilliseconds(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the minutes in UTC timezone
    // (0, 59)
    setUTCMinutes() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMinutes(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the month in UTC timezone
    // (0, 11)
    setUTCMonth(month, date = null) {
        const tempDate = new Date(this.getTime());
  
        month = DateTime.parseMonth(month);

        if (date === null) {
            date = tempDate.getUTCDate();
            const daysInMonth = DateTime.daysInMonth(tempDate.getUTCFullYear(), month);
            if (date > daysInMonth) {
                date = daysInMonth;
            }
        }

        tempDate.setUTCMonth(month, date);
        return this.setTime(tempDate.getTime());
    },

    // Sets the quarter in UTC timezone
    // (1, 4)
    setUTCQuarter() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMonth(quarter * 3 - 3);
        return this.setTime(tempDate.getTime());
    },

    // Sets the seconds in UTC timezone
    // (0, 59)
    setUTCSeconds() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCSeconds(...arguments);
        return this.setTime(tempDate.getTime());
    }
});
Object.assign(DateTime.prototype, {

    _checkOffset() {
        this._offset = DateTime.calculateTimezoneOffset(this._timezone, this._date.getTime());

        return this;
    },

    dateSuffix() {
        return DateTime.dateSuffix(this.getDate());
    },

    daysInMonth() {
        return DateTime.daysInMonth(this.getFullYear(), this.getMonth());
    },

    daysInYear() {
        return DateTime.daysInYear(this.getFullYear());
    },

    diff(other, absolute = false) {
        const interval = new DateInterval();

        const tempDate = new Date(this.getTime());
        const otherDate = new Date(other.getTime());

        interval.y = Math.abs(tempDate.getUTCFullYear() - otherDate.getUTCFullYear());
        interval.m = Math.abs(tempDate.getUTCMonth() - otherDate.getUTCMonth());
        interval.d = Math.abs(tempDate.getUTCDate() - otherDate.getUTCDate());
        interval.h = Math.abs(tempDate.getUTCHours() - otherDate.getUTCHours());
        interval.i = Math.abs(tempDate.getUTCMinutes() - otherDate.getUTCMinutes());
        interval.s = Math.abs(tempDate.getUTCSeconds() - otherDate.getUTCSeconds());
        interval.f = Math.abs((tempDate.getUTCMilliseconds() - otherDate.getUTCMilliseconds()) * 1000);
        interval.days = Math.abs((tempDate - otherDate) / 86400000);
        interval.invert = ! absolute && date < otherDate;

        return interval;
    },

    format(formatString) {
        const formatTokens = DateTime.formatTokens(true);
        const date = new Date(this.getLocalTime());

        let output = '';
        let escaped = false;
        formatString.split('').forEach(char => {
            if ( ! escaped && char === '\\') {
                escaped = true;
                return;
            }

            if (escaped || ! formatTokens[char]) {
                output += char;
                escaped = false;
                return;
            }

            const key = formatTokens[char];
            output += DateTime.formatData[key].output(date, this);
        });

        return output;
    },

    isDST() {
        return this._offset < this.standardOffset();
    },

    isLeapYear() {
        return DateTime.isLeapYear(this.getFullYear());
    },

    isoWeeksInYear() {
        return DateTime.isoWeeksInYear(this.getFullYear());
    },

    standardOffset() {
        return DateTime.standardOffset(this.getFullYear(), this._timezone);
    }

});
DateTime.formatData = {

    /* YEAR */

    // leap year
    leapYear: {
        token: 'L',
        output: date => FrostDate.isLeapYear(date.getUTCFullYear()) ? 1 : 0
    },

    // year
    year: {
        token: 'Y',
        regex: () => '(\\d{1,4})',
        input: (date, value) => date.year = value,
        output: date => date.getUTCFullYear()
    },

    // year short
    yearShort: {
        token: 'y',
        regex: () => '(\\d{2})',
        input: (date, value) => {
            value += value < 70 ? 2000 : 1900;
            date.year = value;
        },
        output: date => {
            const year = '' + date.getUTCFullYear();
            return year.substring(year.length - 2);
        }
    },

    // iso year
    isoYear: {
        token: 'o',
        output: date => DateTime.getIsoYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    },

    /* MONTH */

    // month name
    monthName: {
        token: 'F',
        regex: () =>  '(' + DateTime.lang.months.full.join('|') + ')',
        input: (date, value) => date.month = DateTime.getMonthFromName(value),
        output: date => DateTime.getMonthName(date.getUTCMonth())
    },

    // month name short
    monthNameShort: {
        token: 'M',
        regex: () =>  '(' + DateTime.lang.months.short.join('|') + ')',
        input: (date, value) => date.month = DateTime.getMonthFromName(value, 'short'),
        output: date => DateTime.getMonthName(date.getUTCMonth(), 'short')
    },

    // month
    month: {
        token: 'm',
        regex: () => '(\\d{2})',
        input: (date, value) => date.month = value - 1,
        output: date => Frost.padString(date.getUTCMonth() + 1, 2)
    },

    // month short
    monthShort: {
        token: 'n',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.month = value - 1,
        output: date => date.getUTCMonth() + 1
    },

    // days in month
    daysInMonth: {
        token: 't',
        output: date => DateTime.daysInMonth(date.getUTCFullYear(), date.getUTCMonth())
    },

    /* WEEKS */

    // iso week
    isoWeek: {
        token: 'W',
        output: date => DateTime.getIsoWeek(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    },

    /* DAYS */

    // day of year
    dayOfYear: {
        token: 'z',
        regex: () => '(\\d{1,3})',
        input: (date, value) => date.dayOfYear = value + 1,
        output: date => DateTime.dayOfYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - 1
    },

    // date
    date: {
        token: 'd',
        regex: () => '(\\d{2})',
        input: (date, value) => date.date = value,
        output: date => Frost.padString(date.getUTCDate(), 2)
    },

    // date short
    dateShort: {
        token: 'j',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.date = value,
        output: date => date.getUTCDate()
    },

    // ordinal suffix
    dateSuffix: {
        token: 'S',
        regex: () =>  '(' + DateTime.lang.ordinal.join('|') + ')',
        output: date => DateTime.dateSuffix(date.getUTCDate())
    },

    // iso day
    isoDay: {
        token: 'N',
        output: date => DateTime.getIsoDay(date.getUTCDay())
    },

    // day of week
    day: {
        token: 'w',
        output: date => date.getUTCDay()
    },

    // day name
    dayName: {
        token: 'l',
        regex: () =>  '(' + DateTime.lang.days.full.join('|') + ')',
        input: (date, value) => date.day = DateTime.getDayFromName(value),
        output: date => DateTime.getDayName(date.getUTCDay())
    },

    // day name short
    dayNameShort: {
        token: 'D',
        regex: () =>  '(' + DateTime.lang.days.short.join('|') + ')',
        input: (date, value) => date.day = DateTime.getDayFromName(value, 'short'),
        output: date => DateTime.getDayName(date.getUTCDay(), 'short')
    },

    /* TIME */

    // hours (24)
    hours24: {
        token: 'H',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours = value,
        output: date => Frost.padString(date.getUTCHours(), 2)
    },

    // hours short (24)
    hours24Short: {
        token: 'G',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours = value,
        output: date => date.getUTCHours()
    },

    // hours (12)
    hours12: {
        token: 'h',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours = value % 12,
        output: date => Frost.padString(date.getUTCHours() % 12 || 12, 2)
    },

    // hours short (12)
    hours12Short: {
        token: 'g',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours = value % 12,
        output: date => date.getUTCHours() % 12 || 12
    },

    // minutes
    minutes: {
        token: 'i',
        regex: () => '(\\d{2})',
        input: (date, value) => date.minutes = value,
        output: date => Frost.padString(date.getUTCMinutes(), 2)
    },

    // seconds
    seconds: {
        token: 's',
        regex: () => '(\\d{2})',
        input: (date, value) => date.seconds = value,
        output: date => Frost.padString(date.getUTCSeconds(), 2)
    },

    // microseconds
    microseconds: {
        token: 'u',
        regex: () => '(\\d{1,6})',
        input: (date, value) => date.milliseconds = value / 1000,
        output: date => date.getUTCMilliseconds() * 1000
    },

    // milliseconds
    milliseconds: {
        token: 'v',
        output: date => date.getUTCMilliseconds()
    },

    /* TIMEZONE */

    // timezone
    timezone: {
        token: 'e',
        regex: () => '(\\w+\\/\\w+|\\w+)',
        input: (date, value) => date.timezone = value,
        output: (date, datetime) => datetime._timezone
    },

    // daylight savings
    dst: {
        token: 'I',
        output: (date, datetime) => datetime.isDST() ? 1 : 0
    },

    // offset
    offset: {
        token: 'O',
        regex: () => '([\\+\\-]\\d{4})',
        input: (date, value) => date.offset = (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(3, 5))
        )
        * (value[0] === '-' ? 1 : -1),
        output: (date, datetime) => (datetime._offset > 0 ? '-' : '+') +
            Frost.padString(Math.abs(Math.floor(datetime._offset / 60)), 2) +
            Frost.padString(datetime._offset % 60, 2)
    },

    // offset colon
    offsetColon: {
        token: 'P',
        regex: () => '([\\+\\-]\\d{2}\\:\\d{2})',
        input: (date, value) => date.offset = (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(4, 6))
        )
        * (value[0] === '-' ? 1 : -1),
        output: (date, datetime) => (datetime._offset > 0 ? '-' : '+') +
            Frost.padString(Math.abs(Math.floor(datetime._offset / 60)), 2) + 
            ':' + 
            Frost.padString(datetime._offset % 60, 2)
    },

    // timezone abbreviated
    timezoneAbbr: {
        token: 'T',
        regex: () => '([A-Z]{1,5})',
        input: (date, value) => date.timezone = date.timezone ||
            Object.keys(DateTime.timezones).find(timezone => timezone.abbr === value || timezone.abbrDST === value),
        output: (date, datetime) => DateTime.timezoneAbbr(datetime._timezone, datetime.isDST())
    },

    // offset seconds
    offsetSeconds: {
        token: 'Z',
        input: (date, value) => date.offset = value / 60,
        output: (date, datetime) => datetime._offset * -60
    },

    /* FULL */

    // timestamp
    iso8601: {
        token: 'c',
        output: (date, datetime) => datetime.toISOString()
    },

    rfc2822: {
        token: 'r',
        output: (date, datetime) => datetime.format(DateTime.formats.rfc822)
    },

    timestamp: {
        token: 'U',
        regex: () => '(\\d+)',
        input: (date, value) => date.timestamp = value,
        output: (date, datetime) => datetime.getTime()
    },

    /* SPECIAL */

    // space
    space: {
        token: ' ',
        regex: () => '(\\s)'
    },

    seperator: {
        token: '#',
        regex: () => '([' + DateTime.seperators.map(seperator => '\\' + seperator).join('') + '])'
    },

    seperators: {
        regex: char => '(\\' + char + ')'
    },

    wildcard: {
        token: '?',
        regex: () => '(.)'
    },

    wildcards: {
        token: '*',
        regex: () => '([^' + DateTime.seperators.map(seperator => '\\' + seperator).concat(DateTime.lang.digits).join('') + ']+)'
    },

    reset: {
        token: '!',
        regex: () => '\\!',
        input: date => {
            const epoch = new DateTime();
            epoch.time(0);
            Object.assign(date, epoch.toObject());
        }
    },

    resetSoft: {
        token: '|',
        regex: () => '\\|',
        input: date => {
            const epoch = new DateTime();
            epoch.time(0);

            const obj = epoch.toObject();
            Object.keys(obj).forEach(key => {
                if (date[key] !== false) {
                    return;
                }

                date[key] = obj[key];
            });
        }
    }
};
DateInterval.formatData = {

    percent: {
        token: '%',
        output: () => '%'
    },

    years: {
        token: 'Y',
        output: interval => Frost.padString(interval.y, 2)
    },

    yearsShort: {
        token: 'y',
        output: interval => interval.y
    },

    months: {
        token: 'M',
        output: interval => Frost.padString(interval.m, 2)
    },

    monthsShort: {
        token: 'm',
        output: interval => interval.m
    },

    days: {
        token: 'D',
        output: interval => Frost.padString(interval.d, 2)
    },

    daysShort: {
        token: 'D',
        output: interval => interval.d
    },

    daysTotal: {
        token: 'a',
        output: interval => interval.days
    },

    hours: {
        token: 'H',
        output: interval => Frost.padString(interval.h, 2)
    },

    hoursShort: {
        token: 'h',
        output: interval => interval.h
    },

    minutes: {
        token: 'I',
        output: interval => Frost.padString(interval.i, 2)
    },

    minutesShort: {
        token: 'i',
        output: interval => interval.i
    },

    seconds: {
        token: 'S',
        output: interval => Frost.padString(interval.s, 2)
    },

    secondsShort: {
        token: 's',
        output: interval => interval.s
    },

    microseconds: {
        token: 'F',
        output: interval => Frost.padString(interval.f, 6)
    },

    microsecondsShort: {
        token: 'f',
        output: interval => interval.f
    },

    sign: {
        token: 'R',
        output: interval => interval.invert ? '-' : '+'
    },

    signShort: {
        token: 'r',
        output: interval => interval.invert ? '-' : ''
    }
};
Object.assign(DateTime, {

    calculateTimezoneOffset(timezone, date) {
        const localOptions = Object.assign({}, this.utcOptions);
        localOptions.timeZone = timezone;

        const localFormatter = new Intl.DateTimeFormat(this.utcLocale, localOptions);
        const utcString = this.utcFormatter.format(date);
        const localString = localFormatter.format(date);

        const utcDate = new Date(utcString);
        const localDate = new Date(localString);
        return (utcDate - localDate) / 60000;
    },

    dateSuffix(date) {
        const j = date % 10;
        const k = date % 100;

        if (j === 1 && k !== 11) {
            return this.lang.ordinal[0];
        }

        if (j === 2 && k !== 12) {
            return this.lang.ordinal[1];
        }

        if (j === 3 && k !== 13) {
            return this.lang.ordinal[2];
        }

        return this.lang.ordinal[3];
    },

    dayOfYear(year, month, date) {
        for (let i = 0; i < month; i++) {
            date += this.daysInMonth(year, i);
        }

        return date;
    },

    daysInMonth(year, month) {
        month = new Date(year, month).getMonth();
        let days = this.monthDays[month];

        if (month == 1 && this.isLeapYear(year)) {
            days++;
        }

        return days;
    },

    daysInYear(year) {
        return ! this.isLeapYear(year) ? 365 : 366;
    },

    formatTokens(output = false) {
        const tokens = {};

        Object.keys(this.formatData).forEach(key => {
            if ( ! this.formatData[key].token ||
                (output && ! this.formatData[key].output) ||
                ( ! output && ! this.formatData[key].regex)) {
                return;
            }

            const token = this.formatData[key].token;
            tokens[token] = key;
        });

        if ( ! output) {
            this.seperators.forEach(seperator => {
                tokens[seperator] = 'seperators';
            });
        }

        return tokens;
    },

    fromFormat(dateString, formatString) {

        const dateData = {};

        const formatTokens = this.formatTokens();

        formatString.split('').forEach(char => {
            if ( ! formatTokens[char]) {
                console.error('Invalid character in DateTime format string: ' + char);
                return false;
            }

            const key = formatTokens[char];

            const regex = this.formatData[key].regex(char);
            const dateMatch = dateString.match(new RegExp(regex));
            if ( ! dateMatch) {
                console.error('Unmatched character in DateTime format string: ' + char);
                return false;
            }

            dateString = dateString.substring(dateMatch[1].length);

            if ( ! this.formatData[key].input) {
                return;
            }

            this.formatData[key].input(dateData, dateMatch[1]);
        });

        return this.fromObject(dateData);
    },

    fromObject(dateData) {

        let dateinit;
        if (dateData.timestamp) {
            dateinit = dateData.timestamp * 1000;
        } else {
            const now = new Date();
            const year = dateData.year || now.getFullYear();

            let month;
            let date;
            if (dateData.dayOfYear && ( ! dateData.month || ! dateData.date)) {
                month = 0;
                date = dateData.dayOfyear();
            } else {
                month = dateData.month - 1 || now.getMonth();
                date = dateData.date || now.getDate();
            }

            dateinit = [
                year,
                month,
                date,
                dateData.hours || now.getHours(),
                dateData.minutes || now.getMinutes(),
                dateData.seconds || now.getSeconds(),
                dateData.milliseconds || now.getMilliseconds()
            ];
        }

        return new this(dateinit, dateData.timezone || null, dateData.offset || null);
    },

    getDayFromName(day, type = 'full') {
        const index = DateTime.lang.days[type].findIndex(value => Frost.matchesString(value, day, true));
        return index >= 0 ? index : false;
    },

    getDayName(day, type = 'full') {
        return DateTime.lang.days[type][day];
    },

    getMonthFromName(month, type = 'full') {
        const index = DateTime.lang.months[type].findIndex(value => Frost.matchesString(value, month, true));
        return index >= 0 ? index : false;
    },

    getMonthName(day, type = 'full') {
        return DateTime.lang.months[type][day];
    },

    getIsoDay(day) {
        return ((day + 6) % 7) + 1;
    },

    getIsoWeek() {
        const currentWeek = new Date(...arguments);
        const currentDay = this.getIsoDay(currentWeek.getUTCDay());
        currentWeek.setUTCDate(currentWeek.getUTCDate() - currentDay + 4);

        const firstWeek = new Date(currentWeek.getUTCFullYear(), 0, 4);
        const firstDay = this.getIsoDay(firstWeek.getUTCDay());
        firstWeek.setUTCDate(firstWeek.getUTCDate() - firstDay + 4);

        return 1 + Math.floor((currentWeek - firstWeek) / 604800000);
    },

    getIsoYear() {
        const tempDate = new Date(...arguments);
        const isoDay = this.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - isoDay + 4);
        return tempDate.getUTCFullYear();
    },

    isLeapYear(year) {
        return year & 3 != 0 && (year % 100 != 0 || year % 400 != 0);
    },

    isoWeeksInYear(year) {
        const date = new DateTime([year, 12, 28]);
        return date.getIsoWeek();
    },

    parseDay(day) {
        return Frost.isNumeric(day) ? day :
            DateTime.getDayFromName(day) ||
            DateTime.getDayFromName(day, 'short') ||
            DateTime.getDayFromName(day, 'min') ||
            null;
    },

    parseMonth(month) {
        return Frost.isNumeric(month) ? month :
            DateTime.getMonthFromName(month) ||
            DateTime.getMonthFromName(month, 'short') ||
            null;
    },

    standardOffset(year, timezone) {
        const jan = new DateTime([year, 0, 1], timezone);
        const jul = new DateTime([year, 6, 1], timezone);

        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    },

    timezoneAbbr(timezone, dst = false) {
        return dst ?
            this.timezones[timezone].abbrDST :
            this.timezones[timezone].abbr;
    },

    timezoneFromOffset(timestamp, offset) {
        return Object.keys(this.timezones)
            .find(timezone => this.calculateTimezoneOffset(timezone, timestamp) === offset);
    }
});

DateTime.timezones = {
	'Z': {
		abbr: 'Z'
	},
	'Africa/Abidjan': {
		abbr: 'GMT'
	},
	'Africa/Accra': {
		abbr: 'GMT'
	},
	'Africa/Addis_Ababa': {
		abbr: 'EAT'
	},
	'Africa/Algiers': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Africa/Asmara': {
		abbr: 'EAT'
	},
	'Africa/Asmera': {
		abbr: 'EAT'
	},
	'Africa/Bamako': {
		abbr: 'GMT'
	},
	'Africa/Bangui': {
		abbr: 'WAT'
	},
	'Africa/Banjul': {
		abbr: 'GMT'
	},
	'Africa/Bissau': {
		abbr: 'GMT'
	},
	'Africa/Blantyre': {
		abbr: 'CAT'
	},
	'Africa/Brazzaville': {
		abbr: 'WAT'
	},
	'Africa/Bujumbura': {
		abbr: 'CAT'
	},
	'Africa/Cairo': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Africa/Casablanca': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Africa/Ceuta': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Africa/Conakry': {
		abbr: 'GMT'
	},
	'Africa/Dakar': {
		abbr: 'GMT'
	},
	'Africa/Dar_es_Salaam': {
		abbr: 'EAT'
	},
	'Africa/Djibouti': {
		abbr: 'EAT'
	},
	'Africa/Douala': {
		abbr: 'WAT'
	},
	'Africa/El_Aaiun': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Africa/Freetown': {
		abbr: 'GMT'
	},
	'Africa/Gaborone': {
		abbr: 'CAT'
	},
	'Africa/Harare': {
		abbr: 'CAT'
	},
	'Africa/Johannesburg': {
		abbr: 'SAST',
		abbrDST: 'SAST'
	},
	'Africa/Juba': {
		abbr: 'EAT',
		abbrDST: 'CAST'
	},
	'Africa/Kampala': {
		abbr: 'EAT'
	},
	'Africa/Khartoum': {
		abbr: 'EAT',
		abbrDST: 'CAST'
	},
	'Africa/Kigali': {
		abbr: 'CAT'
	},
	'Africa/Kinshasa': {
		abbr: 'WAT'
	},
	'Africa/Lagos': {
		abbr: 'WAT'
	},
	'Africa/Libreville': {
		abbr: 'WAT'
	},
	'Africa/Lome': {
		abbr: 'GMT'
	},
	'Africa/Luanda': {
		abbr: 'WAT'
	},
	'Africa/Lubumbashi': {
		abbr: 'CAT'
	},
	'Africa/Lusaka': {
		abbr: 'CAT'
	},
	'Africa/Malabo': {
		abbr: 'WAT'
	},
	'Africa/Maputo': {
		abbr: 'CAT'
	},
	'Africa/Maseru': {
		abbr: 'SAST',
		abbrDST: 'SAST'
	},
	'Africa/Mbabane': {
		abbr: 'SAST',
		abbrDST: 'SAST'
	},
	'Africa/Mogadishu': {
		abbr: 'EAT'
	},
	'Africa/Monrovia': {
		abbr: 'MMT'
	},
	'Africa/Nairobi': {
		abbr: 'EAT'
	},
	'Africa/Ndjamena': {
		abbr: 'WAT',
		abbrDST: 'WAST'
	},
	'Africa/Niamey': {
		abbr: 'WAT'
	},
	'Africa/Nouakchott': {
		abbr: 'GMT'
	},
	'Africa/Ouagadougou': {
		abbr: 'GMT'
	},
	'Africa/Porto-Novo': {
		abbr: 'WAT'
	},
	'Africa/Sao_Tome': {
		abbr: 'GMT'
	},
	'Africa/Timbuktu': {
		abbr: 'GMT'
	},
	'Africa/Tripoli': {
		abbr: 'EET',
		abbrDST: 'CEST'
	},
	'Africa/Tunis': {
		abbr: 'PMT',
		abbrDST: 'CEST'
	},
	'Africa/Windhoek': {
		abbr: 'WAT',
		abbrDST: 'WAST'
	},
	'America/Adak': {
		abbr: 'NST',
		abbrDST: 'NWT'
	},
	'America/Anchorage': {
		abbr: 'YST',
		abbrDST: 'AWT'
	},
	'America/Anguilla': {
		abbr: 'AST'
	},
	'America/Antigua': {
		abbr: 'AST'
	},
	'America/Argentina/Buenos_Aires': {
		abbr: 'CMT'
	},
	'America/Argentina/Catamarca': {
		abbr: 'CMT'
	},
	'America/Argentina/ComodRivadavia': {
		abbr: 'CMT'
	},
	'America/Argentina/Cordoba': {
		abbr: 'CMT'
	},
	'America/Argentina/Jujuy': {
		abbr: 'CMT'
	},
	'America/Argentina/La_Rioja': {
		abbr: 'CMT'
	},
	'America/Argentina/Mendoza': {
		abbr: 'CMT'
	},
	'America/Argentina/Rio_Gallegos': {
		abbr: 'CMT'
	},
	'America/Argentina/Salta': {
		abbr: 'CMT'
	},
	'America/Argentina/San_Juan': {
		abbr: 'CMT'
	},
	'America/Argentina/San_Luis': {
		abbr: 'CMT'
	},
	'America/Argentina/Tucuman': {
		abbr: 'CMT'
	},
	'America/Argentina/Ushuaia': {
		abbr: 'CMT'
	},
	'America/Aruba': {
		abbr: 'AST'
	},
	'America/Asuncion': {
		abbr: 'AMT'
	},
	'America/Atikokan': {
		abbr: 'EST',
		abbrDST: 'CWT'
	},
	'America/Atka': {
		abbr: 'NST',
		abbrDST: 'NWT'
	},
	'America/Bahia_Banderas': {
		abbr: 'PST',
		abbrDST: 'MDT'
	},
	'America/Barbados': {
		abbr: 'BMT',
		abbrDST: 'ADT'
	},
	'America/Belize': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'America/Blanc-Sablon': {
		abbr: 'AST',
		abbrDST: 'AWT'
	},
	'America/Bogota': {
		abbr: 'BMT'
	},
	'America/Boise': {
		abbr: 'PST',
		abbrDST: 'PDT'
	},
	'America/Buenos_Aires': {
		abbr: 'CMT'
	},
	'America/Cambridge_Bay': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/Cancun': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Caracas': {
		abbr: 'CMT'
	},
	'America/Catamarca': {
		abbr: 'CMT'
	},
	'America/Cayman': {
		abbr: 'EST'
	},
	'America/Chicago': {
		abbr: 'EST',
		abbrDST: 'CWT'
	},
	'America/Chihuahua': {
		abbr: 'MST',
		abbrDST: 'MDT'
	},
	'America/Coral_Harbour': {
		abbr: 'EST',
		abbrDST: 'CWT'
	},
	'America/Cordoba': {
		abbr: 'CMT'
	},
	'America/Costa_Rica': {
		abbr: 'SJMT',
		abbrDST: 'CDT'
	},
	'America/Creston': {
		abbr: 'PST'
	},
	'America/Curacao': {
		abbr: 'AST'
	},
	'America/Danmarkshavn': {
		abbr: 'GMT'
	},
	'America/Dawson': {
		abbr: 'YST',
		abbrDST: 'YWT'
	},
	'America/Dawson_Creek': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Denver': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/Detroit': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'America/Dominica': {
		abbr: 'AST'
	},
	'America/Edmonton': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/El_Salvador': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'America/Ensenada': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Fort_Nelson': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Fort_Wayne': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Glace_Bay': {
		abbr: 'AST',
		abbrDST: 'AWT'
	},
	'America/Goose_Bay': {
		abbr: 'NST',
		abbrDST: 'NWT'
	},
	'America/Grand_Turk': {
		abbr: 'KMT',
		abbrDST: 'EDT'
	},
	'America/Grenada': {
		abbr: 'AST'
	},
	'America/Guadeloupe': {
		abbr: 'AST'
	},
	'America/Guatemala': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'America/Guayaquil': {
		abbr: 'QMT'
	},
	'America/Halifax': {
		abbr: 'AST',
		abbrDST: 'AWT'
	},
	'America/Havana': {
		abbr: 'HMT',
		abbrDST: 'CDT'
	},
	'America/Hermosillo': {
		abbr: 'PST',
		abbrDST: 'MDT'
	},
	'America/Indiana/Indianapolis': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Indiana/Knox': {
		abbr: 'EST',
		abbrDST: 'CWT'
	},
	'America/Indiana/Marengo': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Indiana/Petersburg': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Indiana/Tell_City': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Indiana/Vevay': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Indiana/Vincennes': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Indiana/Winamac': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Indianapolis': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Inuvik': {
		abbr: 'PST',
		abbrDST: 'PDDT'
	},
	'America/Iqaluit': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'America/Jamaica': {
		abbr: 'KMT',
		abbrDST: 'EDT'
	},
	'America/Jujuy': {
		abbr: 'CMT'
	},
	'America/Juneau': {
		abbr: 'YST',
		abbrDST: 'YDT'
	},
	'America/Kentucky/Louisville': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Kentucky/Monticello': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Knox_IN': {
		abbr: 'EST',
		abbrDST: 'CWT'
	},
	'America/Kralendijk': {
		abbr: 'AST'
	},
	'America/La_Paz': {
		abbr: 'CMT',
		abbrDST: 'BOST'
	},
	'America/Los_Angeles': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Louisville': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Lower_Princes': {
		abbr: 'AST'
	},
	'America/Managua': {
		abbr: 'MMT',
		abbrDST: 'CDT'
	},
	'America/Marigot': {
		abbr: 'AST'
	},
	'America/Martinique': {
		abbr: 'FFMT',
		abbrDST: 'ADT'
	},
	'America/Matamoros': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'America/Mazatlan': {
		abbr: 'PST',
		abbrDST: 'MDT'
	},
	'America/Mendoza': {
		abbr: 'CMT'
	},
	'America/Menominee': {
		abbr: 'EST',
		abbrDST: 'CWT'
	},
	'America/Merida': {
		abbr: 'EST',
		abbrDST: 'CDT'
	},
	'America/Metlakatla': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Mexico_City': {
		abbr: 'MST',
		abbrDST: 'CWT'
	},
	'America/Miquelon': {
		abbr: 'AST'
	},
	'America/Moncton': {
		abbr: 'EST',
		abbrDST: 'AWT'
	},
	'America/Monterrey': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'America/Montevideo': {
		abbr: 'MMT'
	},
	'America/Montreal': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'America/Montserrat': {
		abbr: 'AST'
	},
	'America/Nassau': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/New_York': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'America/Nipigon': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'America/Nome': {
		abbr: 'YST',
		abbrDST: 'NWT'
	},
	'America/North_Dakota/Beulah': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/North_Dakota/Center': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/North_Dakota/New_Salem': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/Ojinaga': {
		abbr: 'MST',
		abbrDST: 'MDT'
	},
	'America/Panama': {
		abbr: 'EST'
	},
	'America/Pangnirtung': {
		abbr: 'EST',
		abbrDST: 'EDT'
	},
	'America/Paramaribo': {
		abbr: 'PMT'
	},
	'America/Phoenix': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/Port-au-Prince': {
		abbr: 'PPMT',
		abbrDST: 'EDT'
	},
	'America/Port_of_Spain': {
		abbr: 'AST'
	},
	'America/Puerto_Rico': {
		abbr: 'AST',
		abbrDST: 'AWT'
	},
	'America/Punta_Arenas': {
		abbr: 'SMT'
	},
	'America/Rainy_River': {
		abbr: 'CST',
		abbrDST: 'CWT'
	},
	'America/Rankin_Inlet': {
		abbr: 'EST',
		abbrDST: 'CDT'
	},
	'America/Regina': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/Resolute': {
		abbr: 'EST',
		abbrDST: 'CDT'
	},
	'America/Rosario': {
		abbr: 'CMT'
	},
	'America/Santa_Isabel': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Santiago': {
		abbr: 'SMT'
	},
	'America/Santo_Domingo': {
		abbr: 'SDMT',
		abbrDST: 'EDT'
	},
	'America/Shiprock': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/Sitka': {
		abbr: 'YST',
		abbrDST: 'PWT'
	},
	'America/St_Barthelemy': {
		abbr: 'AST'
	},
	'America/St_Johns': {
		abbr: 'NST',
		abbrDST: 'NWT'
	},
	'America/St_Kitts': {
		abbr: 'AST'
	},
	'America/St_Lucia': {
		abbr: 'AST'
	},
	'America/St_Thomas': {
		abbr: 'AST'
	},
	'America/St_Vincent': {
		abbr: 'AST'
	},
	'America/Swift_Current': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'America/Tegucigalpa': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'America/Thule': {
		abbr: 'AST',
		abbrDST: 'ADT'
	},
	'America/Thunder_Bay': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'America/Tijuana': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Toronto': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'America/Tortola': {
		abbr: 'AST'
	},
	'America/Vancouver': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'America/Virgin': {
		abbr: 'AST'
	},
	'America/Whitehorse': {
		abbr: 'YST',
		abbrDST: 'YWT'
	},
	'America/Winnipeg': {
		abbr: 'CST',
		abbrDST: 'CWT'
	},
	'America/Yakutat': {
		abbr: 'YST',
		abbrDST: 'YWT'
	},
	'America/Yellowknife': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'Antarctica/Macquarie': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Antarctica/McMurdo': {
		abbr: 'NZST',
		abbrDST: 'NZST'
	},
	'Antarctica/South_Pole': {
		abbr: 'NZST',
		abbrDST: 'NZST'
	},
	'Arctic/Longyearbyen': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Asia/Amman': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Asia/Baghdad': {
		abbr: 'BMT'
	},
	'Asia/Bangkok': {
		abbr: 'BMT'
	},
	'Asia/Beirut': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Asia/Calcutta': {
		abbr: 'MMT'
	},
	'Asia/Chongqing': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'Asia/Chungking': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'Asia/Colombo': {
		abbr: 'MMT'
	},
	'Asia/Dacca': {
		abbr: 'HMT'
	},
	'Asia/Damascus': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Asia/Dhaka': {
		abbr: 'HMT'
	},
	'Asia/Famagusta': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Asia/Gaza': {
		abbr: 'IST',
		abbrDST: 'IDT'
	},
	'Asia/Harbin': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'Asia/Hebron': {
		abbr: 'IST',
		abbrDST: 'IDT'
	},
	'Asia/Ho_Chi_Minh': {
		abbr: 'PLMT'
	},
	'Asia/Hong_Kong': {
		abbr: 'JST',
		abbrDST: 'HKST'
	},
	'Asia/Irkutsk': {
		abbr: 'IMT'
	},
	'Asia/Istanbul': {
		abbr: 'IMT',
		abbrDST: 'EEST'
	},
	'Asia/Jakarta': {
		abbr: 'WIB'
	},
	'Asia/Jayapura': {
		abbr: 'WIT'
	},
	'Asia/Jerusalem': {
		abbr: 'JMT',
		abbrDST: 'IDT'
	},
	'Asia/Karachi': {
		abbr: 'PKT',
		abbrDST: 'PKST'
	},
	'Asia/Kolkata': {
		abbr: 'MMT'
	},
	'Asia/Kuala_Lumpur': {
		abbr: 'SMT'
	},
	'Asia/Macao': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'Asia/Macau': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'Asia/Makassar': {
		abbr: 'WITA'
	},
	'Asia/Nicosia': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Asia/Phnom_Penh': {
		abbr: 'BMT'
	},
	'Asia/Pontianak': {
		abbr: 'WITA'
	},
	'Asia/Pyongyang': {
		abbr: 'KST'
	},
	'Asia/Rangoon': {
		abbr: 'RMT'
	},
	'Asia/Saigon': {
		abbr: 'PLMT'
	},
	'Asia/Seoul': {
		abbr: 'KST',
		abbrDST: 'KDT'
	},
	'Asia/Shanghai': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'Asia/Singapore': {
		abbr: 'SMT'
	},
	'Asia/Taipei': {
		abbr: 'JST',
		abbrDST: 'CDT'
	},
	'Asia/Tbilisi': {
		abbr: 'TBMT'
	},
	'Asia/Tehran': {
		abbr: 'TMT'
	},
	'Asia/Tel_Aviv': {
		abbr: 'JMT',
		abbrDST: 'IDT'
	},
	'Asia/Tokyo': {
		abbr: 'JST',
		abbrDST: 'JDT'
	},
	'Asia/Ujung_Pandang': {
		abbr: 'WITA'
	},
	'Asia/Vientiane': {
		abbr: 'BMT'
	},
	'Asia/Yangon': {
		abbr: 'RMT'
	},
	'Asia/Yekaterinburg': {
		abbr: 'PMT'
	},
	'Atlantic/Azores': {
		abbr: 'WET'
	},
	'Atlantic/Bermuda': {
		abbr: 'AST',
		abbrDST: 'ADT'
	},
	'Atlantic/Canary': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Atlantic/Faeroe': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Atlantic/Faroe': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Atlantic/Jan_Mayen': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Atlantic/Madeira': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Atlantic/Reykjavik': {
		abbr: 'GMT'
	},
	'Atlantic/St_Helena': {
		abbr: 'GMT'
	},
	'Atlantic/Stanley': {
		abbr: 'SMT'
	},
	'Australia/ACT': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/Adelaide': {
		abbr: 'CAST',
		abbrDST: 'ACDT'
	},
	'Australia/Brisbane': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/Broken_Hill': {
		abbr: 'ACST',
		abbrDST: 'ACDT'
	},
	'Australia/Canberra': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/Currie': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/Darwin': {
		abbr: 'ACST',
		abbrDST: 'ACDT'
	},
	'Australia/Hobart': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/LHI': {
		abbr: 'AEST'
	},
	'Australia/Lindeman': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/Lord_Howe': {
		abbr: 'AEST'
	},
	'Australia/Melbourne': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/NSW': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/North': {
		abbr: 'ACST',
		abbrDST: 'ACDT'
	},
	'Australia/Perth': {
		abbr: 'AWST',
		abbrDST: 'AWDT'
	},
	'Australia/Queensland': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/South': {
		abbr: 'ACST',
		abbrDST: 'ACDT'
	},
	'Australia/Sydney': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/Tasmania': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/Victoria': {
		abbr: 'AEST',
		abbrDST: 'AEDT'
	},
	'Australia/West': {
		abbr: 'AWST',
		abbrDST: 'AWDT'
	},
	'Australia/Yancowinna': {
		abbr: 'ACST',
		abbrDST: 'ACDT'
	},
	'Canada/Atlantic': {
		abbr: 'AST',
		abbrDST: 'AWT'
	},
	'Canada/Central': {
		abbr: 'CST',
		abbrDST: 'CWT'
	},
	'Canada/Eastern': {
		abbr: 'EST',
		abbrDST: 'EWT'
	},
	'Canada/Mountain': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'Canada/Newfoundland': {
		abbr: 'NST',
		abbrDST: 'NWT'
	},
	'Canada/Pacific': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'Canada/Saskatchewan': {
		abbr: 'MST',
		abbrDST: 'MWT'
	},
	'Canada/Yukon': {
		abbr: 'YST',
		abbrDST: 'YWT'
	},
	'Chile/Continental': {
		abbr: 'SMT'
	},
	'Chile/EasterIsland': {
		abbr: 'EMT'
	},
	'Etc/GMT': {
		abbr: 'GMT'
	},
	'Etc/Greenwich': {
		abbr: 'GMT'
	},
	'Etc/UCT': {
		abbr: 'UCT'
	},
	'Etc/UTC': {
		abbr: 'UTC'
	},
	'Etc/Universal': {
		abbr: 'UTC'
	},
	'Etc/Zulu': {
		abbr: 'UTC'
	},
	'Europe/Amsterdam': {
		abbr: 'CET',
		abbrDST: 'NST'
	},
	'Europe/Andorra': {
		abbr: 'WET',
		abbrDST: 'CEST'
	},
	'Europe/Athens': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Europe/Belfast': {
		abbr: 'GMT',
		abbrDST: 'BST'
	},
	'Europe/Belgrade': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Berlin': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Bratislava': {
		abbr: 'PMT',
		abbrDST: 'CEST'
	},
	'Europe/Brussels': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Europe/Bucharest': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Europe/Budapest': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Busingen': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Chisinau': {
		abbr: 'MSK',
		abbrDST: 'MSD'
	},
	'Europe/Copenhagen': {
		abbr: 'CMT',
		abbrDST: 'CEST'
	},
	'Europe/Dublin': {
		abbr: 'IST',
		abbrDST: 'IST'
	},
	'Europe/Gibraltar': {
		abbr: 'GMT',
		abbrDST: 'CEST'
	},
	'Europe/Guernsey': {
		abbr: 'GMT',
		abbrDST: 'BST'
	},
	'Europe/Helsinki': {
		abbr: 'HMT',
		abbrDST: 'EEST'
	},
	'Europe/Isle_of_Man': {
		abbr: 'GMT',
		abbrDST: 'BST'
	},
	'Europe/Istanbul': {
		abbr: 'IMT',
		abbrDST: 'EEST'
	},
	'Europe/Jersey': {
		abbr: 'GMT',
		abbrDST: 'BST'
	},
	'Europe/Kaliningrad': {
		abbr: 'MSK',
		abbrDST: 'MSD'
	},
	'Europe/Kiev': {
		abbr: 'MSK',
		abbrDST: 'MSD'
	},
	'Europe/Lisbon': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Europe/Ljubljana': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/London': {
		abbr: 'GMT',
		abbrDST: 'BST'
	},
	'Europe/Luxembourg': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Europe/Madrid': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Europe/Malta': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Mariehamn': {
		abbr: 'HMT',
		abbrDST: 'EEST'
	},
	'Europe/Minsk': {
		abbr: 'MSK',
		abbrDST: 'MSD'
	},
	'Europe/Monaco': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Europe/Moscow': {
		abbr: 'MSK',
		abbrDST: 'MST'
	},
	'Europe/Nicosia': {
		abbr: 'EET',
		abbrDST: 'EEST'
	},
	'Europe/Oslo': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Paris': {
		abbr: 'WET',
		abbrDST: 'WEST'
	},
	'Europe/Podgorica': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Prague': {
		abbr: 'PMT',
		abbrDST: 'CEST'
	},
	'Europe/Riga': {
		abbr: 'RMT',
		abbrDST: 'MSD'
	},
	'Europe/Rome': {
		abbr: 'RMT',
		abbrDST: 'CEST'
	},
	'Europe/San_Marino': {
		abbr: 'RMT',
		abbrDST: 'CEST'
	},
	'Europe/Sarajevo': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Simferopol': {
		abbr: 'SMT',
		abbrDST: 'MSD'
	},
	'Europe/Skopje': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Sofia': {
		abbr: 'IMT',
		abbrDST: 'EEST'
	},
	'Europe/Stockholm': {
		abbr: 'SET',
		abbrDST: 'CEST'
	},
	'Europe/Tallinn': {
		abbr: 'TMT',
		abbrDST: 'MSD'
	},
	'Europe/Tirane': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Tiraspol': {
		abbr: 'MSK',
		abbrDST: 'MSD'
	},
	'Europe/Uzhgorod': {
		abbr: 'MSK',
		abbrDST: 'MSD'
	},
	'Europe/Vaduz': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Vatican': {
		abbr: 'RMT',
		abbrDST: 'CEST'
	},
	'Europe/Vienna': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Vilnius': {
		abbr: 'WMT',
		abbrDST: 'MSD'
	},
	'Europe/Warsaw': {
		abbr: 'WMT',
		abbrDST: 'EEST'
	},
	'Europe/Zagreb': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'Europe/Zaporozhye': {
		abbr: 'MSK',
		abbrDST: 'MSD'
	},
	'Europe/Zurich': {
		abbr: 'CET',
		abbrDST: 'CEST'
	},
	'GB': {
		abbr: 'GMT',
		abbrDST: 'BST'
	},
	'Indian/Antananarivo': {
		abbr: 'EAT'
	},
	'Indian/Comoro': {
		abbr: 'EAT'
	},
	'Indian/Maldives': {
		abbr: 'MMT'
	},
	'Indian/Mayotte': {
		abbr: 'EAT'
	},
	'Mexico/BajaNorte': {
		abbr: 'PST',
		abbrDST: 'PWT'
	},
	'Mexico/BajaSur': {
		abbr: 'PST',
		abbrDST: 'MDT'
	},
	'Mexico/General': {
		abbr: 'MST',
		abbrDST: 'CWT'
	},
	'NZ': {
		abbr: 'NZST',
		abbrDST: 'NZST'
	},
	'PRC': {
		abbr: 'CST',
		abbrDST: 'CDT'
	},
	'Pacific/Auckland': {
		abbr: 'NZST',
		abbrDST: 'NZST'
	},
	'Pacific/Bougainville': {
		abbr: 'PMMT'
	},
	'Pacific/Easter': {
		abbr: 'EMT'
	},
	'Pacific/Guam': {
		abbr: 'GST'
	},
	'Pacific/Honolulu': {
		abbr: 'HST',
		abbrDST: 'HDT'
	},
	'Pacific/Johnston': {
		abbr: 'HST',
		abbrDST: 'HDT'
	},
	'Pacific/Midway': {
		abbr: 'SST'
	},
	'Pacific/Pago_Pago': {
		abbr: 'SST'
	},
	'Pacific/Port_Moresby': {
		abbr: 'PMMT'
	},
	'Pacific/Saipan': {
		abbr: 'GST'
	},
	'Pacific/Samoa': {
		abbr: 'SST'
	},
	'ROC': {
		abbr: 'JST',
		abbrDST: 'CDT'
	},
	'ROK': {
		abbr: 'KST',
		abbrDST: 'KDT'
	},
	'UTC': {
		abbr: 'UTC'
	}
};
DateTime.lang = {
    ampm: {
        lower: ['am', 'pm'],
        upper: ['AM', 'PM']
    },
    days: {
        min: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    months: {
        short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    ordinal: ['st', 'nd', 'rd', 'th']
};

DateTime.seperators = [';', ':', '/', '.', ',', '-', '(', ')'];

DateTime.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

DateTime.formats = {
    atom: 'Y-m-d\\TH:i:sP',
    cookie: 'l, d-M-Y H:i:s T',
    date: 'D M d Y',
    iso8601: 'Y-m-d\\TH:i:sO',
    rfc822: 'D, d M y H:i:s O',
    rfc850: 'l, d-M-y H:i:s T',
    rfc1036: 'D, d M y H:i:s O',
    rfc1123: 'D, d M Y H:i:s O',
    rfc2822: 'D, d M Y H:i:s O',
    rfc3339: 'Y-m-d\\TH:i:sP',
    rfc3339_extended: 'Y-m-d\\TH:i:s.vP',
    rss: 'D, d M Y H:i:s O',
    string: 'D M d Y H:i:s O (e)',
    time: 'H:i:s O (e)',
    w3c: 'Y-m-d\\TH:i:sP'
};

DateTime.defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

DateTime.utcLocale = 'en-US';
DateTime.utcOptions = {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};
DateTime.utcFormatter = new Intl.DateTimeFormat(DateTime.utcLocale, DateTime.utcOptions);

DateInterval.isoRegex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:(\d+)W)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?|)$/;
DateInterval.stringRegex = /([\+\-]?\s*\d+)\s*(day|forthnight|fortnight|hour|minute|min|month|second|sec|week|year)s?/;

})(Frost);
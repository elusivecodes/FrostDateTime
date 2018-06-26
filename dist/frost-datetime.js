(function(window) {

class DateTime {
    constructor() {
        this._date = new Date(...arguments);

        this._offset = 0;
        this._timezone = 'UTC';

        const offset = this._date.getTimezoneOffset();
        this.offset(offset);

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.timezone(timezone);
    }

    toDateString() {
        return this.format(DateTime.formats.date);
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

    valueOf() {
        return this.time();
    }

    [Symbol.toPrimitive](hint) {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

}
Object.assign(DateTime.prototype, {

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
        return DateTime.lang.days[type][this.getDay()];
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

    month(month = false) {
        return month === false ?
            this.getMonth() + 1 :
            this.setMonth(month - 1);
    },

    monthName(type = 'full') {
        return DateTime.lang.months[type][this.getMonth()];
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

    getDate() {
        return this._date.getUTCDate();
    },

    getDay() {
        return this._date.getUTCDay();
    },

    getDayOfYear() {
        return DateTime.dayOfYear(this.getFullYear(), this.getMonth() + 1, this.getDate());
    },

    getFullYear() {
        return this._date.getUTCFullYear();
    },

    getHours() {
        return this._date.getUTCHours();
    },

    getIsoDay() {
        return ((this.getDay() + 6) % 7) + 1;
    },

    getIsoWeek() {
        const date = new DateTime(this.getFullYear(), this.getMonth(), this.getDate());

        // Thursday in current week decides the year.
        date.setIsoDay(4);

        // January 4 is always in week 1.
        const week1 = new DateTime(date.getFullYear(), 0, 4);

        // Adjust to Thursday in week 1
        week1.setIsoDay(4);

        // Count weeks between date and week1.
        const weeksBetween = (date.getTimestamp() - week1.getTimestamp()) / 604800;

        return 1 + Math.floor(weeksBetween);
    },

    getIsoYear() {
        const date = new DateTime(this.getFullYear(), this.getMonth(), this.getDate());
        date.setTimezone(this.getTimezone());
        date.getIsoDay(4);
        return date.getFullYear();
    },

    getMilliseconds() {
        return this._date.getUTCMilliseconds();
    },

    getMinutes() {
        return this._date.getUTCMinutes();
    },

    getMonth() {
        return this._date.getUTCMonth();
    },

    getQuarter() {
        return Math.ceil(this.getMonth() / 3);
    },

    getSeconds() {
        return this._date.getUTCSeconds();
    },

    getTime() {
        return this._date.getTime() + (this._offset * 60000);
    },

    getTimestamp() {
        return this.getTime() / 1000;
    },

    getTimezone() {
        return this._timezone;
    },

    getTimezoneOffset() {
        return this._offset;
    },

    getUTCDate() {
        return new Date(this.getTime()).getUTCDate();
    },

    getUTCDay() {
        return new Date(this.getTime()).getUTCDay();
    },

    getUTCFullYear() {
        return new Date(this.getTime()).getUTCFullYear();
    },

    getUTCHours() {
        return new Date(this.getTime()).getUTCHours();
    },

    getUTCMilliseconds() {
        return new Date(this.getTime()).getUTCMilliseconds();
    },

    getUTCMinutes() {
        return new Date(this.getTime()).getUTCMinutes();
    },

    getUTCMonth() {
        return new Date(this.getTime()).getUTCMonth();
    },

    getSeconds() {
        return new Date(this.getTime()).getUTCSeconds();
    }
});
Object.assign(DateTime.prototype, {

    setDate(date) {
        this._date.setUTCDate(date);

        return this.checkDST();
    },

    setDay(day) {
        let realDay = false;
        if (utility.isNumeric(day)) {
            realDay = day;
        } else {
            realDay = DateTime.getMonthFromName(day) ||
                DateTime.getMonthFromName(day, 'short') ||
                DateTime.getMonthFromName(day, 'min');
        }

        if (realDay === false) {
            return this;
        }

        return this.setDate(this.getDate() - this.getDay() + realDay);
    },

    setDayOfYear(day) {
        return this.setMonth(1).setDate(day);
    },

    setFullYear(year, month = null, date = null) {
        if (month === null) {
            month = this.getMonth();
        }

        let checkDate = false;
        if (date === null) {
            date = this.getDate();
            checkDate = true;
        }

        this._date.setUTCFullYear(year, month, date);

        if (checkDate && date != this.getDate()) {
            this._date.setUTCDate(0);
        }

        return this.checkDST();
    },

    setHours(hours, minutes = null, seconds = null, ms = null) {
        if (hours === null) {
            hours = this.getHours();
        }

        if (minutes === null) {
            minutes = this.getMinutes();
        }

        if (seconds === null) {
            seconds = this.getSeconds();
        }

        if (ms === null) {
            ms = this.getMilliseconds();
        }

        this._date.setUTCHours(hours, minutes, seconds, ms);

        return this.checkDST();
    },

    setIsoDay(day) {
        return this.setDate(this.getDate() - this.getIsoDay() + day);
    },

    setIsoWeek(week, day = null) {
        if (day === null) {
            day = this.getIsoDay();
        }

        this.setDayOfYear(4 + ((week - 1) * 7));

        return this.setIsoDay(day);
    },

    setIsoYear(year, week = null, day = null) {
        if (week === null) {
            week = this.getIsoWeek();
        }

        if (day === null) {
            day = this.getIsoDay();
        }

        this.setFullYear(year, 0, 4);

        return this.setIsoWeek(week, day);
    },

    setMilliseconds(ms) {
        this._date.setUTCMilliseconds(ms);

        return this.checkDST();
    },

    setMinutes(minutes, seconds = null, ms = null) {
        if (seconds === null) {
            seconds = this.getSeconds();
        }

        if (ms === null) {
            ms = this.getMilliseconds();
        }

        this._date.setUTCMinutes(minutes, seconds, ms);

        return this.checkDST();
    },

    setMonth(month, date = null) {
        let checkDate = false;
        if (date === null) {
            date = this.getDate();
            checkDate = true;
        }

        let realMonth = false;
        if (utility.isNumeric(month)) {
            realMonth = month;
        } else {
            realMonth = DateTime.getMonthFromName(month) ||
                DateTime.getMonthFromName(month, 'short');
        }

        if (realMonth === false) {
            return this;
        }

        this._date.setUTCMonth(realMonth, date);

        if (checkDate && date != this.getDate()) {
            this._date.setUTCDate(0);
        }

        return this.checkDST();
    },

    setQuarter(quarter) {
        this.setMonth(quarter * 3 - 3);

        return this.checkDST();
    },

    setSeconds(seconds, ms = null) {
        if (ms === null) {
            ms = this.getMilliseconds();
        }

        this._date.setUTCSeconds(seconds, ms);

        return this.checkDST();
    },

    setTime(time) {
        this._date.setTime(time - (this._offset * 60000));

        return this.checkDST();
    },

    setTimestamp(timestamp) {
        return this.setTime(timestamp * 1000);
    },

    setTimezone(timezone) {
        this._timezone = timezone;

        return this.checkDST();
    },

    setTimezoneOffset(offset) {
        const diff = this._offset - offset;
        if (diff) {
            this._date.setTime(this._date.getTime() + (diff * 60000));
        }

        this._offset = offset;

        return this;
    },

    setUTCDate(date) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setDate(date)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCFullYear(year, month = null, date = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setFullYear(year, month, date)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCHours(hours, minutes = null, seconds = null, ms = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setHours(hours, minutes, seconds, ms)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCMilliseconds(ms) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setMilliseconds(ms)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCMinutes(minutes, seconds = null, ms = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setMinutes(minutes, seconds, ms)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCMonth(month, date = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setMonth(month, date)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCSeconds(seconds, ms = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setSeconds(seconds, ms)
            .getTime();
        this.setTime(timestamp);
    }
});
Object.assign(DateTime.prototype, {

    checkDST() {
        const offset = DateTime.calculateTimezoneOffset(this._timezone, this.getTime());

        if (offset !== this.getTimezoneOffset()) {
            this.setTimezoneOffset(offset);
        }

        return this;
    },

    dateSuffix() {
        return DateTime.dateSuffix(this.getDate());
    },

    daysInMonth() {
        return DateTime.daysInMonth(this.getFullYear(), this.getMonth() + 1);
    },

    daysInYear() {
        return DateTime.daysInYear(this.getFullYear());
    },

    format(formatString) {
        const formatTokens = DateTime.formatTokens(true);

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
            output += DateTime.formatData[key].output(this);
        });

        return output;
    },

    isDST() {
        return this.getTimezoneOffset() < this.standardOffset();
    },

    isLeapYear() {
        return DateTime.isLeapYear(this.getFullYear());
    },

    isoWeeksInYear() {
        return DateTime.isoWeeksInYear(this.getFullYear());
    },

    standardOffset() {
        const jan = new DateTime(this.getFullYear(), 0, 1);
        jan.setTimezone(this.timezone());

        const jul = new DateTime(this.getFullYear(), 6, 1);
        jul.setTimezone(this.timezone());

        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    },

    toObject() {
        return {
            timezone: this.timezone(),
            offset: this.offset(),
            year: this.year(),
            month: this.month(),
            date: this.date(),
            dayOfYear: this.dayOfYear(),
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds(),
            timestamp: this.timestamp()
        }
    }

});
DateTime.formatData = {

    /* YEAR */

    // leap year
    leapYear: {
        token: 'L',
        output: date => date.isLeapYear() ? 1 : 0
    },

    // year
    year: {
        token: 'Y',
        regex: () => '(\\d{4})',
        input: (date, value) => date.year = value,
        output: date => padString(date.year(), 4)
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
            const year = '' + date.year();
            return year.substring(year.length - 2);
        }
    },

    // iso year
    isoYear: {
        token: 'o',
        output: date => date.isoYear()
    },

    /* MONTH */

    // month name
    monthName: {
        token: 'F',
        regex: () =>  '(' + DateTime.lang.months.full.join('|') + ')',
        input: (date, value) => date.month = value,
        output: date => date.monthName()
    },

    // month name short
    monthNameShort: {
        token: 'M',
        regex: () =>  '(' + DateTime.lang.months.short.join('|') + ')',
        input: (date, value) => date.month = value,
        output: date => date.monthName('short')
    },

    // month
    month: {
        token: 'm',
        regex: () => '(\\d{2})',
        input: (date, value) => date.month = value,
        output: date => padString(date.month(), 2)
    },

    // month short
    monthShort: {
        token: 'n',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.month = value,
        output: date => date.month()
    },

    // days in month
    daysInMonth: {
        token: 't',
        output: date => date.daysInMonth()
    },

    /* WEEKS */

    // iso week
    isoWeek: {
        token: 'W',
        output: date => date.isoWeek()
    },

    /* DAYS */

    // day of year
    dayOfYear: {
        token: 'z',
        regex: () => '(\\d{1,3})',
        input: (date, value) => date.dayOfYear = value + 1,
        output: date => date.dayOfYear() - 1
    },

    // date
    date: {
        token: 'd',
        regex: () => '(\\d{2})',
        input: (date, value) => date.date = value,
        output: date => padString(date.date(), 2)
    },

    // date short
    dateShort: {
        token: 'j',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.date = value,
        output: date => date.date()
    },

    // ordinal suffix
    dateSuffix: {
        token: 'S',
        regex: () =>  '(' + DateTime.lang.ordinal.join('|') + ')',
        output: date => date.dateSuffix()
    },

    // iso day
    isoDay: {
        token: 'N',
        output: date => date.isoDay()
    },

    // day of week
    day: {
        token: 'w',
        output: date => date.day()
    },

    // day name
    dayName: {
        token: 'l',
        regex: () =>  '(' + DateTime.lang.days.full.join('|') + ')',
        input: (date, value) => date.day = value,
        output: date => date.dayName()
    },

    // day name short
    dayNameShort: {
        token: 'D',
        regex: () =>  '(' + DateTime.lang.days.short.join('|') + ')',
        input: (date, value) => date.day = value,
        output: date => date.dayName('short')
    },

    /* TIME */

    // hours (24)
    hours24: {
        token: 'H',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours = value,
        output: date => padString(date.hours(), 2)
    },

    // hours short (24)
    hours24Short: {
        token: 'G',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours = value,
        output: date => date.hours()
    },

    // hours (12)
    hours12: {
        token: 'h',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours = value % 12,
        output: date => padString(date.hours() % 12, 2)
    },

    // hours short (12)
    hours12Short: {
        token: 'g',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours = value % 12,
        output: date => date.hours() % 12
    },

    // minutes
    minutes: {
        token: 'i',
        regex: () => '(\\d{2})',
        input: (date, value) => date.minutes = value,
        output: date => padString(date.minutes(), 2)
    },

    // seconds
    seconds: {
        token: 's',
        regex: () => '(\\d{2})',
        input: (date, value) => date.seconds = value,
        output: date => padString(date.seconds(), 2)
    },

    // microseconds
    microseconds: {
        token: 'u',
        regex: () => '(\\d{1,6})',
        input: (date, value) => date.milliseconds = value / 1000,
        output: date => date.milliseconds() * 1000
    },

    // milliseconds
    milliseconds: {
        token: 'v',
        output: date => date.milliseconds()
    },

    /* TIMEZONE */

    // timezone
    timezone: {
        token: 'e',
        regex: () => '(\\w+\\/\\w+|\\w+)',
        input: (date, value) => date.timezone = value,
        output: date => date.timezone()
    },

    // daylight savings
    dst: {
        token: 'I',
        output: date => date.isDST() ? 1 : 0
    },

    // offset
    offset: {
        token: 'O',
        regex: () => '([\\+\\-]\\d{4})',
        input: (date, value) =>  (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(3, 5))
        )
        * (value[0] === '-' ? 1 : -1),
        output: date => {
            const offset = date.offset();
            return (offset > 0 ? '-' : '+') +
                padString(Math.abs(Math.floor(offset / 60)), 2) +
                padString(offset % 60, 2);
        }
    },

    // offset colon
    offsetColon: {
        token: 'P',
        regex: () => '([\\+\\-]\\d{2}\\:\\d{2})',
        input: (date, value) =>  (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(4, 6))
        )
        * (value[0] === '-' ? 1 : -1),
        output: date => {
            const offset = date.offset();
            return (offset > 0 ? '-' : '+') +
                padString(Math.abs(Math.floor(offset / 60)), 2) + 
                ':' + 
                padString(offset % 60, 2);
        }
    },

    // timezone abbreviated
    timezoneAbbr: {
        token: 'T',
        regex: () => '([A-Z]{1,5})',
        input: (date, value) => date.timezone = date.timezone ||
            Object.keys(DateTime.timezones).find(timezone => timezone.abbr === value || timezone.abbrDST === value),
        output: date => DateTime.timezoneAbbr(date.timezone(), date.isDST())
    },

    // offset seconds
    offsetSeconds: {
        token: 'Z',
        input: (date, value) => date.offset = value / 60,
        output: date => date.offset() * -1 * 60
    },

    /* FULL */

    // timestamp
    iso8601: {
        token: 'c',
        output: date => date.toISOString()
    },

    rfc2822: {
        token: 'r',
        output: date => date.format(DateTime.formats.rfc822)
    },

    timestamp: {
        token: 'U',
        regex: () => '(\\d+)',
        input: (date, value) => date.timestamp = value,
        output: date => date.timestamp()
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
DateTime.lang = {
    ordinal: ['st', 'nd', 'rd', 'th'],
    days: {
        min: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    months: {
        short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    ampm: {
        lower: ['am', 'pm'],
        upper: ['AM', 'PM']
    }
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
    string: 'D M d Y h:i:s O (e)',
    time: 'h:i:s O (e)',
    w3c: 'Y-m-d\\TH:i:sP'
};

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

window.DateTime = DateTime;
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
        const j = i % 10;
        const k = i % 100;

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
        for (let i = 1; i < month; i++) {
            date += this.daysInMonth(year, i);
        }

        return date;
    },

    daysInMonth(year, month) {
        let days = this.monthDays[month - 1];

        if (month == 2 && this.isLeapYear(year)) {
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

        const dateData = {
            timezone: false,
            offset: false,
            year: false,
            month: false,
            date: false,
            dayOfYear: false,
            hours: false,
            minutes: false,
            seconds: false,
            milliseconds: false,
            timestamp: false
        };

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

        const date = new DateTime();

        Object.keys(dateData).forEach(method => {
            if (dateData[method] === false) {
                return;
            }

            date[method](dateData[method]);
        });

        return date;
    },

    getDayFromName(day, type = 'full') {
        const index = DateTime.lang.days[type].findIndex(value => matchesString(value, day));
        return index >= 0 ? index : false;
    },

    getMonthFromName(month, type = 'full') {
        const index = DateTime.lang.months[type].findIndex(value => matchesString(value, month));
        return index >= 0 ? index : false;
    },

    isLeapYear(year) {
        return year & 3 != 0 && (year % 100 != 0 || year % 400 != 0);
    },

    isoWeeksInYear(year) {
        const date = new DateTime(year, 12, 28);
        return date.getIsoWeek();
    },

    timezoneAbbr(timezone, dst = false) {
        return dst ?
            this.timezones[timezone].abbrDST :
            this.timezones[timezone].abbr;
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
function matchesString(string, compare, insensitive = true) {
    return ! insensitive ?
        '' + string === '' + compare :
        '' + string.toLowerCase() === '' + compare.toLowerCase();
}

function padString(string, length, padding = 0) {
    string = '' + string;

    return string.length >= length ?
        string : new Array(length - string.length + 1).join(padding) + string;
}

})(window);
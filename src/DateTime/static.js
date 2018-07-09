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

        return date - 1;
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

    fromObject(dateObject) {

        let dateData;
        if (dateObject.timestamp) {
            dateData = dateObject.timestamp * 1000;
        } else {
            const now = new Date();

            let year = null;
            let month = null;
            let date = null;
            let hours = null;
            let minutes = null;
            let seconds = null;
            let millis = null;

            if (dateObject.hasOwnProperty('year')) {
                year = parseInt(dateObject.year);
            } else {
                year = now.getFullYear();
            }

            if (dateObject.hasOwnProperty('dayOfYear') && ( ! dateObject.hasOwnProperty('month') || ! dateObject.hasOwnProperty('date'))) {
                month = 0;
                date = parseInt(dateObject.dayOfyear) + 1;
            } else {
                if (dateObject.hasOwnProperty('month')) {
                    month = parseInt(dateObject.month);
                } else {
                    month = now.getMonth();
                }

                if (dateObject.hasOwnProperty('date')) {
                    date = parseInt(dateObject.date);
                } else {
                    date = now.getDate();
                }
            }

            if (dateObject.hasOwnProperty('hours24')) {
                hours = parseInt(dateObject.hours24);
            } else if (dateObject.hasOwnProperty('hours12')) {
                hours = parseInt(dateObject.hours12);
                if (dateObject.pm === 1) {
                    hours += 12;
                }
            } else {
                hours = now.getHours();
            }

            if (dateObject.hasOwnProperty('minutes')) {
                minutes = parseInt(dateObject.minutes);
            } else {
                minutes = now.getMinutes();
            }

            if (dateObject.hasOwnProperty('seconds')) {
                seconds = parseInt(dateObject.seconds);
            } else {
                seconds = now.getSeconds();
            }

            if (dateObject.hasOwnProperty('milliseconds')) {
                millis = parseInt(dateObject.milliseconds);
            } else {
                millis = now.getMilliseconds();
            }

            dateData = [
                year,
                month,
                date,
                hours,
                minutes,
                seconds,
                millis
            ];
        }

        let timezone = null;
        if (dateObject.hasOwnProperty('timezone')) {
            timezone = dateObject.timezone;
        } else if (dateObject.hasOwnProperty('offset')) {
            const timestamp = Array.isArray(dateData) ?
                Date.UTC(...dateData) :
                dateData;
            timezone = this.timezoneFromOffset(timestamp, dateObject.offset);
        }

        return new this(dateData, timezone);
    },

    getDayFromName(day, type = 'full') {
        const index = DateTime.lang.days[type].findIndex(value => frost.matchesString(value, day, true));
        return index >= 0 ? index : false;
    },

    getDayName(day, type = 'full') {
        return DateTime.lang.days[type][day];
    },

    getMonthFromName(month, type = 'full') {
        const index = DateTime.lang.months[type].findIndex(value => frost.matchesString(value, month, true));
        return index >= 0 ? index : false;
    },

    getMonthName(month, type = 'full') {
        return DateTime.lang.months[type][month];
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
        return DateTime.getDayFromName(day) ||
            DateTime.getDayFromName(day, 'short') ||
            DateTime.getDayFromName(day, 'min') ||
            null;
    },

    parseMonth(month) {
        return DateTime.getMonthFromName(month) ||
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
            .find(timezone => this.calculateTimezoneOffset(timezone, timestamp) === offset) || null;
    }
});
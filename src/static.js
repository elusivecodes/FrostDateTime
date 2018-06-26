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
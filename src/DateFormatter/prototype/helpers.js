Object.assign(DateFormatter.prototype, {

    getDayPeriods(type = 'long') {
        const dayPeriodFormatter = this._makeFormatter({hour: 'numeric', hour12: true, dayPeriod: type});
        return new Array(2)
            .fill()
            .map((_, index) =>
                dayPeriodFormatter.formatToParts(Date.UTC(2018, 0, 1, (1 + index) * 12))
                    .find(part => part.type === 'dayperiod')
                    .value
            );
    },

    getDays(type = 'long', standalone = true) {
        if (standalone) {
            const dayFormatter = this._makeFormatter({weekday: type});
            return new Array(7)
                .fill()
                .map((_, index) =>
                    dayFormatter.format(Date.UTC(2018, 0, index))
                );
        }

        const dayFormatter = this._makeFormatter({year: 'numeric', month: 'numeric', day: 'numeric', weekday: type});
        return new Array(7)
            .fill()
            .map((_, index) =>
                dayFormatter.formatToParts(Date.UTC(2018, 0, index))
                    .find(part => part.type === 'weekday')
                    .value
            );
    },

    getEras(type = 'short') {
        const eraFormatter = this._makeFormatter({era: type});
        return new Array(2)
            .fill()
            .map((_, index) =>
                eraFormatter.formatToParts(Date.UTC(index - 1, 0, 1))
                    .find(part => part.type === 'era')
                    .value
            );
    },

    getMonths(type = 'long', standalone = true) {
        if (standalone) {
            const monthFormatter = this._makeFormatter({month: type});
            return new Array(12)
                .fill()
                .map((_, index) =>
                    monthFormatter.format(Date.UTC(2018, index, 1))
                );
        }

        const monthFormatter = this._makeFormatter({year: 'numeric', month: type, day: 'numeric'});
        return new Array(12)
            .fill()
            .map((_, index) =>
                monthFormatter.formatToParts(Date.UTC(2018, index, 1))
                    .find(part => part.type === 'month')
                    .value
            );
    },

    getNumbers() {
        const numberFormatter = this._makeFormatter({minute: 'numeric'});
        return new Array(10)
            .fill()
            .map((_, index) =>
                numberFormatter.format(Date.UTC(2018, 0, 1, 0, index))
            );
    },

    numberRegExp(length) {
        const numbers = this.getNumbers().join('|');
        const suffix = length ? `{${length}}` : '+';
        return `(?:${numbers})${suffix}`;
    },

    _makeFormatter(options) {
        const key = JSON.stringify(options);
        if (!(key in this.formatters)) {
            this.formatters[key] = new Intl.DateTimeFormat(this.locale, {
                timeZone: 'UTC',
                ...options
            });
        }

        return this.formatters[key];
    }

});

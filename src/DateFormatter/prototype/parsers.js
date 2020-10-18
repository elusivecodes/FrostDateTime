Object.assign(DateFormatter.prototype, {

    parseDay(value, type = 'long', standalone = true) {
        const days = this.getDays(type, standalone);
        return days.indexOf(value) || 7;
    },

    parseDayPeriod(value, type = 'long') {
        const dayPeriods = this.getDayPeriods(type);
        return dayPeriods.indexOf(value);
    },

    parseEra(value, type = 'long') {
        const eras = this.getEras(type);
        return eras.indexOf(value);
    },

    parseMonth(value, type = 'long', standalone = true) {
        const months = this.getMonths(type, standalone);
        return months.indexOf(value) + 1;
    },

    parseNumber(value) {
        const numbers = this.getNumbers();
        return parseInt(
            `${value}`.replace(/./g, match => numbers.indexOf(match))
        );
    }

});

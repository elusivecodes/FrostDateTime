Object.assign(DateFormatter.prototype, {

    formatDay(day, type = 'long', standalone = true) {
        const date = Date.UTC(2018, 0, day);

        if (standalone) {
            return this._makeFormatter({weekday: type})
                .format(date);
        }

        return this._makeFormatter({year: 'numeric', month: 'numeric', day: 'numeric', weekday: type})
            .formatToParts(date)
            .find(part => part.type === 'weekday')
            .value;
    },

    formatDayPeriod(period, type = 'long') {
        return this._makeFormatter({hour: 'numeric', hour12: true, dayPeriod: type})
            .formatToParts(
               Date.UTC(2018, 0, 1, (1 + period) * 12)
            ).find(part => part.type === 'dayperiod').value;
    },

    formatEra(era, type = 'long') {
        return this._makeFormatter({year: 'numeric', era: type})
            .formatToParts(
                Date.UTC(era - 1, 0, 1)
            ).find(part => part.type === 'era').value;
    },

    formatMonth(month, type = 'long', standalone = true) {
        const date = Date.UTC(2018, month - 1);

        if (standalone) {
            return this._makeFormatter({month: type})
                .format(date);
        }

        return this._makeFormatter({year: 'numeric', month: type, day: 'numeric'})
            .formatToParts(date)
            .find(part => part.type === 'month')
            .value;
    },

    formatNumber(number, padding = 0) {
        const numbers = this.getNumbers();
        debugger;
        return `${number}`.padStart(padding, 0).replace(/\d/g, match => numbers[match])
    }

});

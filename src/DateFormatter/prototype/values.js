/**
 * DateFormatter Values
 */

Object.assign(DateFormatter.prototype, {

    /**
     * Get cached day period values.
     * @param {string} [type=long] The formatting type.
     * @returns {array} The cached values.
     */
    getDayPeriods(type = 'long') {
        return this._getData(
            `periods[${type}]`,
            _ => {
                const dayPeriodFormatter = this._makeFormatter({ hour: 'numeric', hourCycle: 'h11' });
                return new Array(2)
                    .fill()
                    .map((_, index) =>
                        dayPeriodFormatter.formatToParts(Date.UTC(2018, 0, 1, index * 12))
                            .find(part => part.type === 'dayPeriod')
                            .value
                    );
            }
        );
    },

    /**
     * Get cached day values.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the values are standalone.
     * @returns {array} The cached values.
     */
    getDays(type = 'long', standalone = true) {
        return this._getData(
            `days[${standalone}][${type}]`,
            _ => {
                if (standalone) {
                    const dayFormatter = this._makeFormatter({ weekday: type });
                    return new Array(7)
                        .fill()
                        .map((_, index) =>
                            dayFormatter.format(Date.UTC(2018, 0, index))
                        );
                }

                const dayFormatter = this._makeFormatter({ year: 'numeric', month: 'numeric', day: 'numeric', weekday: type });
                return new Array(7)
                    .fill()
                    .map((_, index) =>
                        dayFormatter.formatToParts(Date.UTC(2018, 0, index))
                            .find(part => part.type === 'weekday')
                            .value
                    );
            }
        );
    },

    /**
     * Get cached era values.
     * @param {string} [type=long] The formatting type.
     * @returns {array} The cached values.
     */
    getEras(type = 'long') {
        return this._getData(
            `eras[${type}]`,
            _ => {
                const eraFormatter = this._makeFormatter({ era: type });
                return new Array(2)
                    .fill()
                    .map((_, index) =>
                        eraFormatter.formatToParts(Date.UTC(index - 1, 0, 1))
                            .find(part => part.type === 'era')
                            .value
                    );
            }
        );
    },

    /**
     * Get cached month values.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the values are standalone.
     * @returns {array} The cached values.
     */
    getMonths(type = 'long', standalone = true) {
        return this._getData(
            `months[${standalone}][${type}]`,
            _ => {
                if (standalone) {
                    const monthFormatter = this._makeFormatter({ month: type });
                    return new Array(12)
                        .fill()
                        .map((_, index) =>
                            monthFormatter.format(Date.UTC(2018, index, 1))
                        );
                }

                const monthFormatter = this._makeFormatter({ year: 'numeric', month: type, day: 'numeric' });
                return new Array(12)
                    .fill()
                    .map((_, index) =>
                        monthFormatter.formatToParts(Date.UTC(2018, index, 1))
                            .find(part => part.type === 'month')
                            .value
                    );
            }
        );
    },

    /**
     * Get cached number values.
     * @returns {array} The cached values.
     */
    getNumbers() {
        return this._getData(
            'numbers',
            _ => {
                const numberFormatter = this._makeFormatter({ minute: 'numeric' });
                return new Array(10)
                    .fill()
                    .map((_, index) =>
                        numberFormatter.format(Date.UTC(2018, 0, 1, 0, index))
                    );
            }
        );
    },

    /**
     * Get the RegExp for the number values.
     * @returns {string} The number values RegExp.
     */
    numberRegExp() {
        const numbers = this.getNumbers().join('|');
        return `(?:${numbers})+`;
    }

});

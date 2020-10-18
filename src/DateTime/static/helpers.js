/**
 * DateTime (Static) Helpers
 */

Object.assign(DateTime, {

    /**
     * Create a Date object set to Thursday of the ISO week.
     * @param {number} year The year.
     * @param {number} month The month.
     * @param {number} date The date.
     * @returns {Date} A new Date object.
     */
    _isoDate(...args) {
        if (args.length > 1) {
            args[1]--;
        }

        const date = new Date(
            Date.UTC(...args)
        ),
            day = this._isoDay(date.getUTCDay());
        date.setUTCDate(
            date.getUTCDate()
            - day
            + 4
        );
        return date;
    },

    /**
     * Convert a day of the week to a ISO format.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @returns {number} The day of the week in ISO format. (1 - Monday, 7 - Sunday)
     */
    _isoDay(day) {
        return (
            (parseInt(day) + 6) % 7
        ) + 1;
    }

});

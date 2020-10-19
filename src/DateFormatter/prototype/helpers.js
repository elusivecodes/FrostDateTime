/**
 * DateFormatter Helpers
 */

Object.assign(DateFormatter.prototype, {

    /**
     * Get values from cache (or generate if they don't exist).
     * @param {string} key The key for the values.
     * @param {function} callback The callback to generate the values.
     * @returns {array} The cached values.
     */
    _getData(key, callback) {
        if (!(key in this._data)) {
            this._data[key] = callback();
        }

        return this._data[key];
    },

    /**
     * Create a new UTC formatter for the current locale.
     * @param {object} options The options for the formatter.
     * @returns {Intl.DateTimeFormat} A new DateTimeFormat object.
     */
    _makeFormatter(options) {
        return new Intl.DateTimeFormat(this.locale, {
            timeZone: 'UTC',
            ...options
        });
    }

});

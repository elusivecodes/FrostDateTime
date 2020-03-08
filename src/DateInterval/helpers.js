/**
 * DateInterval Helpers
 */

Object.assign(DateInterval.prototype, {

    /**
     * Parse a DateTime duration string.
     * @param {string} [interval] The DateTime duration string.
     * @return {Boolean} TRUE if the duration string was parsed, otherwise FALSE.
     */
    _parseDateTime(interval) {
        const dateTimeMatch = interval.match(this.constructor._dateTimeRegExp);

        if (!dateTimeMatch) {
            return false;
        }

        if (dateTimeMatch[1]) {
            this.y += parseInt(dateTimeMatch[1]);
        }

        if (dateTimeMatch[2]) {
            this.m += parseInt(dateTimeMatch[2]);
        }

        if (dateTimeMatch[3]) {
            this.d += parseInt(dateTimeMatch[3]);
        }

        if (dateTimeMatch[4]) {
            this.h += parseInt(dateTimeMatch[4]);
        }

        if (dateTimeMatch[5]) {
            this.i += parseInt(dateTimeMatch[5]);
        }

        if (dateTimeMatch[6]) {
            this.s += parseInt(dateTimeMatch[6]);
        }

        return true;
    },

    /**
     * Parse an ISO duration string.
     * @param {string} [interval] The ISO duration string.
     * @return {Boolean} TRUE if the duration string was parsed, otherwise FALSE.
     */
    _parseISO(interval) {
        const isoMatch = interval.match(this.constructor._isoRegExp);

        if (!isoMatch) {
            return false;
        }

        if (isoMatch[1]) {
            this.y += parseInt(isoMatch[1]);
        }

        if (isoMatch[2]) {
            this.m += parseInt(isoMatch[2]);
        }

        if (isoMatch[3]) {
            this.d += parseInt(isoMatch[3]);
        }

        if (isoMatch[4]) {
            this.d += parseInt(isoMatch[4]) * 7;
        }

        if (isoMatch[5]) {
            this.h += parseInt(isoMatch[5]);
        }

        if (isoMatch[6]) {
            this.i += parseInt(isoMatch[6]);
        }

        if (isoMatch[7]) {
            this.s += parseInt(isoMatch[7]);
        }

        return true;
    }

});

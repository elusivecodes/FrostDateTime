Object.assign(DateTime.prototype, {

    /**
     * Update the timezone offset for current timestamp
     */
    _checkOffset()
    {
        this.offset = this.timezone === 'UTC' ?
            0 :
            (
                new Date(DateTime.utcFormatter.format(this))
                - new Date(this.formatter.format(this))
            )
            / 60000;
    },

    /**
     * Get the number of milliseconds since the UNIX epoch (offset to timezone)
     * @returns {int} The number of milliseconds since the UNIX epoch (offset to timezone)
     */
    _getOffsetTime()
    {
        return this.getTime() - (this.offset * 60000);
    },

    /**
     * Update the timezone transition for current timestamp
     */
    _getTransition()
    {
        const timestamp = this.getTimestamp();

        this.transition = DateTime.timezones[this.timezone]
            .find(transition =>
                transition.start <= timestamp && transition.end >= timestamp
            );
    },

    /**
     * Update the formatter for current timezone
     */
    _makeFormatter()
    {
        this.formatter = new Intl.DateTimeFormat(DateTime.formatterLocale, {
            ...DateTime.formatterOptions,
            timeZone: this.timezone
        });
    },

    /**
     * Modify the DateTime by an interval
     * @param {string|DateInterval} interval The interval to modify by
     * @param {bool} [invert=false] Whether to invert the interval
     * @return {DateTime}
     */
    // modify the current date by an interval
    _modify(interval, invert = false)
    {
        if (interval === '' + interval) {
            interval = DateInterval.fromString(interval);
        }

        let modify = 1;

        if (interval.invert) {
            modify *= -1;
        }

        if (invert) {
            modify *= -1;
        }

        const tempDate = new Date(this._getOffsetTime());

        if (interval.y) {
            tempDate.setUTCFullYear(tempDate.getUTCFullYear() + (interval.y * modify));
        }

        if (interval.m) {
            tempDate.setUTCMonth(tempDate.getUTCMonth() + (interval.m * modify));
        }

        if (interval.d) {
            tempDate.setUTCDate(tempDate.getUTCDate() + (interval.d * modify));
        }

        if (interval.h) {
            tempDate.setUTCHours(tempDate.getUTCHours() + (interval.h * modify));
        }

        if (interval.i) {
            tempDate.setUTCMinutes(tempDate.getUTCMinutes() + (interval.i * modify));
        }

        if (interval.s) {
            tempDate.setUTCSeconds(tempDate.getUTCSeconds() + (interval.s * modify));
        }

        if (interval.f) {
            tempDate.setUTCTime(tempDate.getUTCTime() + (interval.f * modify));
        }

        return this._setOffsetTime(tempDate.getTime());
    },

    /**
     * Set the number of milliseconds since the UNIX epoch (offset to timezone)
     * @param {int} time The number of milliseconds since the UNIX epoch to set (offset to timezone)
     * @returns {DateTime}
     */
    _setOffsetTime(time)
    {
        return this.setTime(time + (this.offset * 60000));
    }

});
Object.assign(DateTime.prototype, {

    /**
     * Add a DateInterval to the DateTime
     * @param {string|DateInterval} [interval] The interval to add
     * @returns {DateTime}
     */
    add(interval)
    {
        return this._modify(interval);
    },

    /**
     * Get the ordinal suffix for the date of the month
     * @returns {string} The ordinal suffix
     */
    dateSuffix()
    {
        return DateTime.lang.ordinal(this.getDate());
    },

    /**
     * Get the number of days in the month
     * @returns {int} The number of days in the month
     */
    daysInMonth()
    {
        return DateTime.daysInMonth(this.getYear(), this.getMonth());
    },

    /**
     * Get the number of days in the year
     * @returns {int} The number of days in the year
     */
    daysInYear()
    {
        return DateTime.daysInYear(this.getYear());
    },

    /**
     * Get the difference between two Dates
     * @param {null|int|string|array|Date|DateTime} [other] The other Date to use for comparison
     * @param {bool} [absolute=false] Whether the interval should always be positive
     * @returns {DateInterval}
     */
    diff(other, absolute = false)
    {
        const tempDate = new DateTime(other, this.timezone);

        const interval = new DateInterval;

        if (this == tempDate) {
            return inverval;
        }

        const lessThan = this < tempDate;

        const thisMonth = this.getMonth();
        const thisDate = this.getDate();
        const thisHour = this.getHours();
        const thisMinute = this.getMinutes();
        const thisSecond = this.getSeconds();
        const thisMillisecond = this.getMilliseconds() * 1000;

        const otherMonth = tempDate.getMonth();
        const otherDate = tempDate.getDate();
        const otherHour = tempDate.getHours();
        const otherMinute = tempDate.getMinutes();
        const otherSecond = tempDate.getSeconds();
        const otherMillisecond = tempDate.getMilliseconds() * 1000;

        interval.y = Math.abs(this.getYear() - tempDate.getYear());
        interval.m = Math.abs(thisMonth - otherMonth);
        interval.d = Math.abs(thisDate - otherDate);
        interval.h = Math.abs(thisHour - otherHour);
        interval.i = Math.abs(thisMinute - otherMinute);
        interval.s = Math.abs(thisSecond - otherSecond);
        interval.f = Math.abs(thisMillisecond - otherMillisecond);
        interval.days = Math.floor(Math.abs((this - tempDate) / 86400000));
        interval.invert = !absolute && lessThan;

        if (interval.y && interval.m &&
            ((!lessThan && thisMonth < otherMonth) ||
                (lessThan && thisMonth > otherMonth))) {
            interval.y--;
            interval.m = 12 - interval.m;
        }

        if (interval.m && interval.d &&
            ((!lessThan && thisDate < otherDate) ||
                (lessThan && thisDate > otherDate))) {
            interval.m--;
            interval.d = (lessThan ? this.daysInMonth() : tempDate.daysInMonth()) - interval.d;
        }

        if (interval.d && interval.h &&
            ((!lessThan && thisHour < otherHour) ||
                (lessThan && thisHour > otherHour))) {
            interval.d--;
            interval.h = 24 - interval.h;
        }

        if (interval.h && interval.i &&
            ((!lessThan && thisMinute < otherMinute) ||
                (lessThan && thisMinute > otherMinute))) {
            interval.h--;
            interval.i = 60 - interval.i;
        }

        if (interval.i && interval.s &&
            ((!lessThan && thisSecond < otherSecond) ||
                (lessThan && thisSecond > otherSecond))) {
            interval.i--;
            interval.s = 60 - interval.s;
        }

        if (interval.s && interval.f &&
            ((!lessThan && thisMillisecond < otherMillisecond) ||
                (lessThan && thisMillisecond > otherMillisecond))) {
            interval.s--;
            interval.f = 1000000 - interval.f;
        }

        return interval;
    },

    /**
     * Returns true if the DateTime is in daylight savings
     * @returns {bool} Whether the DateTime is in daylight savings
     */
    isDST()
    {
        if (!this.transition.dst) {
            return false;
        }

        const year = this.getYear();

        const dateA = new DateTime([year, 0, 1], this.timezone);
        const dateB = new DateTime([year, 5, 1], this.timezone);

        if (dateA.getTimestamp() < this.transition.start) {
            dateA.setYear(year + 1);
        }

        if (dateB.getTimestamp() > this.transition.end) {
            dateB.setYear(year - 1);
        }

        if (dateA.getTimestamp() > this.transition.end || dateB.getTimestamp() < this.transition.start) {
            dateA.setTimestamp(this.transition.start);
            dateB.setTimestamp(this.transition.end);
        }

        return this.offset < Math.max(dateA.offset, dateB.offset);
    },

    /**
     * Returns true if the year is a leap year
     * @returns {bool} Whether the year is a leap year
     */
    isLeapYear()
    {
        return DateTime.isLeapYear(this.getYear());
    },

    /**
     * Subtract an DateInterval to the DateTime
     * @param {string|DateInterval} [interval] The interval to subtract
     * @returns {DateTime}
     */
    sub(interval)
    {
        return this._modify(interval, true);
    },

    /**
     * Get the number of weeks in the ISO year
     * @returns {int} The number of weeks in the ISO year
     */
    weeksInISOYear()
    {
        return DateTime.weeksInISOYear(this.getISOYear());
    }

});
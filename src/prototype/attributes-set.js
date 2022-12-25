import DateTime from './../date-time.js';
import { getOffsetTime, setOffsetTime } from './../helpers.js';
import { config } from './../vars.js';
import { minimumDays } from './../formatter/utility.js';
import { daysInMonth } from './../static/utility.js';

/**
 * DateTime Attributes (Set)
 */

/**
 * Set the date of the month in current timeZone.
 * @param {number} date The date of the month.
 * @return {DateTime} The DateTime object.
 */
export function setDate(date) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCDate(date),
    );
};

/**
 * Set the day of the week in current timeZone.
 * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
 * @return {DateTime} The DateTime object.
 */
export function setDay(day) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCDate(
            this.getDate() -
            this.getDay() +
            parseInt(day),
        ),
    );
};

/**
 * Set the day of the year in current timeZone.
 * @param {number} day The day of the year. (1, 366)
 * @return {DateTime} The DateTime object.
 */
export function setDayOfYear(day) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCMonth(
            0,
            day,
        ),
    );
};

/**
 * Set the hours in current timeZone (and optionally, minutes, seconds and milliseconds).
 * @param {number} hours The hours. (0, 23)
 * @param {number} [minutes] The minutes. (0, 59)
 * @param {number} [seconds] The seconds. (0, 59)
 * @param {number} [milliseconds] The milliseconds.
 * @return {DateTime} The DateTime object.
 */
export function setHours(...args) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCHours(...args),
    );
};

/**
 * Set the milliseconds in current timeZone.
 * @param {number} milliseconds The milliseconds.
 * @return {DateTime} The DateTime object.
 */
export function setMilliseconds(milliseconds) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCMilliseconds(milliseconds),
    );
};

/**
 * Set the minutes in current timeZone (and optionally, seconds and milliseconds).
 * @param {number} minutes The minutes. (0, 59)
 * @param {number} [seconds] The seconds. (0, 59)
 * @param {number} [milliseconds] The milliseconds.
 * @return {DateTime} The DateTime object.
 */
export function setMinutes(...args) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCMinutes(...args),
    );
};

/**
 * Set the month in current timeZone (and optionally, date).
 * @param {number} month The month. (1, 12)
 * @param {number|null} [date] The date of the month.
 * @return {DateTime} The DateTime object.
 */
export function setMonth(month, date = null) {
    if (date === null) {
        date = this.getDate();

        if (config.clampDates) {
            date = Math.min(
                date,
                daysInMonth(
                    this.getYear(),
                    month,
                ),
            );
        }
    }

    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCMonth(
            month - 1,
            date,
        ),
    );
};

/**
 * Set the quarter of the year in current timeZone.
 * @param {number} quarter The quarter of the year. (1, 4)
 * @return {DateTime} The DateTime object.
 */
export function setQuarter(quarter) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCMonth(
            quarter * 3 -
            3,
        ),
    );
};

/**
 * Set the seconds in current timeZone (and optionally, milliseconds).
 * @param {number} seconds The seconds. (0, 59)
 * @param {number} [milliseconds] The milliseconds.
 * @return {DateTime} The DateTime object.
 */
export function setSeconds(...args) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCSeconds(...args),
    );
};

/**
 * Set the number of seconds since the UNIX epoch.
 * @param {number} timestamp The number of seconds since the UNIX epoch.
 * @return {DateTime} The DateTime object.
 */
export function setTimestamp(timestamp) {
    return this.setTime(timestamp * 1000);
};

/**
 * Set the local day of the week in current timeZone (and optionally, day of the week).
 * @param {number} week The local week.
 * @param {number|null} [day] The local day of the week. (1 - 7)
 * @return {DateTime} The DateTime object.
 */
export function setWeek(week, day = null) {
    if (day === null) {
        day = this.getWeekDay();
    }

    const minDays = minimumDays(this.getLocale());
    return this.setYear(this.getWeekYear(), 1, minDays + ((week - 1) * 7)).setWeekDay(day);
};

/**
 * Set the local day of the week in current timeZone.
 * @param {number} day The local day of the week. (1 - 7)
 * @return {DateTime} The DateTime object.
 */
export function setWeekDay(day) {
    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCDate(
            this.getDate() -
            this.getWeekDay() +
            parseInt(day),
        ),
    );
};

/**
 * Set the week day in month in current timeZone.
 * @param {number} week The week day in month.
 * @return {DateTime} The DateTime object.
 */
export function setWeekDayInMonth(week) {
    return this.setDate(
        this.getDate() +
        (
            week -
            this.getWeekDayInMonth()
        ) * 7,
    );
};

/**
 * Set the week of month in current timeZone.
 * @param {number} week The week of month.
 * @return {DateTime} The DateTime object.
 */
export function setWeekOfMonth(week) {
    return this.setDate(
        this.getDate() +
        (
            week -
            this.getWeekOfMonth()
        ) * 7,
    );
};

/**
 * Set the local day of the week in current timeZone (and optionally, week and day of the week).
 * @param {number} year The local year.
 * @param {number|null} [week] The local week.
 * @param {number|null} [day] The local day of the week. (1 - 7)
 * @return {DateTime} The DateTime object.
 */
export function setWeekYear(year, week = null, day = null) {
    const minDays = minimumDays(this.getLocale());

    if (week === null) {
        week = Math.min(
            this.getWeek(),
            DateTime.fromArray([year, 1, minDays]).weeksInYear(),
        );
    }

    if (day === null) {
        day = this.getWeekDay();
    }

    return this.setYear(year, 1, minDays + ((week - 1) * 7)).setWeekDay(day);
};

/**
 * Set the year in current timeZone (and optionally, month and date).
 * @param {number} year The year.
 * @param {number|null} [month] The month. (1, 12)
 * @param {number|null} [date] The date of the month.
 * @return {DateTime} The DateTime object.
 */
export function setYear(year, month = null, date = null) {
    if (month === null) {
        month = this.getMonth();
    }

    if (date === null) {
        date = this.getDate();

        if (config.clampDates) {
            date = Math.min(
                date,
                daysInMonth(
                    this.getYear(),
                    month,
                ),
            );
        }
    }

    return setOffsetTime(
        this,
        new Date(getOffsetTime(this)).setUTCFullYear(
            year,
            month - 1,
            date,
        ),
    );
};

import DateTime from './../date-time.js';
import { formatDay, formatDayPeriod, formatEra, formatMonth, formatOffset, formatTimeZoneName } from './../formatter/format.js';
import { minimumDays } from './../formatter/utility.js';
import { daysInMonth as _daysInMonth, daysInYear as _daysInYear, isLeapYear as _isLeapYear } from './../static/utility.js';

/**
 * DateTime Utility
 */

/**
 * Get the name of the day of the week in current timeZone.
 * @param {string} [type=long] The type of day name to return.
 * @return {string} The name of the day of the week.
 */
export function dayName(type = 'long') {
    return formatDay(this.getLocale(), this.getDay(), type);
};

/**
 * Get the day period in current timeZone.
 * @param {string} [type=long] The type of day period to return.
 * @return {string} The day period.
 */
export function dayPeriod(type = 'long') {
    return formatDayPeriod(
        this.getLocale(),
        this.getHours() < 12 ?
            0 :
            1,
        type,
    );
};

/**
 * Get the number of days in the current month.
 * @return {number} The number of days in the current month.
 */
export function daysInMonth() {
    return _daysInMonth(
        this.getYear(),
        this.getMonth(),
    );
};

/**
 * Get the number of days in the current year.
 * @return {number} The number of days in the current year.
 */
export function daysInYear() {
    return _daysInYear(
        this.getYear(),
    );
};

/**
 * Get the era in current timeZone.
 * @param {string} [type=long] The type of era to return.
 * @return {string} The era.
 */
export function era(type = 'long') {
    return formatEra(
        this.getLocale(),
        this.getYear() < 0 ?
            0 :
            1,
        type,
    );
};

/**
 * Return true if the DateTime is in daylight savings.
 * @return {Boolean} TRUE if the current time is in daylight savings, otherwise FALSE.
 */
export function isDST() {
    if (!this._dynamicTz) {
        return false;
    }

    const year = this.getYear();
    const dateA = DateTime.fromArray([year, 1, 1], {
        timeZone: this.getTimeZone(),
    });
    const dateB = DateTime.fromArray([year, 6, 1], {
        timeZone: this.getTimeZone(),
    });

    return this.getTimeZoneOffset() < Math.max(dateA.getTimeZoneOffset(), dateB.getTimeZoneOffset());
};

/**
 * Return true if the year is a leap year.
 * @return {Boolean} TRUE if the current year is a leap year, otherwise FALSE.
 */
export function isLeapYear() {
    return _isLeapYear(
        this.getYear(),
    );
};

/**
 * Get the name of the month in current timeZone.
 * @param {string} [type=long] The type of month name to return.
 * @return {string} The name of the month.
 */
export function monthName(type = 'long') {
    return formatMonth(this.getLocale(), this.getMonth(), type);
};

/**
 * Get the name of the current timeZone.
 * @param {string} [type=long] The formatting type.
 * @return {string} The name of the time zone.
 */
export function timeZoneName(type = 'long') {
    return this._dynamicTz ?
        formatTimeZoneName(this.getLocale(), this.getTime(), this.getTimeZone(), type) :
        'GMT' + formatOffset(this.getTimeZoneOffset(), true, type === 'short');
};

/**
 * Get the number of weeks in the current year.
 * @return {number} The number of weeks in the current year.
 */
export function weeksInYear() {
    const minDays = minimumDays(this.getLocale());
    return this.setMonth(12, 24 + minDays).getWeek();
};

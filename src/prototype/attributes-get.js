import { getOffsetTime } from './../helpers.js';
import { minimumDays, weekDay } from './../formatter/utility.js';
import { dayOfYear } from './../static/utility.js';

/**
 * DateTime Attributes (Get)
 */

/**
 * Get the date of the month in current timeZone.
 * @return {number} The date of the month.
 */
export function getDate() {
    return new Date(getOffsetTime(this)).getUTCDate();
};

/**
 * Get the day of the week in current timeZone.
 * @return {number} The day of the week. (0 - Sunday, 6 - Saturday)
 */
export function getDay() {
    return new Date(getOffsetTime(this)).getUTCDay();
};

/**
 * Get the day of the year in current timeZone.
 * @return {number} The day of the year. (1, 366)
 */
export function getDayOfYear() {
    return dayOfYear(
        this.getYear(),
        this.getMonth(),
        this.getDate(),
    );
};

/**
 * Get the hours of the day in current timeZone.
 * @return {number} The hours of the day. (0, 23)
 */
export function getHours() {
    return new Date(getOffsetTime(this)).getUTCHours();
};

/**
 * Get the milliseconds in current timeZone.
 * @return {number} The milliseconds.
 */
export function getMilliseconds() {
    return new Date(getOffsetTime(this)).getUTCMilliseconds();
};

/**
 * Get the minutes in current timeZone.
 * @return {number} The minutes. (0, 59)
 */
export function getMinutes() {
    return new Date(getOffsetTime(this)).getUTCMinutes();
};

/**
 * Get the month in current timeZone.
 * @return {number} The month. (1, 12)
 */
export function getMonth() {
    return new Date(getOffsetTime(this)).getUTCMonth() + 1;
};

/**
 * Get the quarter of the year in current timeZone.
 * @return {number} The quarter of the year. (1, 4)
 */
export function getQuarter() {
    return Math.ceil(this.getMonth() / 3);
};

/**
 * Get the seconds in current timeZone.
 * @return {number} The seconds. (0, 59)
 */
export function getSeconds() {
    return new Date(getOffsetTime(this)).getUTCSeconds();
};

/**
 * Get the number of seconds since the UNIX epoch.
 * @return {number} The number of seconds since the UNIX epoch.
 */
export function getTimestamp() {
    return Math.floor(this.getTime() / 1000);
};

/**
 * Get the local week in current timeZone.
 * @return {number} The local week. (1, 53)
 */
export function getWeek() {
    const thisWeek = this.startOf('day').setWeekDay(1);
    const firstWeek = thisWeek.setWeek(1, 1);

    return 1 +
        (
            (
                (thisWeek - firstWeek) /
                604800000
            ) | 0
        );
};

/**
 * Get the local day of the week in current timeZone.
 * @return {number} The local day of the week. (1 - 7)
 */
export function getWeekDay() {
    return weekDay(
        this.getLocale(),
        this.getDay(),
    );
};

/**
 * Get the week day in month in current timeZone.
 * @return {number} The week day in month.
 */
export function getWeekDayInMonth() {
    const thisWeek = this.getWeek();
    const first = this.setDate(1);
    const firstWeek = first.getWeek();
    const offset = first.getWeekDay() > this.getWeekDay() ?
        0 : 1;
    return firstWeek > thisWeek ?
        thisWeek + offset :
        thisWeek - firstWeek + offset;
};

/**
 * Get the week of month in current timeZone.
 * @return {number} The week of month.
 */
export function getWeekOfMonth() {
    const thisWeek = this.getWeek();
    const firstWeek = this.setDate(1).getWeek();
    return firstWeek > thisWeek ?
        thisWeek + 1 :
        thisWeek - firstWeek + 1;
};

/**
 * Get the week year in current timeZone.
 * @return {number} The week year.
 */
export function getWeekYear() {
    const minDays = minimumDays(this.getLocale());
    return this.setWeekDay(7 - minDays + 1).getYear();
};

/**
 * Get the year in current timeZone.
 * @return {number} The year.
 */
export function getYear() {
    return new Date(getOffsetTime(this)).getUTCFullYear();
};

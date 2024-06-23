import { daysInMonth } from './../static/utility.js';

/**
 * DateTime Manipulation
 */

/**
 * Add a day to the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function addDay() {
    return this.addDays(1);
};

/**
 * Add days to the current DateTime.
 * @param {number} amount The number of days to add.
 * @return {DateTime} The DateTime object.
 */
export function addDays(amount) {
    return this.setDate(
        this.getDate() + amount,
    );
};

/**
 * Add an hour to the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function addHour() {
    return this.addHours(1);
};

/**
 * Add hours to the current DateTime.
 * @param {number} amount The number of hours to add.
 * @return {DateTime} The DateTime object.
 */
export function addHours(amount) {
    return this.setTime(
        this.getTime() + (amount * 3600000),
    );
};

/**
 * Add a minute to the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function addMinute() {
    return this.addMinutes(1);
};

/**
 * Add minutes to the current DateTime.
 * @param {number} amount The number of minutes to add.
 * @return {DateTime} The DateTime object.
 */
export function addMinutes(amount) {
    return this.setTime(
        this.getTime() + (amount * 60000),
    );
};

/**
 * Add a month to the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function addMonth() {
    return this.addMonths(1);
};

/**
 * Add months to the current DateTime.
 * @param {number} amount The number of months to add.
 * @return {DateTime} The DateTime object.
 */
export function addMonths(amount) {
    return this.setMonth(
        this.getMonth() + amount,
    );
};

/**
 * Add a second to the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function addSecond() {
    return this.addSeconds(1);
};

/**
 * Add seconds to the current DateTime.
 * @param {number} amount The number of seconds to add.
 * @return {DateTime} The DateTime object.
 */
export function addSeconds(amount) {
    return this.setTime(
        this.getTime() + (amount * 1000),
    );
};

/**
 * Add a week to the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function addWeek() {
    return this.addWeeks(1);
};

/**
 * Add weeks to the current DateTime.
 * @param {number} amount The number of weeks to add.
 * @return {DateTime} The DateTime object.
 */
export function addWeeks(amount) {
    return this.setDate(
        this.getDate() + (amount * 7),
    );
};

/**
 * Add a year to the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function addYear() {
    return this.addYears(1);
};

/**
 * Add years to the current DateTime.
 * @param {number} amount The number of years to add.
 * @return {DateTime} The DateTime object.
 */
export function addYears(amount) {
    return this.setYear(
        this.getYear() + amount,
    );
};

/**
 * Set the DateTime to the end of the day.
 * @return {DateTime} The DateTime object.
 */
export function endOfDay() {
    return this.setHours(23, 59, 59, 999);
};

/**
 * Set the DateTime to the end of the hour.
 * @return {DateTime} The DateTime object.
 */
export function endOfHour() {
    return this.setMinutes(59, 59, 999);
};

/**
 * Set the DateTime to the end of the minute.
 * @return {DateTime} The DateTime object.
 */
export function endOfMinute() {
    return this.setSeconds(59, 999);
};

/**
 * Set the DateTime to the end of the month.
 * @return {DateTime} The DateTime object.
 */
export function endOfMonth() {
    return this.setDate(this.daysInMonth())
        .endOfDay();
}

/**
 * Set the DateTime to the end of the quarter.
 * @return {DateTime} The DateTime object.
 */
export function endOfQuarter() {
    const month = this.getQuarter() * 3;
    return this.setMonth(month, daysInMonth(this.getYear(), month))
        .endOfDay();
};

/**
 * Set the DateTime to the end of the second.
 * @return {DateTime} The DateTime object.
 */
export function endOfSecond() {
    return this.setMilliseconds(999);
};

/**
 * Set the DateTime to the end of the week.
 * @return {DateTime} The DateTime object.
 */
export function endOfWeek() {
    return this.setWeekDay(7)
        .endOfDay();
};

/**
 * Set the DateTime to the end of the year.
 * @return {DateTime} The DateTime object.
 */
export function endOfYear() {
    return this.setMonth(12, 31)
        .endOfDay();
};

/**
 * Set the DateTime to the start of the day.
 * @return {DateTime} The DateTime object.
 */
export function startOfDay() {
    return this.setHours(0, 0, 0, 0);
};

/**
 * Set the DateTime to the start of the hour.
 * @return {DateTime} The DateTime object.
 */
export function startOfHour() {
    return this.setMinutes(0, 0, 0);
};

/**
 * Set the DateTime to the start of the minute.
 * @return {DateTime} The DateTime object.
 */
export function startOfMinute() {
    return this.setSeconds(0, 0);
};

/**
 * Set the DateTime to the start of the month.
 * @return {DateTime} The DateTime object.
 */
export function startOfMonth() {
    return this.setDate(1)
        .startOfDay();
}

/**
 * Set the DateTime to the start of the quarter.
 * @return {DateTime} The DateTime object.
 */
export function startOfQuarter() {
    const month = this.getQuarter() * 3 - 2;
    return this.setMonth(month, 1)
        .startOfDay();
};

/**
 * Set the DateTime to the start of the second.
 * @return {DateTime} The DateTime object.
 */
export function startOfSecond() {
    return this.setMilliseconds(0);
};

/**
 * Set the DateTime to the start of the week.
 * @return {DateTime} The DateTime object.
 */
export function startOfWeek() {
    return this.setWeekDay(1)
        .startOfDay();
};

/**
 * Set the DateTime to the start of the year.
 * @return {DateTime} The DateTime object.
 */
export function startOfYear() {
    return this.setMonth(1, 1)
        .startOfDay();
};

/**
 * Subtract a day from the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function subDay() {
    return this.addDays(-1);
};

/**
 * Subtract days from the current DateTime.
 * @param {number} amount The number of days to subtract.
 * @return {DateTime} The DateTime object.
 */
export function subDays(amount) {
    return this.addDays(-amount);
};

/**
 * Subtract an hour from the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function subHour() {
    return this.addHours(-1);
};

/**
 * Subtract hours from the current DateTime.
 * @param {number} amount The number of hours to subtract.
 * @return {DateTime} The DateTime object.
 */
export function subHours(amount) {
    return this.addHours(-amount);
};

/**
 * Subtract a minute from the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function subMinute() {
    return this.addMinutes(-1);
};

/**
 * Subtract minutes from the current DateTime.
 * @param {number} amount The number of minutes to subtract.
 * @return {DateTime} The DateTime object.
 */
export function subMinutes(amount) {
    return this.addMinutes(-amount);
};

/**
 * Subtract a month from the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function subMonth() {
    return this.addMonths(-1);
};

/**
 * Subtract months from the current DateTime.
 * @param {number} amount The number of months to subtract.
 * @return {DateTime} The DateTime object.
 */
export function subMonths(amount) {
    return this.addMonths(-amount);
};

/**
 * Subtract a second from the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function subSecond() {
    return this.addSeconds(-1);
};

/**
 * Subtract seconds from the current DateTime.
 * @param {number} amount The number of seconds to subtract.
 * @return {DateTime} The DateTime object.
 */
export function subSeconds(amount) {
    return this.addSeconds(-amount);
};

/**
 * Subtract a week from the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function subWeek() {
    return this.addWeeks(-1);
};

/**
 * Subtract weeks from the current DateTime.
 * @param {number} amount The number of weeks to subtract.
 * @return {DateTime} The DateTime object.
 */
export function subWeeks(amount) {
    return this.addWeeks(-amount);
};

/**
 * Subtract a year from the current DateTime.
 * @return {DateTime} The DateTime object.
 */
export function subYear() {
    return this.addYears(-1);
};

/**
 * Subtract years from the current DateTime.
 * @param {number} amount The number of years to subtract.
 * @return {DateTime} The DateTime object.
 */
export function subYears(amount) {
    return this.addYears(-amount);
};

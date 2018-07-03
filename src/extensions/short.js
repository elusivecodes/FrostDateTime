Object.assign(DateTime.prototype, {

    add(interval) {
        return this.modify(interval);
    },

    date(date = false) {
        return date === false ?
            this.getDate() :
            this.setDate(date);
    },

    day(day = false) {
        return day === false ?
            this.getDay() :
            this.setDay(day);
    },

    dayOfYear(day = false) {
        return day === false ?
            this.getDayOfYear() :
            this.setDayOfYear(day);
    },

    hours(hours = false) {
        return hours === false ?
            this.getHours() :
            this.setHours(hours);
    },

    isoDay(day = false) {
        return day === false ?
            this.getIsoDay() :
            this.setIsoDay(day);
    },

    isoWeek(week = false) {
        return week === false ?
            this.getIsoWeek() :
            this.setIsoWeek(week);
    },

    isoYear(year = false) {
        return year === false ?
            this.getIsoYear() :
            this.setIsoYear(year);
    },

    milliseconds(ms = false) {
        return ms === false ?
            this.getMilliseconds() :
            this.setMilliseconds(ms);
    },

    minutes(minutes = false) {
        return minutes === false ?
            this.getMinutes() :
            this.setMinutes(minutes);
    },

    month(month = false) {
        return month === false ?
            this.getMonth() + 1 :
            this.setMonth(month - 1);
    },

    offset(offset = false) {
        return offset === false ?
            this.getTimezoneOffset() :
            this.setTimezoneOffset(offset);
    },

    quarter(quarter = false) {
        return quarter === false ?
            this.getQuarter() :
            this.setQuarter(quarter);
    },

    seconds(seconds = false) {
        return seconds === false ?
            this.getSeconds() :
            this.setSeconds(seconds);
    },

    sub(interval) {
        return this.modify(interval, true);
    },

    time(time = false) {
        return time === false ?
            this.getTime() :
            this.setTime(time);
    },

    timestamp(timestamp = false) {
        return timestamp === false ?
            this.getTimestamp() :
            this.setTimestamp(timestamp);
    },

    timezone(timezone = false) {
        return timezone === false ?
            this.getTimezone() :
            this.setTimezone(timezone);
    },

    year(year = false) {
        return year === false ?
            this.getFullYear() :
            this.setFullYear(year);
    }
});
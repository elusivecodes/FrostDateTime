"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * FrostDateTime v1.0
 * https://github.com/elusivecodes/FrostDateTime
 */
(function (global, factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory();
  } else {
    Object.assign(global, factory());
  }
})(void 0, function () {
  'use strict';
  /**
   * DateInterval class
   * @class
   */

  var DateInterval =
  /*#__PURE__*/
  function () {
    /**
     * New DateInterval constructor.
     * @param {string} [interval] The ISO duration string.
     * @returns {DateInterval} A new DateInterval object.
     */
    function DateInterval() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _classCallCheck(this, DateInterval);

      this.y = 0;
      this.m = 0;
      this.d = 0;
      this.h = 0;
      this.i = 0;
      this.s = 0;
      this.f = 0;
      this.days = null;
      this.invert = false;
      var match = interval.match(DateInterval.isoRegex);

      if (match) {
        this.y += match[1];
        this.m += match[2];
        this.d += match[3];
        this.d += match[4] * 7;
        this.h += match[5];
        this.i += match[6];
        this.s += match[7];
      }
    }
    /**
     * Format the current interval with a PHP DateInterval format string.
     * @param {string} formatString The format string to use.
     * @returns {string} The formatted date interval.
     */


    _createClass(DateInterval, [{
      key: "format",
      value: function format(formatString) {
        var output = '',
            prefixed = false;

        var _arr = _toConsumableArray(formatString);

        for (var _i = 0; _i < _arr.length; _i++) {
          var char = _arr[_i];

          if (!prefixed && char === '%') {
            prefixed = true;
            continue;
          }

          if (!prefixed || !DateInterval.formatData[char]) {
            output += char;
            prefixed = false;
            continue;
          }

          output += DateInterval.formatData[char](this);
        }

        return output;
      }
      /**
       * Format the current interval to a relative time string.
       * @param {number} [maxValues=1] The maximum number of values to return.
       * @returns {string} The formatted relative time string.
       */

    }, {
      key: "toString",
      value: function toString() {
        var maxValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var formats = [],
            keys = ['y', 'm', 'd', 'h', 'i', 's'];

        while (maxValues > 0 && keys.length) {
          var key = keys.shift();

          if (!this[key]) {
            continue;
          }

          formats.push(DateInterval.langs[key][Math.abs(this[key] === 1 ? 0 : 1)]);
          maxValues--;
        }

        return formats.length ? DateInterval.lang.relative[this.invert ? 'ago' : 'in'].replace('%n', this.format(formats.map(function (f) {
          return DateInterval.lang.intervals[f];
        }).join(DateInterval.lang.seperator))) : DateInterval.lang.relative.now;
      }
      /**
       * Create a new DateInterval from the relative parts of the string.
       * @param {string} time The date with relative parts.
       * @returns {DateInterval} A new DateInterval object.
       */

    }], [{
      key: "fromString",
      value: function fromString(time) {
        var interval = new this(),
            regex = new RegExp(DateInterval.stringRegex, 'gi');
        var match;

        while (match = regex.exec(time)) {
          var value = parseInt(match[1]);

          if (match[2]) {
            // years
            interval.y += value;
          } else if (match[3]) {
            // months
            interval.m += value;
          } else if (match[4]) {
            // fortnights
            interval.d += value * 14;
          } else if (match[5]) {
            // weeks
            interval.d += value * 7;
          } else if (match[6]) {
            // days
            interval.d += value;
          } else if (match[7]) {
            // hours
            interval.h += value;
          } else if (match[8]) {
            // minutes
            interval.i += value;
          } else if (match[9]) {
            // seconds
            interval.s += value;
          }
        }

        return interval;
      }
      /**
       * Format a number to string (optionally zero-padded).
       * @param {number} value The number to format.
       * @param {number} [padding] The number of digits to zero-pad to.
       * @returns {string} The formatted number string.
       */

    }, {
      key: "_formatNumber",
      value: function _formatNumber(number) {
        var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return "".concat(number).padStart(padding, 0);
      }
    }]);

    return DateInterval;
  }();

  DateInterval.formatData = {
    /* YEAR */
    Y: function Y(interval) {
      return DateInterval._formatNumber(interval.y, 2);
    },
    y: function y(interval) {
      return DateInterval._formatNumber(interval.y);
    },

    /* MONTH */
    M: function M(interval) {
      return DateInterval._formatNumber(interval.m, 2);
    },
    m: function m(interval) {
      return DateInterval._formatNumber(interval.m);
    },

    /* DAYS */
    D: function D(interval) {
      return DateInterval._formatNumber(interval.d, 2);
    },
    d: function d(interval) {
      return DateInterval._formatNumber(interval.d);
    },
    a: function a(interval) {
      return DateInterval._formatNumber(interval.days);
    },

    /* HOURS */
    H: function H(interval) {
      return DateInterval._formatNumber(interval.h, 2);
    },
    h: function h(interval) {
      return DateInterval._formatNumber(interval.h);
    },

    /* MINUTES */
    I: function I(interval) {
      return DateInterval._formatNumber(interval.i, 2);
    },
    i: function i(interval) {
      return DateInterval._formatNumber(interval.i);
    },

    /* SECONDS */
    S: function S(interval) {
      return DateInterval._formatNumber(interval.s, 2);
    },
    s: function s(interval) {
      return DateInterval._formatNumber(interval.s);
    },

    /* MICROSECONDS */
    F: function F(interval) {
      return DateInterval._formatNumber(interval.f, 6);
    },
    f: function f(interval) {
      return DateInterval._formatNumber(interval.f);
    },

    /* SIGN */
    R: function R(interval) {
      return interval.invert ? '-' : '+';
    },
    r: function r(interval) {
      return interval.invert ? '-' : '';
    }
  };
  Object.assign(DateInterval, {
    // Language
    lang: {
      intervals: {
        day: '%d day',
        days: '%d days',
        hour: '%h hour',
        hours: '%h hours',
        minute: '%i minute',
        minutes: '%i minutes',
        month: '%m month',
        months: '%m months',
        second: '%s second',
        seconds: '%s seconds',
        year: '%y year',
        years: '%y years'
      },
      relative: {
        ago: '%n ago',
        in: 'In %n',
        now: 'Now'
      },
      seperator: ', '
    },
    langs: {
      y: ['year', 'years'],
      m: ['month', 'months'],
      d: ['day', 'days'],
      h: ['hour', 'hours'],
      i: ['minute', 'minutes'],
      s: ['second', 'seconds']
    },
    // ISO RegEx
    isoRegex: /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:(\d+)W)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?|)$/,
    // String RegEx
    stringRegex: /([\+\-]?\s*\d+)\s*(?:(years?)|(months?)|(fortnights?|forthnights?)|(weeks?)|(days?)|(hours?)|(minutes?|mins?)|(seconds?|secs?))/
  });
  /**
   * DateTime class
   * @class
   */

  var DateTime =
  /*#__PURE__*/
  function () {
    /**
     * New DateTime constructor.
     * @param {number|number[]|string|Date|DateTime} [date] The date to parse.
     * @param {string} [timezone] The timezone.
     * @returns {DateTime} A new DateTime object.
     */
    function DateTime() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _classCallCheck(this, DateTime);

      var timestamp,
          adjustOffset = false;

      if (date === null) {
        timestamp = Date.now();
      } else if (Array.isArray(date)) {
        timestamp = Date.UTC.apply(Date, _toConsumableArray(date));
        adjustOffset = true;
      } else if (!isNaN(parseFloat(date)) && isFinite(date)) {
        timestamp = date;
      } else if (date === "".concat(date)) {
        timestamp = Date.parse(date);
        timestamp -= new Date().getTimezoneOffset() * 60000;
        adjustOffset = true;
      } else if (date instanceof Date || date instanceof DateTime) {
        timestamp = date.getTime();
      } else {
        throw new Error('Invalid date supplied');
      }

      if (!timezone) {
        if (date instanceof DateTime) {
          timezone = date.getTimezone();
        } else {
          timezone = DateTime.defaultTimezone;
        }
      } else if (!DateTime._timezones[timezone]) {
        throw new Error('Invalid timezone supplied');
      }

      this._utcDate = new Date(timestamp);
      this._timezone = timezone;

      this._makeFormatter();

      this._checkOffset();

      if (this._offset && adjustOffset) {
        this._utcDate.setTime(this.getTime() + this._offset * 60000);

        this._checkOffset();
      }

      this._getTransition();
    }
    /**
     * Get the number of milliseconds since the UNIX epoch.
     * @returns {number} The number of milliseconds since the UNIX epoch.
     */


    _createClass(DateTime, [{
      key: "valueOf",
      value: function valueOf() {
        return this.getTime();
      }
      /**
       * Return a primitive value of the DateTime.
       * @returns {string|number}
       */

    }, {
      key: Symbol.toPrimitive,
      value: function value(hint) {
        return hint === 'number' ? this.valueOf() : this.toString();
      }
    }]);

    return DateTime;
  }();
  /**
   * DateTimeImmutable class
   * @class
   */


  var DateTimeImmutable =
  /*#__PURE__*/
  function (_DateTime) {
    _inherits(DateTimeImmutable, _DateTime);

    function DateTimeImmutable() {
      _classCallCheck(this, DateTimeImmutable);

      return _possibleConstructorReturn(this, _getPrototypeOf(DateTimeImmutable).apply(this, arguments));
    }

    _createClass(DateTimeImmutable, [{
      key: "setTime",

      /**
       * Set the number of milliseconds since the UNIX epoch.
       * @param {number} time The number of milliseconds since the UNIX epoch.
       * @returns {DateTimeImmutable} A new DateTimeImmutable object.
       */
      value: function setTime(time) {
        return new DateTimeImmutable(time, this._timezone);
      }
      /**
       * Set the current timezone.
       * @param {string} timezone The name of the timezone.
       * @returns {DateTimeImmutable} A new DateTimeImmutable object.
       */

    }, {
      key: "setTimezone",
      value: function setTimezone(timezone) {
        return new DateTimeImmutable(this, timezone);
      }
    }]);

    return DateTimeImmutable;
  }(DateTime);

  DateTime.formatData = {
    /* YEAR */
    // leap year
    L: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.isLeapYear() ? 1 : 0);
      }
    },
    // year
    Y: {
      value: 'year',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,4})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getFullYear());
      }
    },
    // year short
    y: {
      value: 'year',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return (value < 70 ? 2000 : 1900) + DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        var year = datetime.getFullYear().toString();
        return DateTime._formatNumber(year.substring(year.length - 2));
      }
    },
    // iso year
    o: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getISOYear());
      }
    },

    /* MONTH */
    // month name
    F: {
      value: 'month',
      regex: function regex() {
        return '(' + DateTime.lang.months.full.join('|') + ')';
      },
      input: function input(value) {
        return DateTime.lang.months['full'].findIndex(function (month) {
          return month === value;
        });
      },
      output: function output(datetime) {
        return datetime.getMonthName();
      }
    },
    // month name short
    M: {
      value: 'month',
      regex: function regex() {
        return '(' + DateTime.lang.months.short.join('|') + ')';
      },
      input: function input(value) {
        return DateTime.lang.months['short'].findIndex(function (month) {
          return month === value;
        });
      },
      output: function output(datetime) {
        return datetime.getMonthName('short');
      }
    },
    // month
    m: {
      value: 'month',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value) - 1;
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getMonth() + 1, 2);
      }
    },
    // month short
    n: {
      value: 'month',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value) - 1;
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getMonth() + 1);
      }
    },
    // days in month
    t: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.daysInMonth());
      }
    },

    /* WEEKS */
    // iso week
    W: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getISOWeek());
      }
    },

    /* DAYS */
    // day of year
    z: {
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,3})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getDayOfYear());
      }
    },
    // date
    d: {
      value: 'date',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getDate(), 2);
      }
    },
    // date short
    j: {
      value: 'date',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getDate());
      }
    },
    // ordinal suffix
    S: {
      regex: function regex() {
        return '(st|[nr]d|th)';
      },
      output: function output(datetime) {
        return datetime.dateSuffix();
      }
    },
    // iso day
    N: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getISODay());
      }
    },
    // day of week
    w: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getDay());
      }
    },
    // day name
    l: {
      value: 'day',
      regex: function regex() {
        return '(' + DateTime.lang.days.full.join('|') + ')';
      },
      input: function input(value) {
        return DateTime.lang.days.full.findIndex(function (day) {
          return day === value;
        });
      },
      output: function output(datetime) {
        return datetime.getDayName();
      }
    },
    // day name short
    D: {
      value: 'day',
      regex: function regex() {
        return '(' + DateTime.lang.days.short.join('|') + ')';
      },
      input: function input(value) {
        return DateTime.lang.days.short.findIndex(function (day) {
          return day === value;
        });
      },
      output: function output(datetime) {
        return datetime.getDayName('short');
      }
    },

    /* TIME */
    // day period
    a: {
      value: 'pm',
      regex: function regex() {
        return '(' + DateTime.lang.dayPeriods.lower.join('|') + ')';
      },
      input: function input(value) {
        return DateTime.lang.dayPeriods.lower.findIndex(function (period) {
          return period === value;
        });
      },
      output: function output(datetime) {
        return datetime.getHours() < 12 ? DateTime.lang.dayPeriods.lower[0] : DateTime.lang.dayPeriods.lower[1];
      }
    },
    // day period upper
    A: {
      value: 'pm',
      regex: function regex() {
        return '(' + DateTime.lang.dayPeriods.upper.join('|') + ')';
      },
      input: function input(value) {
        return DateTime.lang.dayPeriods.upper.findIndex(function (period) {
          return period === value;
        });
      },
      output: function output(datetime) {
        return datetime.getHours() < 12 ? DateTime.lang.dayPeriods.upper[0] : DateTime.lang.dayPeriods.upper[1];
      }
    },
    // swatch time
    B: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getBeat());
      }
    },
    // hours (24)
    H: {
      value: 'hours',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getHours(), 2);
      }
    },
    // hours short (24)
    G: {
      value: 'hours',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getHours());
      }
    },
    // hours (12)
    h: {
      value: 'hours',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value) % 12;
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getHours() % 12 || 12, 2);
      }
    },
    // hours short (12)
    g: {
      value: 'hours',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value) % 12;
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getHours() % 12 || 12);
      }
    },
    // minutes
    i: {
      value: 'minutes',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getMinutes(), 2);
      }
    },
    // seconds
    s: {
      value: 'seconds',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getSeconds(), 2);
      }
    },
    // microseconds
    u: {
      value: 'milliseconds',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,6})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value) / 1000;
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getMilliseconds() * 1000);
      }
    },
    // milliseconds
    v: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getMilliseconds());
      }
    },

    /* TIMEZONE */
    // timezone
    e: {
      value: 'timezone',
      regex: '([\\w\\/]+)',
      input: function input(value) {
        return value;
      },
      output: function output(datetime) {
        return datetime._timezone;
      }
    },
    // daylight savings
    I: {
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.isDST() ? 1 : 0);
      }
    },
    // offset
    O: {
      value: 'offset',
      regex: function regex() {
        return '([\\+\\-][' + DateTime.lang.numberRegex + ']{4})';
      },
      input: function input(value) {
        return (DateTime._parseNumber(value.slice(1, 3)) * 60 + DateTime._parseNumber(value.slice(3, 5))) * (value[0] === '-' ? 1 : -1);
      },
      output: function output(datetime) {
        return (datetime._offset > 0 ? '-' : '+') + DateTime._formatNumber(Math.abs(datetime._offset / 60 | 0), 2) + DateTime._formatNumber(datetime._offset % 60, 2);
      }
    },
    // offset colon
    P: {
      value: 'offset',
      regex: function regex() {
        return '([\\+\\-][' + DateTime.lang.numberRegex + ']{2}\\:[' + DateTime.lang.numberRegex + ']{2})';
      },
      input: function input(value) {
        return (DateTime._parseNumber(value.slice(1, 3)) * 60 + DateTime._parseNumber(value.slice(4, 6))) * (value[0] === '-' ? 1 : -1);
      },
      output: function output(datetime) {
        return (datetime._offset > 0 ? '-' : '+') + DateTime._formatNumber(Math.abs(datetime._offset / 60 | 0), 2) + ':' + DateTime._formatNumber(datetime._offset % 60, 2);
      }
    },
    // timezone abbreviated
    T: {
      value: 'timezoneAbbr',
      regex: '([A-Z]{1,5})',
      input: function input(value) {
        return value;
      },
      output: function output(datetime) {
        return datetime.getTimezoneAbbr();
      }
    },
    // offset seconds
    Z: {
      value: 'offset',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']{1,5})';
      },
      input: function input(value) {
        return DateTime._parseNumber(value) / 60;
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime._offset * -60);
      }
    },

    /* FULL */
    // iso 8601
    c: {
      output: function output(datetime) {
        return datetime.toISOString();
      }
    },
    // rfc 2822
    r: {
      output: function output(datetime) {
        return datetime.format(DateTime.formats.rfc822);
      }
    },
    // timestamp
    U: {
      value: 'timestamp',
      regex: function regex() {
        return '([' + DateTime.lang.numberRegex + ']+)';
      },
      input: function input(value) {
        return DateTime._parseNumber(value);
      },
      output: function output(datetime) {
        return DateTime._formatNumber(datetime.getTime());
      }
    },

    /* SPECIAL */
    // space
    ' ': {
      regex: '(\\s)'
    },
    // seperator
    '#': {
      regex: function regex() {
        return '([' + DateTime._seperators.map(function (seperator) {
          return '\\' + seperator;
        }).join('') + '])';
      }
    },
    // wildcard
    '?': {
      regex: '(.)'
    },
    // wildcards
    '*': {
      regex: function regex() {
        return '([^' + DateTime._seperators.map(function (seperator) {
          return '\\' + seperator;
        }) + DateTime.lang.numberRegex + ']*)';
      }
    },
    // reset
    '!': {
      regex: '\\!'
    },
    // reset soft
    '|': {
      regex: '\\|'
    }
  };
  Object.assign(DateTime.prototype, {
    /**
     * Get the internet swatch time beat in current timezone.
     * @returns {number} The internet swatch time beat.
     */
    getBeat: function getBeat() {
      var tempDate = new Date(this.getTime() + 3600000);
      return (tempDate.getUTCHours() * 3600000 + tempDate.getUTCMinutes() * 60000 + tempDate.getUTCSeconds() * 1000 + tempDate.getUTCMilliseconds()) / 86400 | 0;
    },

    /**
     * Get the date of the month in current timezone.
     * @returns {number} The date of the month.
     */
    getDate: function getDate() {
      return new Date(this._getOffsetTime()).getUTCDate();
    },

    /**
     * Get the day of the week in current timezone.
     * @returns {number} The day of the week. (0 - Sunday, 6 - Saturday)
     */
    getDay: function getDay() {
      return new Date(this._getOffsetTime()).getUTCDay();
    },

    /**
     * Get the name of the day of the week in current timezone.
     * @param {string} [type=full] The type of day name to return.
     * @returns {string} The name of the day of the week.
     */
    getDayName: function getDayName() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'full';
      return DateTime.lang.days[type][this.getDay()];
    },

    /**
     * Get the day of the year in current timezone.
     * @returns {number} The day of the year. (1, 366)
     */
    getDayOfYear: function getDayOfYear() {
      return DateTime.dayOfYear(this.getYear(), this.getMonth(), this.getDate());
    },

    /**
     * Get the hours of the day in current timezone.
     * @returns {number} The hours of the day. (0, 23)
     */
    getHours: function getHours() {
      return new Date(this._getOffsetTime()).getUTCHours();
    },

    /**
     * Get the ISO day of the week in current timezone.
     * @returns {number} The ISO day of the week. (1 - Monday, 7 = Sunday)
     */
    getISODay: function getISODay() {
      return DateTime._isoDay(this.getDay());
    },

    /**
     * Get the ISO week in current timezone.
     * @returns {number} The ISO week. (1, 53)
     */
    getISOWeek: function getISOWeek() {
      var week = DateTime._isoDate(this.getYear(), this.getMonth(), this.getDate()),
          firstWeek = DateTime._isoDate(week.getUTCFullYear(), 0, 4);

      return 1 + ((week - firstWeek) / 604800000 | 0);
    },

    /**
     * Get the ISO year in current timezone.
     * @returns {number} The ISO year.
     */
    getISOYear: function getISOYear() {
      return DateTime._isoDate(this.getYear(), this.getMonth(), this.getDate()).getUTCFullYear();
    },

    /**
     * Get the milliseconds in current timezone.
     * @returns {number} The milliseconds.
     */
    getMilliseconds: function getMilliseconds() {
      return new Date(this._getOffsetTime()).getUTCMilliseconds();
    },

    /**
     * Get the minutes in current timezone.
     * @returns {number} The minutes. (0, 59)
     */
    getMinutes: function getMinutes() {
      return new Date(this._getOffsetTime()).getUTCMinutes();
    },

    /**
     * Get the month in current timezone.
     * @returns {number} The month. (0, 11)
     */
    getMonth: function getMonth() {
      return new Date(this._getOffsetTime()).getUTCMonth();
    },

    /**
     * Get the name of the month in current timezone.
     * @param {string} [type=full] The type of month name to return.
     * @returns {string} The name of the month.
     */
    getMonthName: function getMonthName() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'full';
      return DateTime.lang.months[type][this.getMonth()];
    },

    /**
     * Get the quarter of the year in current timezone.
     * @returns {number} The quarter of the year. (1, 4)
     */
    getQuarter: function getQuarter() {
      return Math.ceil((this.getMonth() + 1) / 3);
    },

    /**
     * Get the seconds in current timezone.
     * @returns {number} The seconds. (0, 59)
     */
    getSeconds: function getSeconds() {
      return new Date(this._getOffsetTime()).getUTCSeconds();
    },

    /**
     * Get the number of milliseconds since the UNIX epoch.
     * @returns {number} The number of milliseconds since the UNIX epoch.
     */
    getTime: function getTime() {
      return this._utcDate.getTime();
    },

    /**
     * Get the number of seconds since the UNIX epoch.
     * @returns {number} The number of seconds since the UNIX epoch.
     */
    getTimestamp: function getTimestamp() {
      return this.getTime() / 1000;
    },

    /**
     * Get the name of the current timezone.
     * @returns {string} The name of the current timezone.
     */
    getTimezone: function getTimezone() {
      return this._timezone;
    },

    /**
     * Get the abbreviated name of the current timezone.
     * @returns {string} The abbreviated name of the current timezone.
     */
    getTimezoneAbbr: function getTimezoneAbbr() {
      return this.isDST() ? this._transition.dst : this._transition.abbr;
    },

    /**
     * Get the UTC offset (in minutes) of the current timezone.
     * @returns {number} The UTC offset (in minutes) of the current timezone.
     */
    getTimezoneOffset: function getTimezoneOffset() {
      return this._offset;
    },

    /**
     * Get the year in current timezone.
     * @returns {number} The year.
     */
    getYear: function getYear() {
      return new Date(this._getOffsetTime()).getUTCFullYear();
    }
  });
  Object.assign(DateTime.prototype, {
    /**
     * Set the internet swatch time beat in current timezone.
     * @param {number} beat The internet swatch time beat.
     * @returns {DateTime} The DateTime object.
     */
    setBeat: function setBeat(beat) {
      return this.setTime(new Date(this.getTime() + 3600000).setUTCHours(0, 0, 0, beat * 86400) - 3600000);
    },

    /**
     * Set the date of the month in current timezone.
     * @param {number} date The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setDate: function setDate(date) {
      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCDate(date));
    },

    /**
     * Set the day of the week in current timezone.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @returns {DateTime} The DateTime object.
     */
    setDay: function setDay(day) {
      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCDate(this.getDate() - this.getDay() + day));
    },

    /**
     * Set the day of the year in current timezone.
     * @param {number} day The day of the year. (1, 366)
     * @returns {DateTime} The DateTime object.
     */
    setDayOfYear: function setDayOfYear(day) {
      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCMonth(0, day));
    },

    /**
     * Set the hours in current timezone (and optionally, minutes, seconds and milliseconds).
     * @param {number} hours The hours. (0, 23)
     * @param {number} [minutes] The minutes. (0, 59)
     * @param {number} [seconds] The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setHours: function setHours() {
      var _ref;

      return this._setOffsetTime((_ref = new Date(this._getOffsetTime())).setUTCHours.apply(_ref, arguments));
    },

    /**
     * Set the ISO day of the week in current timezone.
     * @param {number} day The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setISODay: function setISODay(day) {
      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCDate(this.getDate() - this.getISODay() + day));
    },

    /**
     * Set the ISO day of the week in current timezone (and optionally, day of the week).
     * @param {number} week The ISO week.
     * @param {number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setISOWeek: function setISOWeek(week) {
      var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (day === null) {
        day = this.getISODay();
      }

      var tempDate = new Date(this._getOffsetTime());
      tempDate.setUTCMonth(0, 4 + (week - 1) * 7);
      return this._setOffsetTime(tempDate.setUTCDate(tempDate.getUTCDate() - DateTime._isoDay(tempDate.getUTCDay()) + day));
    },

    /**
     * Set the ISO day of the week in current timezone (and optionally, week and day of the week).
     * @param {number} year The ISO year.
     * @param {number} [week] The ISO week.
     * @param {number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setISOYear: function setISOYear(year) {
      var week = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (week === null) {
        week = this.getISODay();
      }

      if (day === null) {
        day = this.getISODay();
      }

      var tempDate = new Date(this._getOffsetTime());
      tempDate.setUTCFullYear(year, 0, 4 + (week - 1) * 7);
      return this._setOffsetTime(tempDate.setUTCDate(tempDate.getUTCDate() - DateTime._isoDay(tempDate.getUTCDay()) + day));
    },

    /**
     * Set the milliseconds in current timezone.
     * @param {number} milliseconds The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setMilliseconds: function setMilliseconds(ms) {
      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCMilliseconds(ms));
    },

    /**
     * Set the minutes in current timezone (and optionally, seconds and milliseconds).
     * @param {number} minutes The minutes. (0, 59)
     * @param {number} [seconds] The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setMinutes: function setMinutes() {
      var _ref2;

      return this._setOffsetTime((_ref2 = new Date(this._getOffsetTime())).setUTCMinutes.apply(_ref2, arguments));
    },

    /**
     * Set the month in current timezone (and optionally, date).
     * @param {number} month The month. (0, 11)
     * @param {number} [date] The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setMonth: function setMonth(month) {
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (DateTime.clampDates && date === null) {
        date = Math.min(this.getDate(), DateTime.daysInMonth(this.getYear(), month));
      }

      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCMonth(month, date));
    },

    /**
     * Set the quarter of the year in current timezone.
     * @param {number} quarter The quarter of the year. (1, 4)
     * @returns {DateTime} The DateTime object.
     */
    setQuarter: function setQuarter(quarter) {
      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCMonth(quarter * 3 - 3));
    },

    /**
     * Set the seconds in current timezone (and optionally, milliseconds).
     * @param {number} seconds The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setSeconds: function setSeconds() {
      var _ref3;

      return this._setOffsetTime((_ref3 = new Date(this._getOffsetTime())).setUTCSeconds.apply(_ref3, arguments));
    },

    /**
     * Set the number of milliseconds since the UNIX epoch.
     * @param {number} time The number of milliseconds since the UNIX epoch.
     * @returns {DateTime} The DateTime object.
     */
    setTime: function setTime(time) {
      this._utcDate.setTime(time);

      this._checkOffset();

      var timestamp = time / 1000;

      if (timestamp < this._transition.start || timestamp > this._transition.end) {
        this._getTransition();
      }

      return this;
    },

    /**
     * Set the number of seconds since the UNIX epoch.
     * @param {number} timestamp The number of seconds since the UNIX epoch.
     * @returns {DateTime} The DateTime object.
     */
    setTimestamp: function setTimestamp(timestamp) {
      return this.setTime(timestamp * 1000);
    },

    /**
     * Set the current timezone.
     * @param {string} timezone The name of the timezone.
     * @returns {DateTime} The DateTime object.
     */
    setTimezone: function setTimezone(timezone) {
      if (!DateTime._timezones[timezone]) {
        throw new Error('Invalid timezone supplied');
      }

      this._timezone = timezone;

      this._makeFormatter();

      this._checkOffset();

      this._getTransition();

      return this;
    },

    /**
     * Set the year in current timezone (and optionally, month and date).
     * @param {number} year The year.
     * @param {number} [month] The month. (0, 11)
     * @param {number} [date] The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setYear: function setYear(year) {
      var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (month === null) {
        month = this.getMonth();
      }

      if (DateTime.clampDates && date === null) {
        date = Math.min(this.getDate(), DateTime.daysInMonth(year, month));
      }

      return this._setOffsetTime(new Date(this._getOffsetTime()).setUTCFullYear(year, month, date));
    }
  });
  Object.assign(DateTime.prototype, {
    /**
     * Format the current date with a PHP DateTime format string.
     * @param {string} formatString The string to use for formatting.
     * @returns {string} The formatted date string.
     */
    format: function format(formatString) {
      var output = '',
          escaped = false;

      var _arr2 = _toConsumableArray(formatString);

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var char = _arr2[_i2];

        if (!escaped && char === '\\') {
          escaped = true;
          continue;
        }

        if (escaped || !DateTime.formatData[char] || !DateTime.formatData[char].output) {
          output += char;
          escaped = false;
          continue;
        }

        output += DateTime.formatData[char].output(this);
      }

      return output;
    },

    /**
     * Format the current date using "D M d Y".
     * @returns {string} The formatted date string.
     */
    toDateString: function toDateString() {
      return this.format(DateTime.formats.date);
    },

    /**
     * Format the current date using Date's native "toLocaleDateString" method.
     * @param {string|string[]} [locales] The locale(s) to use for formatting.
     * @param {object} [options] The options to use for formatting.
     * @param {string} [options.localeMatcher] The locale matching algorithm to use.
     * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
     * @param {Boolean} [options.hour12] Whether to use 12-hour time.
     * @param {string} [options.hourCycle] The hour cycle to use.
     * @param {string} [options.formatMatcher] The format matching algorithm to use.
     * @param {string} [options.weekday] The method to represent the weekday.
     * @param {string} [options.era] The method to represent the era.
     * @param {string} [options.year] The method to represent the year.
     * @param {string} [options.month] The method to represent the month.
     * @param {string} [options.day] The method to represent the day.
     * @param {string} [options.hour] The method to represent the hour.
     * @param {string} [options.minute] The method to represent the minute.
     * @param {string} [options.second] The method to represent the second.
     * @param {string} [options.timeZoneName] The method to represent the time zone name.
     * @returns {string} The formatted date string.
     */
    toLocaleDateString: function toLocaleDateString(locales, options) {
      return this._utcDate.toLocaleDateString(locales || DateTime.defaultLocale, _objectSpread({
        timeZone: this._timezone
      }, options));
    },

    /**
     * Format the current date using Date's native "toLocaleString" method.
     * @param {string|string[]} [locales] The locale(s) to use for formatting.
     * @param {object} [options] The options to use for formatting.
     * @param {string} [options.localeMatcher] The locale matching algorithm to use.
     * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
     * @param {Boolean} [options.hour12] Whether to use 12-hour time.
     * @param {string} [options.hourCycle] The hour cycle to use.
     * @param {string} [options.formatMatcher] The format matching algorithm to use.
     * @param {string} [options.weekday] The method to represent the weekday.
     * @param {string} [options.era] The method to represent the era.
     * @param {string} [options.year] The method to represent the year.
     * @param {string} [options.month] The method to represent the month.
     * @param {string} [options.day] The method to represent the day.
     * @param {string} [options.hour] The method to represent the hour.
     * @param {string} [options.minute] The method to represent the minute.
     * @param {string} [options.second] The method to represent the second.
     * @param {string} [options.timeZoneName] The method to represent the time zone name.
     * @returns {string} The formatted date string.
     */
    toLocaleString: function toLocaleString(locales, options) {
      return this._utcDate.toLocaleString(locales || DateTime.defaultLocale, _objectSpread({
        timeZone: this._timezone
      }, options));
    },

    /**
     * Format the current date using Date's native "toLocaleTimeString" method.
     * @param {string|string[]} [locales] The locale(s) to use for formatting.
     * @param {object} [options] The options to use for formatting.
     * @param {string} [options.localeMatcher] The locale matching algorithm to use.
     * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
     * @param {Boolean} [options.hour12] Whether to use 12-hour time.
     * @param {string} [options.hourCycle] The hour cycle to use.
     * @param {string} [options.formatMatcher] The format matching algorithm to use.
     * @param {string} [options.weekday] The method to represent the weekday.
     * @param {string} [options.era] The method to represent the era.
     * @param {string} [options.year] The method to represent the year.
     * @param {string} [options.month] The method to represent the month.
     * @param {string} [options.day] The method to represent the day.
     * @param {string} [options.hour] The method to represent the hour.
     * @param {string} [options.minute] The method to represent the minute.
     * @param {string} [options.second] The method to represent the second.
     * @param {string} [options.timeZoneName] The method to represent the time zone name.
     * @returns {string} The formatted date string.
     */
    toLocaleTimeString: function toLocaleTimeString(locales, options) {
      return this._utcDate.toLocaleTimeString(locales || DateTime.defaultLocale, _objectSpread({
        timeZone: this._timezone
      }, options));
    },

    /**
     * Format the current date using "Y-m-d\TH:i:s.vP".
     * @returns {string} The formatted date string.
     */
    toISOString: function toISOString() {
      return this.format(DateTime.formats.rfc3339_extended);
    },

    /**
     * Format the current date using "D M d Y H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toString: function toString() {
      return this.format(DateTime.formats.string);
    },

    /**
     * Format the current date using "H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toTimeString: function toTimeString() {
      return this.format(DateTime.formats.time);
    },

    /**
     * Format the current date in UTC timezone using "D M d Y H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toUTCString: function toUTCString() {
      return new DateTime(this.getTime(), 'UTC').toString();
    }
  });
  Object.assign(DateTime.prototype, {
    /**
     * Update the timezone offset for current timestamp.
     */
    _checkOffset: function _checkOffset() {
      this._offset = this._timezone === 'UTC' ? 0 : (new Date(DateTime._utcFormatter.format(this)) - new Date(this._formatter.format(this))) / 60000;
    },

    /**
     * Get the number of milliseconds since the UNIX epoch (offset to timezone).
     * @returns {number} The number of milliseconds since the UNIX epoch (offset to timezone).
     */
    _getOffsetTime: function _getOffsetTime() {
      return this.getTime() - this._offset * 60000;
    },

    /**
     * Update the timezone transition for current timestamp.
     */
    _getTransition: function _getTransition() {
      var timestamp = this.getTimestamp();
      this._transition = DateTime._timezones[this._timezone].find(function (transition) {
        return transition.start <= timestamp && transition.end >= timestamp;
      });
    },

    /**
     * Update the formatter for current timezone.
     */
    _makeFormatter: function _makeFormatter() {
      this._formatter = new Intl.DateTimeFormat(DateTime._formatterLocale, _objectSpread({}, DateTime._formatterOptions, {
        timeZone: this._timezone
      }));
    },

    /**
     * Modify the DateTime by an interval.
     * @param {string|DateInterval} interval The DateInterval to modify using, or a date interval string.
     * @param {Boolean} [invert=false] Whether to invert (subtract) the interval.
     * @return {DateTime} The DateTime object.
     */
    _modify: function _modify(interval) {
      var invert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (interval === "".concat(interval)) {
        interval = DateInterval.fromString(interval);
      }

      var modify = 1;

      if (interval.invert) {
        modify *= -1;
      }

      if (invert) {
        modify *= -1;
      }

      var tempDate = new Date(this._getOffsetTime());

      if (interval.y) {
        tempDate.setUTCFullYear(tempDate.getUTCFullYear() + interval.y * modify);
      }

      if (interval.m) {
        tempDate.setUTCMonth(tempDate.getUTCMonth() + interval.m * modify);
      }

      if (interval.d) {
        tempDate.setUTCDate(tempDate.getUTCDate() + interval.d * modify);
      }

      if (interval.h) {
        tempDate.setUTCHours(tempDate.getUTCHours() + interval.h * modify);
      }

      if (interval.i) {
        tempDate.setUTCMinutes(tempDate.getUTCMinutes() + interval.i * modify);
      }

      if (interval.s) {
        tempDate.setUTCSeconds(tempDate.getUTCSeconds() + interval.s * modify);
      }

      if (interval.f) {
        tempDate.setUTCTime(tempDate.getUTCTime() + interval.f * modify);
      }

      return this._setOffsetTime(tempDate.getTime());
    },

    /**
     * Set the number of milliseconds since the UNIX epoch (offset to timezone).
     * @param {number} time The number of milliseconds since the UNIX epoch (offset to timezone).
     * @returns {DateTime} The DateTime object.
     */
    _setOffsetTime: function _setOffsetTime(time) {
      return this.setTime(time + this._offset * 60000);
    }
  });
  Object.assign(DateTime.prototype, {
    /**
     * Add a DateInterval to the DateTime.
     * @param {string|DateInterval} [interval] The DateInterval to add to the current date, or a date interval string.
     * @returns {DateTime} The DateTime object.
     */
    add: function add(interval) {
      return this._modify(interval);
    },

    /**
     * Get the ordinal suffix for the date of the month.
     * @returns {string} The ordinal suffix for the date of the month.
     */
    dateSuffix: function dateSuffix() {
      return DateTime.lang.ordinal(this.getDate());
    },

    /**
     * Get the number of days in the current month.
     * @returns {number} The number of days in the current month.
     */
    daysInMonth: function daysInMonth() {
      return DateTime.daysInMonth(this.getYear(), this.getMonth());
    },

    /**
     * Get the number of days in the current year.
     * @returns {number} The number of days in the current year.
     */
    daysInYear: function daysInYear() {
      return DateTime.daysInYear(this.getYear());
    },

    /**
     * Get the difference between two Dates.
     * @param {number|number[]|string|Date|DateTime} [other] The date to compare to.
     * @param {Boolean} [absolute=false] Whether the interval will be forced to be positive.
     * @returns {DateInterval} A new DateInterval object.
     */
    diff: function diff(other) {
      var absolute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tempDate = new DateTime(other, this._timezone),
          interval = new DateInterval();

      if (this.getTime() === tempDate.getTime()) {
        return inverval;
      }

      var lessThan = this < tempDate,
          thisMonth = this.getMonth(),
          thisDate = this.getDate(),
          thisHour = this.getHours(),
          thisMinute = this.getMinutes(),
          thisSecond = this.getSeconds(),
          thisMillisecond = this.getMilliseconds() * 1000,
          otherMonth = tempDate.getMonth(),
          otherDate = tempDate.getDate(),
          otherHour = tempDate.getHours(),
          otherMinute = tempDate.getMinutes(),
          otherSecond = tempDate.getSeconds(),
          otherMillisecond = tempDate.getMilliseconds() * 1000;
      interval.y = Math.abs(this.getYear() - tempDate.getYear());
      interval.m = Math.abs(thisMonth - otherMonth);
      interval.d = Math.abs(thisDate - otherDate);
      interval.h = Math.abs(thisHour - otherHour);
      interval.i = Math.abs(thisMinute - otherMinute);
      interval.s = Math.abs(thisSecond - otherSecond);
      interval.f = Math.abs(thisMillisecond - otherMillisecond);
      interval.days = Math.abs((this - tempDate) / 86400000) | 0;
      interval.invert = !absolute && lessThan;

      if (interval.y && interval.m && (!lessThan && thisMonth < otherMonth || lessThan && thisMonth > otherMonth)) {
        interval.y--;
        interval.m = 12 - interval.m;
      }

      if (interval.m && interval.d && (!lessThan && thisDate < otherDate || lessThan && thisDate > otherDate)) {
        interval.m--;
        interval.d = (lessThan ? this.daysInMonth() : tempDate.daysInMonth()) - interval.d;
      }

      if (interval.d && interval.h && (!lessThan && thisHour < otherHour || lessThan && thisHour > otherHour)) {
        interval.d--;
        interval.h = 24 - interval.h;
      }

      if (interval.h && interval.i && (!lessThan && thisMinute < otherMinute || lessThan && thisMinute > otherMinute)) {
        interval.h--;
        interval.i = 60 - interval.i;
      }

      if (interval.i && interval.s && (!lessThan && thisSecond < otherSecond || lessThan && thisSecond > otherSecond)) {
        interval.i--;
        interval.s = 60 - interval.s;
      }

      if (interval.s && interval.f && (!lessThan && thisMillisecond < otherMillisecond || lessThan && thisMillisecond > otherMillisecond)) {
        interval.s--;
        interval.f = 1000000 - interval.f;
      }

      return interval;
    },

    /**
     * Return true if the DateTime is in daylight savings.
     * @returns {Boolean} TRUE if the current time is in daylight savings, otherwise FALSE.
     */
    isDST: function isDST() {
      if (!this._transition.dst) {
        return false;
      }

      var year = this.getYear(),
          dateA = new DateTime([year, 0, 1], this._timezone),
          dateB = new DateTime([year, 5, 1], this._timezone);

      if (dateA.getTimestamp() < this._transition.start) {
        dateA.setYear(year + 1);
      }

      if (dateB.getTimestamp() > this._transition.end) {
        dateB.setYear(year - 1);
      }

      if (dateA.getTimestamp() > this._transition.end || dateB.getTimestamp() < this._transition.start) {
        dateA.setTimestamp(this._transition.start);
        dateB.setTimestamp(this._transition.end);
      }

      return this._offset < Math.max(dateA._offset, dateB._offset);
    },

    /**
     * Return true if the year is a leap year.
     * @returns {Boolean} TRUE if the current year is a leap year, otherwise FALSE.
     */
    isLeapYear: function isLeapYear() {
      return DateTime.isLeapYear(this.getYear());
    },

    /**
     * Subtract an DateInterval to the DateTime.
     * @param {string|DateInterval} [interval] The DateInterval to subtract from the current date.
     * @returns {DateTime} The DateTime object.
     */
    sub: function sub(interval) {
      return this._modify(interval, true);
    },

    /**
     * Get the number of weeks in the current ISO year.
     * @returns {number} The number of weeks in the current ISO year.
     */
    weeksInISOYear: function weeksInISOYear() {
      return DateTime.weeksInISOYear(this.getISOYear());
    }
  });
  Object.assign(DateTime, {
    /**
     * Create a new DateTime from a date string and format string.
     * @param {string} dateString The date string to parse.
     * @param {string} formatString The PHP date format string.
     * @param {string} [timezone] The timezone to use for the new DateTime.
     * @returns {DateTime} A new DateTime object.
     */
    fromFormat: function fromFormat(dateString, formatString, timezone) {
      var data = {};

      var _arr3 = _toConsumableArray(formatString);

      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var char = _arr3[_i3];

        if (this._seperators.includes(char)) {
          dateString = dateString.substring(1);
          return;
        }

        if (!this.formatData[char] || !this.formatData[char].regex) {
          throw new Error("Invalid char in DateTime format: ".concat(char));
        }

        var regex = this.formatData[char].regex,
            regexp = typeof regex === 'function' ? regex(char) : regex,
            dateMatch = dateString.match(new RegExp('^' + regexp));

        if (!dateMatch) {
          throw new Error("Unmatched char in DateTime string: ".concat(char));
        }

        dateString = dateString.substring(dateMatch[1].length);

        if (['!', '|'].includes(char)) {
          var epoch = {
            year: 1970,
            month: 0,
            date: 1,
            hours: 0,
            pm: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
          };
          Object.assign(data, char === '!' ? epoch : _objectSpread({}, epoch, data));
        } else {
          if (!this.formatData[char].input) {
            continue;
          }

          var value = this.formatData[char].value;
          data[value] = this.formatData[char].input(dateMatch[1]);
        }
      }

      return this.fromObject(data, timezone);
    },

    /**
     * Create a new DateTime from an object containing date properties.
     * @param {object} dateObject An object with date properties.
     * @param {number} [dateObject.year] The year.
     * @param {number} [dateObject.month] The month.
     * @param {number} [dateObject.date] The date.
     * @param {number} [dateObject.dayOfYear] The day of the year.
     * @param {number} [dateObject.day] The day of the week.
     * @param {number} [dateObject.hours] The hours.
     * @param {number} [dateObject.minutes] The minutes.
     * @param {number} [dateObject.seconds] The seconds.
     * @param {number} [dateObject.milliseconds] The milliseconds.
     * @param {Boolean} [dateObject.pm] Whether the hours are in PM.
     * @param {number} [dateObject.timestamp] The number of seconds since the UNIX epoch.
     * @param {string} [dateObject.timezone] The timezone.
     * @param {string} [dateObject.timezoneAbbr] The timezone abbreviation.
     * @param {number} [dateObject.offset] The timezone offset.
     * @param {string} [timezone] The timezone to use for the new DateTime.
     * @returns {DateTime} A new DateTime object.
     */
    fromObject: function fromObject(dateObject, timezone) {
      var currentDate, currentDay, currentTimezone;

      if (dateObject.timestamp) {
        currentDate = dateObject.timestamp * 1000;
      } else {
        if (dateObject.hasOwnProperty('dayOfYear') && !(dateObject.hasOwnProperty('month') || dateObject.hasOwnProperty('date'))) {
          dateObject.month = 0;
          dateObject.date = dateObject.dayOfYear;
        }

        if (dateObject.hasOwnProperty('hours') && dateObject.hasOwnProperty('pm')) {
          dateObject.hours = dateObject.hours % 12 + (dateObject.pm ? 12 : 0);
        }

        if (dateObject.hasOwnProperty('day') && !dateObject.hasOwnProperty('date')) {
          currentDay = dateObject.day;
        }

        var now = new Date(),
            newDate = _objectSpread({
          year: now.getFullYear(),
          month: now.getMonth(),
          date: now.getDate(),
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
          milliseconds: now.getMilliseconds()
        }, dateObject);

        currentDate = [newDate.year, newDate.month, newDate.date, newDate.hours, newDate.minutes, newDate.seconds, newDate.milliseconds];
      }

      if (dateObject.hasOwnProperty('timezone')) {
        currentTimezone = dateObject.timezone;
      } else if (dateObject.hasOwnProperty('offset') || dateObject.hasOwnProperty('timezoneAbbr')) {
        currentTimezone = this.timezoneFromAbbrOffset(currentDate, dateObject.hasOwnProperty('timezoneAbbr') ? dateObject.timezoneAbbr : null, dateObject.hasOwnProperty('offset') ? dateObject.offset : null);
      }

      var date = new this(currentDate, currentTimezone || timezone);

      if (currentDay) {
        date = date.setDay(currentDay);
      }

      if (timezone && currentTimezone) {
        date = date.setTimezone(timezone);
      }

      return date;
    }
  });
  Object.assign(DateTime, {
    /**
     * Format a number to string using localized digits (and optionally zero-padded).
     * @param {number} value The number to format.
     * @param {number} [padding] The number of digits to zero-pad to.
     * @returns {string} The formatted number string.
     */
    _formatNumber: function _formatNumber(value, padding) {
      var _this = this;

      value = value.toString();

      if (padding) {
        value = value.padStart(padding, 0);
      }

      return this.lang.numbers ? value.replace(/./g, function (match) {
        return _this.lang.numbers[match];
      }) : value;
    },

    /**
     * Create a Date object set to Thursday of the ISO week.
     * @param {number} year The year.
     * @param {number} month The month.
     * @param {number} date The date.
     * @returns {Date} A new Date object.
     */
    _isoDate: function _isoDate() {
      var date = new Date(Date.UTC.apply(Date, arguments)),
          day = this._isoDay(date.getUTCDay());

      date.setUTCDate(date.getUTCDate() - day + 4);
      return date;
    },

    /**
     * Convert a day of the week to a ISO format.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @returns {number} The day of the week in ISO format. (1 - Monday, 7 - Sunday)
     */
    _isoDay: function _isoDay(day) {
      return (day + 6) % 7 + 1;
    },

    /**
     * Parse a number from a string using localized digits.
     * @param {string} value The formatted number string.
     * @returns {number} The parsed number.
     */
    _parseNumber: function _parseNumber(value) {
      var _this2 = this;

      if (this.lang.numbers) {
        value = value.replace(/./g, function (match) {
          return _this2.lang.numbers.findIndex(match);
        });
      }

      return parseInt(value);
    }
  });
  Object.assign(DateTime, {
    /**
     * Get the day of the year for a year, month and date.
     * @param {number} year The year.
     * @param {number} month The month. (0, 11)
     * @param {number} date The date.
     * @returns {number} The day of the year. (1, 366)
     */
    dayOfYear: function dayOfYear(year, month, date) {
      var _this3 = this;

      return new Array(month).fill().reduce(function (d, _, i) {
        return d + _this3.daysInMonth(year, i);
      }, date);
    },

    /**
     * Get the number of days in a month, from a year and month.
     * @param {number} year The year.
     * @param {number} month The month. (0, 11)
     * @returns {number} The number of days in the month.
     */
    daysInMonth: function daysInMonth(year, month) {
      var date = new Date(Date.UTC(year, month));
      month = date.getUTCMonth();
      return this._monthDays[month] + (month == 1 && this.isLeapYear(date.getUTCFullYear()) ? 1 : 0);
    },

    /**
     * Get the number of days in a year.
     * @param {number} year The year.
     * @returns {number} The number of days in the year.
     */
    daysInYear: function daysInYear(year) {
      return !this.isLeapYear(year) ? 365 : 366;
    },

    /**
     * Return true if a year is a leap year.
     * @param {number} year The year.
     * @returns {Boolean} TRUE if the year is a leap year, otherwise FALSE.
     */
    isLeapYear: function isLeapYear(year) {
      return new Date(year, 1, 29).getDate() === 29;
    },

    /**
     * Return a timezone for a date using an abbreviated name or offset.
     * @param {number|number[]|string|Date|DateTime} date The date to use when testing.
     * @param {string} [abbr] The timezone abbreviation.
     * @param {number} [offset] The timezone offset.
     * @returns {string} The timezone name.
     */
    timezoneFromAbbrOffset: function timezoneFromAbbrOffset(date) {
      var abbr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (abbr === 'UTC' || offset === 0) {
        return 'UTC';
      }

      return Object.keys(this._timezones).find(function (timezone) {
        try {
          var tempDate = new DateTime(date, timezone);
          return (abbr === null || abbr === tempDate.getTimezoneAbbr()) && (offset === null || offset === tempDate.getTimezoneOffset());
        } catch (error) {
          return;
        }
      });
    },

    /**
     * Get the number of ISO weeks in a year.
     * @param {number} year  The year.
     * @returns {number} The number of ISO weeks in the year.
     */
    weeksInISOYear: function weeksInISOYear(year) {
      return new DateTime([year, 11, 28]).getISOWeek();
    }
  });
  var zones = {
    "Africa/Abidjan": 0,
    "Africa/Accra": 1,
    "Africa/Addis_Ababa": 2,
    "Africa/Algiers": 3,
    "Africa/Asmara": 2,
    "Africa/Bamako": 0,
    "Africa/Bangui": 4,
    "Africa/Banjul": 0,
    "Africa/Bissau": 5,
    "Africa/Blantyre": 6,
    "Africa/Brazzaville": 4,
    "Africa/Bujumbura": 6,
    "Africa/Cairo": 7,
    "Africa/Casablanca": 8,
    "Africa/Ceuta": 9,
    "Africa/Conakry": 0,
    "Africa/Dakar": 0,
    "Africa/Dar_es_Salaam": 2,
    "Africa/Djibouti": 2,
    "Africa/Douala": 4,
    "Africa/El_Aaiun": 10,
    "Africa/Freetown": 0,
    "Africa/Gaborone": 6,
    "Africa/Harare": 6,
    "Africa/Johannesburg": 11,
    "Africa/Juba": 12,
    "Africa/Kampala": 2,
    "Africa/Khartoum": 13,
    "Africa/Kigali": 6,
    "Africa/Kinshasa": 4,
    "Africa/Lagos": 4,
    "Africa/Libreville": 4,
    "Africa/Lome": 0,
    "Africa/Luanda": 4,
    "Africa/Lubumbashi": 6,
    "Africa/Lusaka": 6,
    "Africa/Malabo": 4,
    "Africa/Maputo": 6,
    "Africa/Maseru": 11,
    "Africa/Mbabane": 11,
    "Africa/Mogadishu": 2,
    "Africa/Monrovia": 14,
    "Africa/Nairobi": 2,
    "Africa/Ndjamena": 15,
    "Africa/Niamey": 4,
    "Africa/Nouakchott": 0,
    "Africa/Ouagadougou": 0,
    "Africa/Porto-Novo": 4,
    "Africa/Sao_Tome": 16,
    "Africa/Tripoli": 17,
    "Africa/Tunis": 18,
    "Africa/Windhoek": 19,
    "America/Adak": 20,
    "America/Anchorage": 21,
    "America/Anguilla": 22,
    "America/Antigua": 22,
    "America/Araguaina": 23,
    "America/Argentina/Buenos_Aires": 24,
    "America/Argentina/Catamarca": 25,
    "America/Argentina/Cordoba": 26,
    "America/Argentina/Jujuy": 27,
    "America/Argentina/La_Rioja": 28,
    "America/Argentina/Mendoza": 29,
    "America/Argentina/Rio_Gallegos": 30,
    "America/Argentina/Salta": 26,
    "America/Argentina/San_Juan": 31,
    "America/Argentina/San_Luis": 32,
    "America/Argentina/Tucuman": 33,
    "America/Argentina/Ushuaia": 34,
    "America/Aruba": 35,
    "America/Asuncion": 36,
    "America/Atikokan": 37,
    "America/Bahia": 38,
    "America/Bahia_Banderas": 39,
    "America/Barbados": 40,
    "America/Belem": 41,
    "America/Belize": 42,
    "America/Blanc-Sablon": 43,
    "America/Boa_Vista": 44,
    "America/Bogota": 45,
    "America/Boise": 46,
    "America/Cambridge_Bay": 47,
    "America/Campo_Grande": 48,
    "America/Cancun": 49,
    "America/Caracas": 50,
    "America/Cayenne": 51,
    "America/Cayman": 52,
    "America/Chicago": 53,
    "America/Chihuahua": 54,
    "America/Costa_Rica": 55,
    "America/Creston": 56,
    "America/Cuiaba": 57,
    "America/Curacao": 35,
    "America/Danmarkshavn": 58,
    "America/Dawson": 59,
    "America/Dawson_Creek": 60,
    "America/Denver": 61,
    "America/Detroit": 62,
    "America/Dominica": 22,
    "America/Edmonton": 63,
    "America/Eirunepe": 64,
    "America/El_Salvador": 65,
    "America/Fort_Nelson": 66,
    "America/Fortaleza": 67,
    "America/Glace_Bay": 68,
    "America/Godthab": 69,
    "America/Goose_Bay": 70,
    "America/Grand_Turk": 71,
    "America/Grenada": 22,
    "America/Guadeloupe": 22,
    "America/Guatemala": 72,
    "America/Guayaquil": 73,
    "America/Guyana": 74,
    "America/Halifax": 75,
    "America/Havana": 76,
    "America/Hermosillo": 77,
    "America/Indiana/Indianapolis": 78,
    "America/Indiana/Knox": 79,
    "America/Indiana/Marengo": 80,
    "America/Indiana/Petersburg": 81,
    "America/Indiana/Tell_City": 82,
    "America/Indiana/Vevay": 83,
    "America/Indiana/Vincennes": 84,
    "America/Indiana/Winamac": 85,
    "America/Inuvik": 86,
    "America/Iqaluit": 87,
    "America/Jamaica": 88,
    "America/Juneau": 89,
    "America/Kentucky/Louisville": 90,
    "America/Kentucky/Monticello": 91,
    "America/Kralendijk": 35,
    "America/La_Paz": 92,
    "America/Lima": 93,
    "America/Los_Angeles": 94,
    "America/Lower_Princes": 35,
    "America/Maceio": 95,
    "America/Managua": 96,
    "America/Manaus": 97,
    "America/Marigot": 22,
    "America/Martinique": 98,
    "America/Matamoros": 99,
    "America/Mazatlan": 77,
    "America/Menominee": 100,
    "America/Merida": 101,
    "America/Metlakatla": 102,
    "America/Mexico_City": 103,
    "America/Miquelon": 104,
    "America/Moncton": 105,
    "America/Monterrey": 99,
    "America/Montevideo": 106,
    "America/Montserrat": 22,
    "America/Nassau": 107,
    "America/New_York": 108,
    "America/Nipigon": 109,
    "America/Nome": 110,
    "America/Noronha": 111,
    "America/North_Dakota/Beulah": 112,
    "America/North_Dakota/Center": 113,
    "America/North_Dakota/New_Salem": 114,
    "America/Ojinaga": 54,
    "America/Panama": 52,
    "America/Pangnirtung": 115,
    "America/Paramaribo": 116,
    "America/Phoenix": 117,
    "America/Port-au-Prince": 118,
    "America/Port_of_Spain": 22,
    "America/Porto_Velho": 119,
    "America/Puerto_Rico": 120,
    "America/Punta_Arenas": 121,
    "America/Rainy_River": 122,
    "America/Rankin_Inlet": 123,
    "America/Recife": 124,
    "America/Regina": 125,
    "America/Resolute": 126,
    "America/Rio_Branco": 127,
    "America/Santarem": 128,
    "America/Santiago": 129,
    "America/Santo_Domingo": 130,
    "America/Sao_Paulo": 131,
    "America/Scoresbysund": 132,
    "America/Sitka": 133,
    "America/St_Barthelemy": 22,
    "America/St_Johns": 134,
    "America/St_Kitts": 22,
    "America/St_Lucia": 22,
    "America/St_Thomas": 22,
    "America/St_Vincent": 22,
    "America/Swift_Current": 135,
    "America/Tegucigalpa": 136,
    "America/Thule": 137,
    "America/Thunder_Bay": 138,
    "America/Tijuana": 139,
    "America/Toronto": 140,
    "America/Tortola": 22,
    "America/Vancouver": 141,
    "America/Whitehorse": 142,
    "America/Winnipeg": 143,
    "America/Yakutat": 144,
    "America/Yellowknife": 145,
    "Antarctica/Casey": 146,
    "Antarctica/Davis": 147,
    "Antarctica/DumontDUrville": 148,
    "Antarctica/Macquarie": 149,
    "Antarctica/Mawson": 150,
    "Antarctica/McMurdo": 151,
    "Antarctica/Palmer": 152,
    "Antarctica/Rothera": 153,
    "Antarctica/Syowa": 154,
    "Antarctica/Troll": 155,
    "Antarctica/Vostok": 156,
    "Arctic/Longyearbyen": 157,
    "Asia/Aden": 158,
    "Asia/Almaty": 159,
    "Asia/Amman": 160,
    "Asia/Anadyr": 161,
    "Asia/Aqtau": 162,
    "Asia/Aqtobe": 163,
    "Asia/Ashgabat": 164,
    "Asia/Atyrau": 165,
    "Asia/Baghdad": 166,
    "Asia/Bahrain": 167,
    "Asia/Baku": 168,
    "Asia/Bangkok": 169,
    "Asia/Barnaul": 170,
    "Asia/Beirut": 7,
    "Asia/Bishkek": 171,
    "Asia/Brunei": 172,
    "Asia/Chita": 173,
    "Asia/Choibalsan": 174,
    "Asia/Colombo": 175,
    "Asia/Damascus": 176,
    "Asia/Dhaka": 177,
    "Asia/Dili": 178,
    "Asia/Dubai": 179,
    "Asia/Dushanbe": 180,
    "Asia/Famagusta": 181,
    "Asia/Gaza": 182,
    "Asia/Hebron": 182,
    "Asia/Ho_Chi_Minh": 183,
    "Asia/Hong_Kong": 184,
    "Asia/Hovd": 185,
    "Asia/Irkutsk": 186,
    "Asia/Jakarta": 187,
    "Asia/Jayapura": 188,
    "Asia/Jerusalem": 189,
    "Asia/Kabul": 190,
    "Asia/Kamchatka": 191,
    "Asia/Karachi": 192,
    "Asia/Kathmandu": 193,
    "Asia/Khandyga": 194,
    "Asia/Kolkata": 195,
    "Asia/Krasnoyarsk": 196,
    "Asia/Kuala_Lumpur": 197,
    "Asia/Kuching": 198,
    "Asia/Kuwait": 158,
    "Asia/Macau": 199,
    "Asia/Magadan": 200,
    "Asia/Makassar": 201,
    "Asia/Manila": 202,
    "Asia/Muscat": 179,
    "Asia/Nicosia": 203,
    "Asia/Novokuznetsk": 204,
    "Asia/Novosibirsk": 205,
    "Asia/Omsk": 206,
    "Asia/Oral": 207,
    "Asia/Phnom_Penh": 169,
    "Asia/Pontianak": 208,
    "Asia/Pyongyang": 209,
    "Asia/Qatar": 167,
    "Asia/Qostanay": 210,
    "Asia/Qyzylorda": 211,
    "Asia/Riyadh": 158,
    "Asia/Sakhalin": 212,
    "Asia/Samarkand": 213,
    "Asia/Seoul": 214,
    "Asia/Shanghai": 215,
    "Asia/Singapore": 197,
    "Asia/Srednekolymsk": 216,
    "Asia/Taipei": 217,
    "Asia/Tashkent": 218,
    "Asia/Tbilisi": 219,
    "Asia/Tehran": 220,
    "Asia/Thimphu": 221,
    "Asia/Tokyo": 222,
    "Asia/Tomsk": 223,
    "Asia/Ulaanbaatar": 224,
    "Asia/Urumqi": 225,
    "Asia/Ust-Nera": 226,
    "Asia/Vientiane": 169,
    "Asia/Vladivostok": 227,
    "Asia/Yakutsk": 228,
    "Asia/Yangon": 229,
    "Asia/Yekaterinburg": 230,
    "Asia/Yerevan": 231,
    "Atlantic/Azores": 232,
    "Atlantic/Bermuda": 233,
    "Atlantic/Canary": 234,
    "Atlantic/Cape_Verde": 235,
    "Atlantic/Faroe": 236,
    "Atlantic/Madeira": 237,
    "Atlantic/Reykjavik": 238,
    "Atlantic/South_Georgia": 239,
    "Atlantic/St_Helena": 0,
    "Atlantic/Stanley": 240,
    "Australia/Adelaide": 241,
    "Australia/Brisbane": 242,
    "Australia/Broken_Hill": 241,
    "Australia/Currie": 242,
    "Australia/Darwin": 241,
    "Australia/Eucla": 243,
    "Australia/Hobart": 242,
    "Australia/Lindeman": 242,
    "Australia/Lord_Howe": 244,
    "Australia/Melbourne": 242,
    "Australia/Perth": 245,
    "Australia/Sydney": 242,
    "Europe/Amsterdam": 246,
    "Europe/Andorra": 247,
    "Europe/Astrakhan": 248,
    "Europe/Athens": 249,
    "Europe/Belgrade": 157,
    "Europe/Berlin": 250,
    "Europe/Bratislava": 251,
    "Europe/Brussels": 252,
    "Europe/Bucharest": 253,
    "Europe/Budapest": 157,
    "Europe/Busingen": 254,
    "Europe/Chisinau": 255,
    "Europe/Copenhagen": 256,
    "Europe/Dublin": 257,
    "Europe/Gibraltar": 258,
    "Europe/Guernsey": 259,
    "Europe/Helsinki": 260,
    "Europe/Isle_of_Man": 259,
    "Europe/Istanbul": 261,
    "Europe/Jersey": 259,
    "Europe/Kaliningrad": 262,
    "Europe/Kiev": 263,
    "Europe/Kirov": 264,
    "Europe/Lisbon": 265,
    "Europe/Ljubljana": 157,
    "Europe/London": 259,
    "Europe/Luxembourg": 266,
    "Europe/Madrid": 267,
    "Europe/Malta": 157,
    "Europe/Mariehamn": 260,
    "Europe/Minsk": 268,
    "Europe/Monaco": 269,
    "Europe/Moscow": 270,
    "Europe/Oslo": 157,
    "Europe/Paris": 271,
    "Europe/Podgorica": 157,
    "Europe/Prague": 251,
    "Europe/Riga": 272,
    "Europe/Rome": 273,
    "Europe/Samara": 274,
    "Europe/San_Marino": 273,
    "Europe/Sarajevo": 157,
    "Europe/Saratov": 275,
    "Europe/Simferopol": 276,
    "Europe/Skopje": 157,
    "Europe/Sofia": 277,
    "Europe/Stockholm": 278,
    "Europe/Tallinn": 279,
    "Europe/Tirane": 280,
    "Europe/Ulyanovsk": 281,
    "Europe/Uzhgorod": 282,
    "Europe/Vaduz": 254,
    "Europe/Vatican": 273,
    "Europe/Vienna": 157,
    "Europe/Vilnius": 283,
    "Europe/Volgograd": 284,
    "Europe/Warsaw": 285,
    "Europe/Zagreb": 157,
    "Europe/Zaporozhye": 286,
    "Europe/Zurich": 254,
    "Indian/Antananarivo": 2,
    "Indian/Chagos": 287,
    "Indian/Christmas": 288,
    "Indian/Cocos": 289,
    "Indian/Comoro": 2,
    "Indian/Kerguelen": 290,
    "Indian/Mahe": 291,
    "Indian/Maldives": 292,
    "Indian/Mauritius": 293,
    "Indian/Mayotte": 2,
    "Indian/Reunion": 294,
    "Pacific/Apia": 295,
    "Pacific/Auckland": 151,
    "Pacific/Bougainville": 296,
    "Pacific/Chatham": 297,
    "Pacific/Chuuk": 298,
    "Pacific/Easter": 299,
    "Pacific/Efate": 300,
    "Pacific/Enderbury": 301,
    "Pacific/Fakaofo": 302,
    "Pacific/Fiji": 303,
    "Pacific/Funafuti": 304,
    "Pacific/Galapagos": 305,
    "Pacific/Gambier": 306,
    "Pacific/Guadalcanal": 307,
    "Pacific/Guam": 308,
    "Pacific/Honolulu": 309,
    "Pacific/Kiritimati": 310,
    "Pacific/Kosrae": 311,
    "Pacific/Kwajalein": 312,
    "Pacific/Majuro": 313,
    "Pacific/Marquesas": 314,
    "Pacific/Midway": 315,
    "Pacific/Nauru": 316,
    "Pacific/Niue": 317,
    "Pacific/Norfolk": 318,
    "Pacific/Noumea": 319,
    "Pacific/Pago_Pago": 315,
    "Pacific/Palau": 320,
    "Pacific/Pitcairn": 321,
    "Pacific/Pohnpei": 322,
    "Pacific/Port_Moresby": 323,
    "Pacific/Rarotonga": 324,
    "Pacific/Saipan": 308,
    "Pacific/Tahiti": 325,
    "Pacific/Tarawa": 304,
    "Pacific/Tongatapu": 326,
    "Pacific/Wake": 304,
    "Pacific/Wallis": 304,
    "UTC": 327
  };
  var values = [";GMT|,0;-u9rgl4,1", ";GMT;+0020|,0;-r507yk,1,2", ";EAT;+0230;+0245|,0;-lnsetg,1;-kvjsc0,2;-fnosa0,3;-57x0z0,1", ";PMT;WET;WEST;CET;CEST|,0;-zik0zk,1;-uozn3l,2,3;-fkul40,4,5;-c4kqs0,2;-79mio0,4;-3i8is0,2,3;42lp80,4,5;54et80,2,3;5wuyo0,4", ";WAT|,0;-q9qbao,1", ";-01;GMT|,0;-u9rek0,1;2lxk40,2", ";CAT|,0;-yvtfd8,1", ";EET;EEST|,0;-zik0zk,1,2", ";+00;+01|,0;-tblt9g,1,2;7eveo0,2;8cm580,1,2;phadk0,2,1", ";WET;WEST;CET;CEST|,0;-zik0zk,1,2;7eveo0,3,4", ";-01;+00;+01|,0;-isdxk0,1;3a22s0,2,3;phadk0,3,2", ";SAST|,0;-zik0zk,1;-yvtdi0,1,1", ";CAT;CAST;EAT|,0;-kcrsis,1,2;fodfs0,3", ";CAT;CAST;EAT|,0;-kcrsow,1,2;fodfs0,3;oyph00,1", ";MMT;GMT|,0;-zik0zk,1;11v0q6,2", ";WAT;WAST|,0;-u9rk4c,1,2", ";GMT;WAT|,0;-u9rhc0,1;p1uqs0,2;pkmo40,1", ";CET;CEST;EET|,0;-q3gfrw,1,2;-5qotg0,3;69gig0,1,2;am3h80,3;dyil40,1,2;ehhx40,3;md8w00,1,2;mv76o0,3", ";PMT;CET;CEST|,0;-zik0zk,1;-uozn3l,2,3", ";+0130;SAST;CAT;WAT|,0;-zik0zk,1;-yvtdi0,2,2;ajtx40,3,4", ";NST;NWT;NPT;BST;BDT;AHST;HST;HDT|,0;-zik0zk,1,2;-cq2tg0,1,3;-1fq440,4,5;77ss00,6;79e140,7,8", ";AST;AWT;APT;AHST;AHDT;YST;AKST;AKDT|,0;-zik0zk,1,2;-cq2tg0,1,3;-1fq6w0,4,5;77sp80,6;79dyc0,7,8", ";AST|,0;-u6m79w,1", ";-03;-02|,0;-t85j2o,1,2", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;c3hxk0,3,3;fqtsc0,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;b1otk0,2,4;bkew80,3,4;c3hxk0,3,3;hym0c0,2;hzl9s0,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;b1otk0,2,4;bkew80,3,4;c3hxk0,3,3;fqtsc0,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;aiyqw0,2,3;b2eto0,2,4;bkew80,3,4;c3hxk0,3,3;fqtsc0,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;b1l480,2;b51cg0,3,4;c3hxk0,3,3;hym0c0,2;hzl9s0,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;aiyqw0,2,3;bkez00,2,4;c3hxk0,3,3;hy5cc0,2;i4mr40,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;c3hxk0,3,3;hym0c0,2;hzl9s0,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;b1l480,2;b51cg0,3,4;c3hxk0,3,3;hyk5o0,2;i1e340,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;ajh9k0,2,3;b6bn40,3,3;hyk5o0,2;i1e340,3,4;juz1k0,2,3;krc0g0,3", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;b1otk0,2,4;bkew80,3,4;c3hxk0,3,3;hym0c0,2;hz8b40,3,4", ";CMT;-04;-03;-02|,0;-zik0zk,1;-px7ys0,2,3;-4ink0,3,4;c3hxk0,3,3;hyib00,2;hzl9s0,3,4", ";-0430;AST|,0;-u7lckd,1;-2lx4u0,2", ";AMT;-04;-03|,0;-zik0zk,1;-jy93zk,2;1fnkg0,3;27sgc0,2,3", ";CST;CDT;CWT;CPT;EST|,0;-zik0zk,1,2;-ek21s0,1,3;-cq2tg0,5,4", ";-03;-02|,0;-t85kv8,1,2", ";MST;CST;PST;MDT;CDT|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2;-eg9600,1;-axv380,3;m80,1,4;ks28w0,1,5;lb57g0,2,5", ";BMT;AST;ADT|,0;-o0aiaj,1;-jtzeaj,2,3", ";-03;-02|,0;-t85j0s,1,2", ";CST;-0530;CDT|,0;-u52ic0,1,2;-e11220,1,3", ";AST;ADT;AWT;APT|,0;-zik0zk,1,2;-qpm4s0,1,3;-cq2tg0,1,4", ";-04;-03|,0;-t85grk,1,2", ";BMT;-05;-04|,0;-zik0zk,1;-srdoy8,2,3", ";PST;PDT;MST;MWT;MPT;MDT|,0;-zik0zk,1,2;-oc9iw0,3,4;-cq2tg0,3,5;-1e8kc0,3,6", "-00;MST;MWT;MPT;MDDT;MDT;CST;CDT;EST|,0;-q3gdc0,1,2;-cq2tg0,1,3;-2g1tw0,1,4;5dwbo0,1,5;f9nqc0,6,5;fsdq80,8,7;g3jck0,6,5;glwow0,1,5", ";-04;-03|,0;-t85hvw,1,2", ";CST;EST;EDT;CDT|,0;-p1u7c0,1;690go0,2,3;ex1so0,1,4;nj3280,2", ";CMT;-0430;-04|,0;-zik0zk,1;-u7lcxw,2;-2lx4u0,3;jsrss0,2;o6hks0,3", ";-04;-03|,0;-uj7yb4,1;-16brk0,2", ";CMT;EST|,0;-zik0zk,1;-w757vc,2", ";CST;CDT;EST;CWT;CPT|,0;-zik0zk,1,2;-hnqf40,3;-haev80,1,2;-eqy9w0,1,4;-cq2tg0,1,5;-ccw1s0,1,2", ";MST;CST;CDT;MDT|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2,3;eincs0,2,4;f1di80,1,4", ";SJMT;CST;CDT|,0;-zik0zk,1;-pjw8fn,2,3", ";MST;PST|,0;-zik0zk,1;-rshz80,2;-qx64g0,1", ";-04;-03|,0;-t85hm4,1,2", ";-03;-02;GMT|,0;-rvusjk,1,2;dkhf00,3", ";YST;YDT;YWT;YPT;YDDT;PST;PDT|,0;-zik0zk,1,2;-q6kps0,1,3;-cq2tg0,1,4;-2g1oc0,1,5;1ztvo0,6,7", ";PST;PDT;PWT;PPT;MST|,0;-zik0zk,1,2;-qplto0,1,3;-cq2tg0,1,4;-bu5tk0,1,2;17qug0,5,2", ";MST;MDT;MWT;MPT|,0;-zik0zk,1,2;-pdcv40,1,3;-cq2tg0,1,4;-2g1oc0,1,2", ";CST;EST;EWT;EPT;EDT|,0;-xx8dyd,1;-sih340,2,3;-cq2tg0,2,4;-bbfz80,2,5", ";MST;MDT;MWT;MPT|,0;-x1yazk,1,2;-o52f40,1,3;-cq2tg0,1,4;-bu5wc0,1,2", ";-05;-04|,0;-t85f28,1,2;k2yb80,2;mw14g0,1", ";CST;CDT|,0;-pkm4tc,1,2", ";PST;PDT;PWT;PPT;MST|,0;-zik0zk,1,2;-qplto0,1,3;-cq2tg0,1,4;-bu5tk0,1,2;nkw140,5", ";-03;-02|,0;-t85kvc,1,2", ";AST;ADT;AWT;APT|,0;-z94kwc,1,2;-qpm4s0,1,3;-cq2tg0,1,4;-8pgq00,1,2", ";-03;-02|,0;-rvumf4,1,2", ";NST;NDT;NWT;NPT;AST;ADT;ADDT|,0;-zik0zk,1,2;-eqjt20,1,3;-cq2tg0,1,4;-cc6be0,1,2;-1zdy20,5,6;9aodpo,5,7;9trc9o,5,6", ";KMT;EST;EDT;AST|,0;-zik0zk,1;-u85og2,2,3;nx4go0,4,3;phnnc0,2,3", ";CST;CDT|,0;-qqqskk,1,2", ";QMT;-05;-04|,0;-zik0zk,1;-kcr84o,2,3", ";-0345;-03;-04|,0;-smcak8,1;2wsif0,2;ayjxo0,3", ";AST;ADT;AWT;APT|,0;-z94k80,1,2;-eqwqc0,1,3;-cq2tg0,1,4;-ccw7c0,1,2", ";HMT;CST;CDT|,0;-zik0zk,1;-n7762o,2,3", ";MST;CST;PST;MDT|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2;-eg9600,1;-axv380,3;m80,1,4", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-eqy9w0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-7o0f40,5;-6ea780,1;-63h8g0,5,6", ";CST;CDT;CWT;CPT;EST|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-bu5z40,1,2;-407z40,5;-384xw0,1,2;bdxy40,5,2;j7vy40,1,2", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-9qwps0,1,2;-4iy1s0,5,6;1ztnc0,5,2;2ijss0,5,6", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-7nnm00,1,2;-2g1r40,5;-1nlr80,1,2;432zg0,5,2;j7vy40,1,2;jqyzg0,5,6", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-2yrts0,5,6;fago0,5,2;j7vy40,1,2", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-86qhs0,5,6", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-2yrts0,5,6;fago0,5,2;j7vy40,1,2;jqyzg0,5,6", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-4iy1s0,5,6;fago0,5,2;j7vy40,1,6;jqywo0,5,6", "-00;PST;PDDT;MST;MDT|,0;-8ve5c0,1,2;4v6bs0,3,4", "-00;EWT;EPT;EST;EDDT;EDT;CST;CDT|,0;-zik0zk,0,1;-cq2tg0,3,2;-2g1zg0,3,4;5dw640,3,5;f9nks0,6,5;fsdq80,3,7;gb3q40,3,5", ";KMT;EST;EDT|,0;-zik0zk,1;-u85og2,2,3", ";PST;PWT;PPT;PDT;YDT;YST;AKST;AKDT|,0;-zik0zk,1,2;-cq2tg0,1,3;-csc80,1,4;5dweg0,1,5;5wmh40,1,4;6y2mg0,6,4;79dyc0,7,8", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-eqy9w0,1,3;-cq2tg0,1,4;-ciwvc0,1,2;-4iy1s0,5,2;-vin80,5,6;23fcs0,5,2;2oo640,5,6", ";CST;CDT;CWT;CPT;EST;EDT|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-vikg0,1,2;fsdq80,5,2;gb3q40,5,6", ";CMT;BST;-04|,0;-zik0zk,1,2;-jpva5o,3", ";-05;-04|,0;-w25lpo,1,2", ";PST;PDT;PWT;PPT|,0;-zik0zk,1,2;-q6vr00,1,3;-cq2tg0,1,4;-bdliuc,1,2", ";-03;-02|,0;-t85ldw,1,2", ";MMT;CST;EST;CDT|,0;-zik0zk,1;-ijh6oo,2;1qkbc0,3;2ob1w0,2,4;bhceg0,3;bv2gk0,2;c05vc0,3;e3bck0,2,4", ";-04;-03|,0;-t85gvw,1,2", ";FFMT;AST;ADT|,0;-zik0zk,1;-umcvcs,2,3", ";CST;CDT|,0;-p1u7c0,1,2", ";CST;CDT;CWT;CPT;EST|,0;-zik0zk,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-cshs0,5,2;1ztq40,1,2", ";CST;EST;CDT|,0;-p1u7c0,1;690go0,2;6qpf80,1,3", ";PST;PWT;PPT;PDT;AKST;AKDT|,0;-zik0zk,1,2;-cq2tg0,1,3;-csc80,1,4;nx4rs0,5,6;phnyg0,1,6;q0e140,5,6", ";MST;CST;CDT;CWT|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2,3;-f07rg0,2,4;-deaks0,2,3", ";AST;-03;-02|,0;-ulmyxk,1;5e3cg0,2,3", ";EST;AST;ADT;AWT;APT|,0;-zik0zk,1;-z94i40,2,3;-er0cw0,2,4;-cq2tg0,2,5;-ccw7c0,2,3", ";MMT;-04;-03;-0330;-0230;-02;-0130|,0;-w4mll9,1;-px8099,2,3;-nvm2c0,4,3;-e482c0,3,5;-572yc0,3,6;-u1900,3,5;5vcc0,3,6;23s0c0,3,7;26nli0,3,5;2lf700,3,6", ";EST;EDT|,0;-u6m4c6,1,2", ";EST;EDT;EWT;EPT|,0;-zik0zk,1,2;-eqyco0,1,3;-cq2tg0,1,4;-ccw4k0,1,2", ";EST;EDT;EWT;EPT|,0;-zik0zk,1,2;-ek24k0,1,3;-cq2tg0,1,4;296rg0,1,2", ";NST;NWT;NPT;BST;BDT;YST;AKST;AKDT|,0;-zik0zk,1,2;-cq2tg0,1,3;-1fq440,4,5;77ss00,6;79dyc0,7,8", ";-02;-01|,0;-t85lzw,1,2", ";MST;MDT;MWT;MPT;CST;CDT|,0;-zik0zk,1,2;-q6vts0,1,3;-cq2tg0,1,4;-1e8kc0,1,2;kz9l00,5,2;lhzkw0,5,6", ";MST;MDT;MWT;MPT;CST;CDT|,0;-zik0zk,1,2;-q6vts0,1,3;-cq2tg0,1,4;-1e8kc0,1,2;bm8900,5,2;c4y8w0,5,6", ";MST;MDT;MWT;MPT;CST;CDT|,0;-zik0zk,1,2;-q6vts0,1,3;-cq2tg0,1,4;-1e8kc0,1,2;hcwzo0,5,2;hvmzk0,5,6", "-00;AST;AWT;APT;ADDT;ADT;EDT;EST;CST;CDT|,0;-pkmlc0,1,2;-cq2tg0,1,3;-2g2280,1,4;5dw3c0,1,5;d6e8o0,7,6;f9nks0,8,6;fsdq80,7,9;gb3q40,7,6", ";PMT;-0330;-03|,0;-usj4g8,1;-cnnf4c,2;7p4720,3", ";MST;MDT;MWT|,0;-zik0zk,1,2;-q6vts0,1,3;-d6f5yc,1,2", ";PPMT;EST;EDT|,0;-zik0zk,1;-rmk9ac,2,3", ";-04;-03|,0;-t85g60,1,2", ";AST;AWT;APT|,0;-zik0zk,1,2;-cq2tg0,1,3", ";SMT;-05;-04;-03|,0;-zik0zk,1;-vauawq,2;-rx8i40,1;-qs16wq,3;-qcwsw0,1,3;-lsgfk0,2,3;-jhfgs0,3;-eeay80,2;-eb5ws0,3;-bvifk0,2;-bsvzk0,3,4;ohn4c0,4", ";CST;CDT;CWT;CPT|,0;-zik0zk,1,2;-ek21s0,1,3;-cq2tg0,1,4;296u80,1,2", "-00;CST;CDDT;CDT;EST|,0;-6s8lc0,1,2;-26bwo0,1,3;g36jg0,4,3;glwm40,1,3", ";-03;-02|,0;-t85ljc,1,2", ";MST;MDT;MWT;MPT;CST|,0;-xkq9yc,1,2;-eq8fc0,1,3;-cq2tg0,1,4;-cdlwc0,1,2;-5210c0,5", "-00;CST;CDDT;CDT;EST|,0;-bnp9c0,1,2;-26bwo0,1,3;g36jg0,4,3;glwm40,1,3;j7vy40,4,3;jqyzg0,1,3", ";-05;-04|,0;-t85fg0,1,2;k2yb80,2;mw14g0,1", ";-04;-03|,0;-t85hvc,1,2;k2y8g0,2", ";SMT;-05;-04;-03|,0;-zik0zk,1;-vauawq,2;-rx8i40,1;-qs16wq,3;-qcwsw0,1,3;-lsgfk0,2,3;-jhfgs0,3;-eeay80,2;-eb5ws0,3,4;-bvifk0,2;-bsvzk0,3,4", ";SDMT;EST;EDT;-0430;AST|,0;-zik0zk,1;-j6hz1c,2,3;-1hdww0,2,4;2ijn80,5;g36go0,2;g4za00,5", ";-03;-02|,0;-t85jd8,1,2", ";-02;-01;+00|,0;-rvurxk,1,2;5lt4g0,1,3;64iys0,2,3", ";PST;PWT;PPT;PDT;YST;AKST;AKDT|,0;-zik0zk,1,2;-cq2tg0,1,3;-csc80,1,4;6y2mg0,5,4;79dyc0,6,7", ";NST;NDT;NWT;NPT;NDDT|,0;-zik0zk,1,2;-eqjt20,1,3;-cq2tg0,1,4;-cc6be0,1,2;9iykfo,1,5;a1on3o,1,2", ";MST;MDT;MWT;MPT;CST|,0;-xkq9d4,1,2;-qplwg0,1,3;-cq2tg0,1,4;-ccvz00,1,2;17qro0,5", ";CST;CDT|,0;-pfzh6k,1,2", ";AST;ADT|,0;-rvuj9g,1,2", ";CST;EST;EWT;EPT;EDT|,0;-zik0zk,1;-vbavc0,2,3;-cq2tg0,2,4;5xi40,2,5", ";MST;PST;PDT;PWT;PPT|,0;-p1u1s0,1;-o0a9w0,2;-m7mhw0,1;-kf64k0,2,3;-jyrdw0,2,4;-cq2tg0,2,5;-bcgxs0,2,3", ";EST;EDT;EWT;EPT|,0;-zik0zk,1,2;-ek24k0,1,3;-cq2tg0,1,4;-ccw4k0,1,2", ";PST;PDT;PWT;PPT|,0;-zik0zk,1,2;-qplto0,1,3;-cq2tg0,1,4;-ccvw80,1,2", ";YST;YDT;YWT;YPT;YDDT;PST;PDT|,0;-zik0zk,1,2;-q6kps0,1,3;-cq2tg0,1,4;-2g1oc0,1,5;-1cspo0,6,7", ";CST;CDT;CWT;CPT|,0;-zik0zk,1,2;-gu7j80,1,3;-cq2tg0,1,4;-cc64g0,1,2", ";YST;YWT;YPT;YDT;AKST;AKDT|,0;-zik0zk,1,2;-cq2tg0,1,3;-cs9g0,1,4;79dyc0,5,6", "-00;MST;MWT;MPT;MDDT;MDT|,0;-i9m2o0,1,2;-cq2tg0,1,3;-2g1tw0,1,4;5dwbo0,1,5", "-00;+08;+11|,0;-irxc0,1;kro7c0,2;kyrj00,1;ltqko0,2;lzr5w0,1;ofen40,2;p5dwk0,1", "-00;+07;+05|,0;-6rmdc0,1;-2p2zg0,0;-h6io0,1;kroa40,2;kz30w0,1;ltqng0,2;lzre80,1", "-00;+10|,0;-c05eo0,1;-9dkmg0,0;-6vdk00,1", "-00;AEST;AEDT;+11|,0;-zik0zk,1,2;-qhmeg0,0;-bd1xc0,1,2;l0b5s0,3", "-00;+06;+05|,0;-8aelc0,1;krocw0,2", ";NZMT;NZST;NZDT|,0;-zik0zk,1,2;-ciy9c0,2,3", "-00;-03;-04;-02|,0;-zik0zk,0,1;-2ivzo0,2,1;-4ink0,1,3;6fn4c0,2,1;ohn4c0,1", "-00;-03|,0;3lxs00,1", "-00;+03|,0;-6qsqo0,1", "-00;+02|,0;ibruo0,0,1", "-00;+06|,0;-6aaao0,1", ";CET;CEST|,0;-zik0zk,1,2", ";+03|,0;-bwgbbg,1", ";+05;+06;+07|,0;-nu1a90,1;-kmr9w0,2,3;atr680,2,2;bchbo0,1;bi8qc0,2,3", ";EET;EEST|,0;-kcrtbk,1,2", ";+12;+13;+14;+11|,0;-nu1sv8,1;-kmrtc0,2,3;64p7s0,2,2;6nh7w0,1,2;atqpk0,1,1;bcgv00,4;bi89o0,1,2;ks0uw0,1,1;lb3z00,4;lio700,1", ";+04;+05;+06|,0;-nu15b4,1;-kmr740,2;64pws0,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,1;bi8t40,2,3;cwnjo0,1,2;i6f3s0,2", ";+04;+05;+06|,0;-nu16l4,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,1;bi8t40,2,3", ";+04;+05;+06|,0;-nu16t8,1;-kmr740,2,3;atr900,2,2;bcheg0,1;bi8t40,2", ";+03;+05;+06;+04|,0;-nu15m8,1;-kmr4c0,2;64pws0,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,4;bi8t40,2,3;f1cno0,2,2;fkfrs0,4,2;i6f3s0,2", ";BMT;+03;+04|,0;-zik0zk,1;-r50g80,2,3", ";+04;+03|,0;-q3gmvk,1;19d0w0,2", ";+03;+04;+05|,0;-nu158c,1;-6p7kc0,2,3;atrbs0,2,2;bchh80,1,2;bv7jw0,2;dkgvk0,2,3", ";BMT;+07|,0;-zik0zk,1;-pysda4,2", ";+06;+07;+08|,0;-q4ljic,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;d98v40,1,2;liokw0,2;ne0ks0,1;o4nww0,2", ";+05;+06;+07|,0;-nu19tc,1;-kmr9w0,2,3;atr680,2,2;bazjk0,1,2;il2ko0,2", ";+0730;+08|,0;-mvofy4,1;-jb6i60,2", ";+08;+09;+10|,0;-q4cfog,1;-kmri80,2,3;atqxw0,2,2;bch3c0,1;bi8i00,2,3;liock0,3;ne0cg0,1;o4nrc0,2", ";+07;+08;+10;+09|,0;-xmct7c,1;46akk0,2,3;769dk0,4,3;jyjto0,2,4", ";MMT;+0530;+06;+0630|,0;-zik0zk,1;-xehask,2,3;-e9lco0,2,4;drxa20,4;dzufc0,3;ixq620,2", ";EET;EEST|,0;-q3gk20,1,2", ";HMT;+0630;+0530;+06;+07|,0;-zik0zk,1;-eqtpow,2;-ef78q0,3;-e9lba0,2;-9j0ne0,4,5", ";+08;+09|,0;-u9s4l8,1;-ejfac0,2;3b0ho0,1;g0zls0,2", ";+04|,0;-q3gnko,1", ";+05;+06;+07|,0;-nu18qo,1;-kmr9w0,2,3;atr680,2,2;bbgac0,1", ";EET;EEST;+03|,0;-p4bqac,1,2;od5jo0,3;oyk840,1,2", ";EET;EEST;IST;IDT|,0;-zik0zk,1,2;-1ceto0,3,4;dkh140,1,2", ";PLMT;+07;+08;+09|,0;-x56934,1;-umdqeu,2;-e3bkw0,3;-cxyro0,4;-cp63o0,2;-bvja40,3;-7kjq80,2;-57xfk0,3;2uaps0,2", ";HKT;HKST;JST|,0;-y0i0s0,1,2;-emgia0,3;-cog6c0,1,2", ";+06;+07;+08|,0;-xmcoz0,1;46anc0,2,3", ";IMT;+07;+08;+09|,0;-zik0zk,1;-q28gn5,2;-kmrfg0,3,4;atr0o0,3,3;bch640,2;bi8ks0,3,4;liofc0,4;ne0f80,3", ";BMT;+0720;+0730;+09;+08;WIB|,0;-zik0zk,1;-o0bdpc,2;-jebgdc,3;-ehxgu0,4;-co37o0,3;-bb5zi0,5;-a9m680,3;-34ru60,6", ";+09;+0930;WIT|,0;-jebm20,1;-d7zvo0,2;-34rzq0,3", ";JMT;IST;IDT;IDDT|,0;-zik0zk,1;-r50eig,2,3;-c3alo0,2,4;-b4txs0,2,3", ";+04;+0430|,0;-zik0zk,1;-d1pkg0,2", ";+11;+12;+13|,0;-olrupo,1;-kmrqk0,2,3;atqpk0,2,2;bcgv00,1;bi89o0,2,3;ks0uw0,2,2;lb3z00,1;lio700,2", ";+0530;+0630;+05;PKT;PKST|,0;-wvpb30,1,2;-9j0km0,3;n33g0,4,5", ";+0530;+0545|,0;-q3gt4s,1;8clsq0,2", ";+08;+09;+10;+11|,0;-q4cjrp,1;-kmri80,2,3;atqxw0,2,2;bch3c0,1;bi8i00,2,3;hqrlo0,3,4;lio9s0,4;lreus0,3;ne0cg0,2", "HMT;MMT;IST;+0630|,0;-zik0zk,1;-xehava,2,3", ";+06;+07;+08|,0;-q37l72,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;lioi40,3;ne0i00,2", ";SMT;+07;+0720;+0730;+09;+08|,0;-zik0zk,1;-xphpwd,2,3;-hquppc,3;-esddpc,4;-ejqa60,5;-conl00,4;69g360,6", ";+0730;+08;+0820;+09|,0;-mvof3k,1;-jb6i60,2,3;-ejqbk0,4;-conl00,2", ";CST;+09;+10;CDT|,0;-y0i2cy,1;-emm3o0,2,3;-cnoec0,1,4", ";+10;+11;+12|,0;-nu1nxc,1;-kmrns0,2,3;atqsc0,2,2;bcgxs0,1;bi8cg0,2,3;lio700,3;ne06w0,1;o63gg0,2", ";MMT;+08;+09;WITA|,0;-q3gzg0,1;-jebi40,2;-ek3a80,3;-co37o0,4", ";PST;PDT;JST|,0;-zik0zk,1,2;-efxa80,3;-d4ux00,1,2", ";EET;EEST|,0;-p4bq6g,1,2", ";+06;+07;+08|,0;-nu36tc,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;ks18s0,2,2;lb4cw0,1;liokw0,2", ";+06;+07;+08|,0;-q4do0s,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;c7fr40,1,2;liokw0,2;ne0ks0,1;oasa80,2", ";+05;+06;+07|,0;-q5xmx6,1;-kmr9w0,2,3;atr680,2,2;bchbo0,1;bi8qc0,2,3;liokw0,3;ne0ks0,2", ";+03;+05;+06;+04|,0;-nu15ic,1;-kmr4c0,2,3;64pu00,3,3;6nhrc0,2,3;9ry500,2,2;aaoag0,4,2;bi8t40,2,2;bv7h40,4,2;i6f3s0,2", ";PMT;+0730;+09;+08;WITA;WIB|,0;-w6piww,1;-jebg8w,2;-eknm60,3;-co37o0,2;-bb5zi0,4;-a9m680,2;-34ru60,5;9e5gg0,6", ";KST;JST|,0;-w895yc,1;-u9s4y0,2;-cpmro0,1", ";+04;+05;+06|,0;-nu17s4,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,1;bi8t40,2,3;i6f100,3", ";+04;+05;+06|,0;-nu184g,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3;atr900,2,2;bi8qc0,3,3;bv7ec0,2,3;i6f100,3;pk1rc0,2", ";+09;+11;+12;+10|,0;-xl87rc,1;-cpkx00,2,3;atqsc0,2,2;bcgxs0,4;bi8cg0,2,3;dzw1o0,2,2;eim740,4,2;lio9s0,2;ne09o0,4;o4nls0,2", ";+04;+05;+06|,0;-nu18eh,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3", ";KST;JST;KDT|,0;-w8966g,1;-u9s4y0,2;-couzo0,1;-88kmc0,1,3", ";CST;CDT|,0;-zik0zk,1,2", ";+10;+11;+12|,0;-nu1ogs,1;-kmrns0,2,3;atqsc0,2,2;bcgxs0,1;bi8cg0,2,3;lio700,3;ne06w0,2", ";CST;JST;CDT|,0;-zik0zk,1;-gtzfk0,2;-co6u80,1,3", ";+05;+06;+07|,0;-nu18tz,1;-kmr9w0,2,3;atr680,2,2;bchbo0,1", ";TBMT;+03;+04;+05|,0;-zik0zk,1;-nu14an,2;-6p7kc0,3,4;atrbs0,3,3;bchh80,2;bhbec0,2,3;cwngw0,3,4;hzxjg0,2,3;idzek0,3", ";TMT;+0330;+04;+05;+0430|,0;-s6m6uw,1;-cixliw,2;435vm0,3,4;4p2q80,2,5", ";+0530;+06|,0;-bojclo,1;99fa20,2", ";JST;JDT|,0;-zik0zk,1,2", ";+06;+07;+08|,0;-q3zbqf,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;gvea40,1,2;liokw0,2;ne0ks0,1;o7wkw0,2", ";+07;+08;+09|,0;-xmcrsk,1;46akk0,2,3", ";+06|,0;-lx5pjw,1", ";+08;+09;+12;+11;+10|,0;-q4cl6u,1;-kmri80,2,3;64pdc0,4,3;atqsc0,4,4;bcgxs0,5;bi8cg0,4,3;lio700,3;lres00,4;ne09o0,5", ";+09;+10;+11|,0;-oligf7,1;-kmrl00,2,3;atqv40,2,2;bch0k0,1;bi8f80,2,3;lio9s0,3;ne09o0,2", ";+08;+09;+10|,0;-q4cioy,1;-kmri80,2,3;atqxw0,2,2;bch3c0,1;bi8i00,2,3;liock0,3;ne0cg0,2", ";RMT;+0630;+09|,0;-zik0zk,1;-q3gv5b,2;-efx620,3;-cvg100,2", ";PMT;+04;+05;+06|,0;-rx5hw9,1;-qc75z5,2;-kmr740,3,4;atr900,3,3;bcheg0,2;bi8t40,3,4;liono0,4;ne0nk0,3", ";+03;+04;+05|,0;-nu148o,1;-6p7kc0,2,3;atrbs0,2,2;bchh80,1,2;dfdrw0,2;e3ank0,2,3", ";HMT;-02;-01;+00;WET|,0;-zik0zk,1;-u9rbs0,2,3;-eg5xc0,2,4;-eaeio0,2,3;-dxstc0,2,4;-dqyio0,2,3;-deps00,2,4;-d88g00,2,3;-cvzpc0,2,4;-cpidc0,2,3;-1yevk0,3,4;bv7s80,5,4;cdxs40,3,4", ";AST;ADT|,0;-kvj2fu,1,2", ";-01;WET;WEST|,0;-oytbtc,1;-c4xh40,2,3", ";-02;-01|,0;-u9rbs0,1,2;32t740,2", ";WET;WEST|,0;-wcehew,1,2", ";FMT;-01;+00;+01;WET;WEST|,0;-zik0zk,1;-u9rek0,2,3;-eg6040,2,4;-eaelg0,2,3;-dxsw40,2,4;-dqylg0,2,3;-depus0,2,4;-d88is0,2,3;-cvzs40,2,4;-cpig40,2,3;-1yeyc0,5,6", ";-01;+00;GMT|,0;-wcwx9c,1,2;-wlx40,3", ";-02|,0;-zik0zk,1", ";SMT;-04;-03;-02|,0;-zik0zk,1;-u63pac,2,3;6yf4g0,3,4;7zv480,3,3;8i8b00,2,3;l89fc0,3", "ACST;ACDT|,0;-zik0zk,0,1", ";AEST;AEDT|,0;-zik0zk,1,2", ";+0845;+0945|,0;-zik0zk,1,2", ";AEST;+1030;+1130;+11|,0;-zik0zk,1;5tp880,2,3;7wyiy0,2,4", ";AWST;AWDT|,0;-zik0zk,1,2", ";AMT;NST;+0120;+0020;CEST;CET|,0;-zik0zk,1,2;-gypack,4,3;-fgorlc,6,5", ";WET;CET;CEST|,0;-zik0zk,1;-c4xmo0,2,3", ";+03;+04;+05|,0;-nu2zkc,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1;o4o580,2", ";AMT;EET;EEST;CEST;CET|,0;-zik0zk,1;-rvv0cg,2,3;-eyqoc0,5,4;-dfp1g0,2,3", ";CET;CEST;CEMT|,0;-zik0zk,1,2;-cucg00,1,3;-co0o00,1,2;-btgl80,1,3;-bqxxc0,1,2", "PMT;CET;CEST;GMT|,0;-zik0zk,1,2;-c1qns0,1,3;-bujh80,1,2", "BMT;WET;CET;CEST;WEST|,0;-zik0zk,1;-ss5uo0,2,3;-qotw40,1,4;-fgh6g0,2,3", ";BMT;EET;EEST|,0;-zik0zk,1;-k29zi0,2,3", "BMT;CET;CEST|,0;-zik0zk,1,2", ";CMT;BMT;EET;EEST;CEST;CET;MSK;MSD|,0;-zik0zk,1;-r2p1bo,2;-k29zi0,3,4;-euq8c0,6,5;-dfqqk0,7,5;5vb6c0,7,8;am73s0,3,4", "CMT;CET;CEST|,0;-zik0zk,1,2", ";DMT;IST;GMT;BST|,0;-zik0zk,1,2;-rsibxr,3,4;-p36tc0,3,2;-m6840,2,3", ";GMT;BST;BDST;CET;CEST|,0;-zik0zk,1,2;-eyiyk0,1,3;-ethh80,1,2;-eh8qk0,1,3;-earek0,1,2;-dyinw0,1,3;-drod80,1,2;-dfsl80,1,3;-d75h80,1,2;-cx0nw0,1,3;-cro2k0,1,2;-buwfw0,1,3;-bos2k0,1,2;-6mxp40,4,5", ";GMT;BST;BDST|,0;-zik0zk,1,2;-eyiyk0,1,3;-ethh80,1,2;-eh8qk0,1,3;-earek0,1,2;-dyinw0,1,3;-drod80,1,2;-dfsl80,1,3;-d75h80,1,2;-cx0nw0,1,3;-cro2k0,1,2;-buwfw0,1,3;-bos2k0,1,2;-z4ns0,2,2;yd6w0,1,2", ";HMT;EET;EEST|,0;-zik0zk,1;-peghyd,2,3", ";IMT;EET;EEST;+04;+03|,0;-zik0zk,1;-ux9xew,2,3;4l2d00,5,4;7zfx00,2,3;od3p00,5", ";CET;CEST;MSK;MSD;EEST;EET;+03|,0;-zik0zk,1,2;-cixhk0,3,4;9ryak0,3,5;aaog00,6,5;liow00,7;ne0vw0,6", ";KMT;EET;MSK;CEST;CET;MSD;EEST|,0;-zik0zk,1;-nu11ng,2;-kmr1k0,3,4;-e6dzw0,5,4;-dnetg0,3,6;ap2t40,2,7", ";+03;+04;+05|,0;-qcx400,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1", ";WET;WEST;WEMT;CET;CEST|,0;-u9rhc0,1,2;-eg62w0,1,3;-eaeo80,1,2;-dxsyw0,1,3;-dqyo80,1,2;-depxk0,1,3;-d88lk0,1,2;-cvzuw0,1,3;-cpiiw0,1,2;-1yf140,4;3ijk00,1,2;bv7pg0,4,5;dfdxg0,4,2;dzwtg0,1,2", ";CET;CEST;WET;WEST|,0;-y89550,1,2;-qo4w40,3,4;-dfqqk0,1,4;-cx0nw0,1,2", ";WET;WEST;WEMT;CET;CEST|,0;-zik0zk,1,2;-gj2dk0,1,3;-gb3c80,1,2;-fjrxg0,4,5", ";MMT;EET;MSK;CEST;CET;MSD;EEST;+03|,0;-zik0zk,1;-nu113c,2;-kmr1k0,3,4;-e6dzw0,5,4;-db2g80,3,6;afrjo0,3,7;bchk00,2,7;liow00,8", ";PMT;WET;WEST;WEMT;CET;CEST|,0;-zik0zk,1;-uozn3l,2,3;-eyh9g0,2,4;-eqk5k0,2,3;-eimw40,2,4;-e6dzw0,2,3;-dytrw0,2,4;-dp3rw0,2,3;-dfqqk0,2,4;-d62qs0,2,3;-cx0nw0,5,4;396io0,5,6", ";MMT;MST;MDST;MSD;MSK;+05;EET;EEST|,0;-zik0zk,1;-rx5dmh,1,2;-r57wg7,1,3;-qrqps7,1,2;-qeh0k7,1,3;-qcx400,5,4;-pgkok0,5,6;-p84z80,5,4;-ontcc0,7;-kmr1k0,5,4;atrek0,5,8;bchk00,7;bi8yo0,5,4", ";PMT;WET;WEST;CEST;CET;WEMT|,0;-zik0zk,1;-uozn1x,2,3;-ff5c80,5,4;-d8caw0,5,6;-d62qs0,5,3;-cx0nw0,5,6;396io0,5,4", ";RMT;LST;EET;MSK;CEST;CET;MSD;EEST|,0;-zik0zk,1,2;-ms0hsy,3;-fciw80,4,5;-e6dzw0,6,5;-d5thg0,4,7;9ryak0,4,8;aaog00,3,8", "RMT;CET;CEST|,0;-zik0zk,1,2", ";+03;+04;+05|,0;-qcx400,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;atrek0,1,1;bdkg00,2,3;ks1h40,2,2;lb4l80,1;liot80,2", ";+03;+04;+05|,0;-qcx400,1;-kmr4c0,2,3;998540,2,2;9ryak0,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1;ohmt80,2", ";SMT;EET;MSK;CEST;CET;MSD;EEST|,0;-zik0zk,1;-nu12ao,2;-kmr1k0,3,4;-e6dzw0,5,4;-df8g80,3,6;ap2vw0,2,7;cp3bo0,3,6;e3aqc0,3,7;eimw40,2,7;n382o0,3", "IMT;EET;CET;CEST;EEST|,0;-zik0zk,1;-e6dzw0,2,3;-cx0l40,1,4", "SET;CET;CEST|,0;-zik0zk,1,2", ";TMT;CET;CEST;EET;MSK;MSD;EEST|,0;-zik0zk,1;-r3exx0,2,3;-qcx6s0,1;-peghx0,4;-fch1k0,5,3;-e6dzw0,2,3;-d6wg80,5,6;9ryak0,5,7;aaog00,4,7", ";CET;CEST|,0;-t85vo8,1,2", ";+03;+04;+05;+02|,0;-qcx400,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;atrek0,1,1;bchk00,4;bi8yo0,1,2;liot80,2;ne0t40,1;o4o580,2", ";CET;CEST;MSK;MSD;EET;EEST|,0;-zik0zk,1,2;-cshus0,3,4;ap2vw0,1;b34o80,5,6", ";WMT;KMT;CET;EET;MSK;CEST;MSD;EEST|,0;-zik0zk,1;-rns980,2;-q7q73c,3;-ptj1g0,4;-poyaw0,3;-fcmis0,5,6;-e6dzw0,3,6;-d9kqw0,5,7;9ryak0,5,8;aaog00,4,8;em2qg0,4,6;f1cys0,3,6;fkg040,4;h807s0,4,8", ";+03;+04;+05|,0;-q3cw84,1;-kmr4c0,2,3;998540,2,2;9ryak0,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1;pha580,2", ";WMT;CET;CEST;EET;EEST|,0;-zik0zk,1;-se9yk0,2,3;-qrqd80,4,5;-ou36w0,2,3", ";+0220;EET;MSK;CEST;CET;MSD;EEST|,0;-zik0zk,1;-nu12hc,2;-kmr1k0,3,4;-e6dzw0,5,4;-do11g0,3,6;atrek0,3,7;bchbo0,2,7", ";+05;+06|,0;-wvpc2s,1;dkgss0,2", ";+07|,0;-zik0zk,1", ";+0630|,0;-zik0zk,1", "-00;+05|,0;-afrs00,1", ";+04|,0;-x6pjlo,1", ";MMT;+05|,0;-zik0zk,1;-57x6y0,2", ";+04;+05|,0;-wvp9bc,1,2", ";+04|,0;-uks29s,1", ";-1130;-11;-10;+14;+13|,0;-usiiv4,1;-afqw20,2,3;lx0h40,5,4", "PMMT;+10;+09;+11|,0;-zik0zk,1;-ecsh40,2;-cpsbo0,1;nh90g0,3", ";+1215;+1245;+1345|,0;-zik0zk,1;-ciya10,2,3", ";+10;+09|,0;-zik0zk,1;-su4zs0,2;-qknl00,1;-f08x40,2;-cqtd00,1", ";EMT;-07;-06;-05|,0;-zik0zk,1;-jhfaew,2,3;6d68c0,3,4", ";+11;+12|,0;-u964i4,1,2", ";-12;-11;+13|,0;-zik0zk,1;535io0,2;d1o980,3", ";-11;+13|,0;-zik0zk,1;lx0jw0,2", ";+12;+13|,0;-sa2x4w,1,2", ";+12|,0;-zik0zk,1", ";-05;-06|,0;-kcr62o,1;8cmlw0,2,1", ";-09|,0;-tvndoc,1", ";+11|,0;-tvowac,1", ";GST;+09;GDT;ChST|,0;-zik0zk,1;-en8eg0,2;-d9n500,1,3;g5z2w0,4", ";HST;HDT;HWT;HPT|,0;-zik0zk,1,2;-j3x0a0,1,3;-cq2tg0,1,4", ";-1040;-10;+14|,0;-zik0zk,1;535eyo,2;d1o6g0,3", ";+11;+09;+10;+12|,0;-zik0zk,1;-su52k0,2;-qknl00,1;-h817w0,3;-f08x40,2;-cqtd00,1;-4r7w0,4;f4tw00,1", ";+11;+10;+09;-12;+12|,0;-zik0zk,1;-h817w0,2;-f08x40,3;-dip2c0,1;-4r7w0,4;cc3yo0,5", ";+11;+09;+10;+12|,0;-zik0zk,1;-su52k0,2;-qknl00,1;-h817w0,3;-f08x40,2;-dj2100,1;-4r7w0,4", ";-0930|,0;-tvncu0,1", ";SST|,0;-usij20,1", ";+1130;+09;+12|,0;-pjxiws,1;-e9rby0,2;-couzo0,1;4r4dm0,3", ";-1120;-1130;-11|,0;-zik0zk,1;-9wyz6o,2;4kdjy0,3", ";+1112;+1130;+1230;+11|,0;-zik0zk,1;-9x0ps0,2,3;nvney0,4", ";+11;+12|,0;-u9645o,1,2", ";+09|,0;-zik0zk,1", ";-0830;-08|,0;-zik0zk,1;es2cy0,2", ";+11;+09;+10|,0;-zik0zk,1;-su52k0,2;-qknl00,1;-h817w0,3;-f08x40,2;-cqtd00,1", "PMMT;+10|,0;-zik0zk,1", ";-1030;-0930;-10|,0;-zik0zk,1,2;4sal20,3,2", ";-10|,0;-tvnayw,1", ";+1220;+13;+14|,0;-zik0zk,1;-f4vrlc,2,3", "UTC|,0"];
  var resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
  Object.assign(DateTime, {
    // Whether to clamp current date when adjusting month
    clampDates: true,
    // Default locale
    defaultLocale: resolvedOptions.locale,
    // Default timezone
    defaultTimezone: resolvedOptions.timeZone,
    // Formats
    formats: {
      atom: 'Y-m-d\\TH:i:sP',
      cookie: 'l, d-M-Y H:i:s T',
      date: 'D M d Y',
      iso8601: 'Y-m-d\\TH:i:sO',
      rfc822: 'D, d M y H:i:s O',
      rfc850: 'l, d-M-y H:i:s T',
      rfc1036: 'D, d M y H:i:s O',
      rfc1123: 'D, d M Y H:i:s O',
      rfc2822: 'D, d M Y H:i:s O',
      rfc3339: 'Y-m-d\\TH:i:sP',
      rfc3339_extended: 'Y-m-d\\TH:i:s.vP',
      rss: 'D, d M Y H:i:s O',
      string: 'D M d Y H:i:s O (e)',
      time: 'H:i:s O (e)',
      w3c: 'Y-m-d\\TH:i:sP'
    },
    // Language
    lang: {
      dayPeriods: {
        lower: ['am', 'pm'],
        upper: ['AM', 'PM']
      },
      days: {
        min: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      },
      months: {
        short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      numberRegex: '\\d',
      numbers: false,
      ordinal: function ordinal(value) {
        var j = value % 10;
        var k = value % 100;

        if (j === 1 && k !== 11) {
          return 'st';
        }

        if (j === 2 && k !== 12) {
          return 'nd';
        }

        if (j === 3 && k !== 13) {
          return 'rd';
        }

        return 'th';
      }
    },
    // Formatter locale
    _formatterLocale: 'en-US',
    // Formatter options
    _formatterOptions: {
      timeZone: 'UTC',
      hour12: false,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    },
    // Days in months
    _monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    // Seperators
    _seperators: [';', ':', '/', '.', ',', '-', '(', ')'],
    // timezones
    _timezones: {}
  }); // UTC formatter

  DateTime._utcFormatter = new Intl.DateTimeFormat(DateTime._formatterLocale, DateTime._formatterOptions); // Aliases

  DateTime.prototype.getFullYear = DateTime.prototype.getYear;
  DateTime.prototype.setFullYear = DateTime.prototype.setYear;
  /**
   * Populate timezones
   */

  var _arr4 = Object.keys(zones);

  var _loop = function _loop() {
    var timezone = _arr4[_i4];
    var parts = values[zones[timezone]].split('|'),
        abbr = parts.shift().split(';').map(function (a) {
      return a || 'LMT';
    }),
        transitions = parts.shift().split(';').map(function (t) {
      var data = t.split(',');
      data[0] = data[0] ? parseInt(data[0], 36) : -Number.MAX_VALUE;
      return data;
    });
    DateTime._timezones[timezone] = transitions.map(function (transition, i) {
      return {
        start: transition[0],
        end: i == transitions.length - 1 ? Number.MAX_VALUE : transitions[i + 1][0] - 1,
        abbr: transition[1] && abbr[transition[1]],
        dst: transition[2] && abbr[transition[2]]
      };
    });
  };

  for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
    _loop();
  }

  return {
    DateInterval: DateInterval,
    DateTime: DateTime,
    DateTimeImmutable: DateTimeImmutable
  };
});
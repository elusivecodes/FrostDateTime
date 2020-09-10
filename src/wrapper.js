/**
 * FrostDateTime v1.0.4
 * https://github.com/elusivecodes/FrostDateTime
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(this, function() {
    'use strict';

    // {{code}}
    return {
        DateInterval,
        DateTime,
        DateTimeImmutable
    };

});
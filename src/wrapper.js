/**
 * FrostDateTime v3.0.6
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
        DateFormatter,
        DateTime,
        DateTimeImmutable
    };

});
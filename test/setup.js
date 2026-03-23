import { beforeEach } from 'mocha';
import DateTime from '../src/index.js';

beforeEach(function() {
    DateTime.setDateClamping(true);
    DateTime.setDefaultLocale('en');
    DateTime.setDefaultTimeZone('UTC');
});

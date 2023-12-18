<table>
    <thead>
        <tr>
            <td>Pattern</td>
            <td>Example</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="3"><strong>Era</strong></td>
        </tr>
        <tr>
            <td><code>G..GGG</code></td>
            <td><em>AD</em></td>
            <td>Era (short)</td>
        </tr>
        <tr>
            <td><code>GGGG</code></td>
            <td><em>Anno Domini</em></td>
            <td>Era (long)</td>
        </tr>
        <tr>
            <td><code>GGGGG</code></td>
            <td><em>A</em></td>
            <td>Era (narrow)</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Year</strong></td>
        </tr>
        <tr>
            <td><code>y</code></td>
            <td><em>2, 20, 201, 2017</em></td>
            <td rowspan="4">
                Calendar year<br />
                Zero padded to pattern length.<br />
                The <code>yy</code> format will always use the 2 low-order digits of the year.
            </td>
        </tr>
        <tr>
            <td><code>yy</code></td>
            <td><em>02, 20, 01, 17</em></td>
        </tr>
        <tr>
            <td><code>yyy</code></td>
            <td><em>002, 020, 201, 2017</em></td>
        </tr>
        <tr>
            <td><code>yyyy+</code></td>
            <td><em>0002, 0020, 0201, 2017</em></td>
        </tr>
        <tr>
            <td><code>Y</code></td>
            <td><em>2, 20, 201, 2017</em></td>
            <td rowspan="4">
                Week year<br />
                Zero padded to pattern length.<br />
                The <code>YY</code> format will always use the 2 low-order digits of the year.
            </td>
        </tr>
        <tr>
            <td><code>YY</code></td>
            <td><em>02, 20, 01, 17</em></td>
        </tr>
        <tr>
            <td><code>YYY</code></td>
            <td><em>002, 020, 201, 2017</em></td>
        </tr>
        <tr>
            <td><code>YYYY+</code></td>
            <td><em>0002, 0020, 0201, 2017</em></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Quarter</strong></td>
        </tr>
        <tr>
            <td><code>q</code></td>
            <td><em>2</em></td>
            <td>Quarter</td>
        </tr>
        <tr>
            <td><code>qq</code></td>
            <td><em>02</em></td>
            <td>Quarter (2-digits)</td>
        </tr>
        <tr>
            <td><code>Q</code></td>
            <td><em>2</em></td>
            <td><strong>Standalone</strong> Quarter</td>
        </tr>
        <tr>
            <td><code>QQ</code></td>
            <td><em>02</em></td>
            <td><strong>Standalone</strong> Quarter (2-digits)</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Month</strong></td>
        </tr>
        <tr>
            <td><code>M</code></td>
            <td><em>9, 12</em></td>
            <td>Month number</td>
        </tr>
        <tr>
            <td><code>MM</code></td>
            <td><em>09, 12</em></td>
            <td>Month number (2-digits)</td>
        </tr>
        <tr>
            <td><code>MMM</code></td>
            <td><em>Sep</em></td>
            <td>Month name (short)</td>
        </tr>
        <tr>
            <td><code>MMMM</code></td>
            <td><em>September</em></td>
            <td>Month name (long)</td>
        </tr>
        <tr>
            <td><code>MMMMM</code></td>
            <td><em>S</em></td>
            <td>Month name (narrow)</td>
        </tr>
        <tr>
            <td><code>L</code></td>
            <td><em>9, 12</em></td>
            <td><strong>Standalone</strong> Month number</td>
        </tr>
        <tr>
            <td><code>LL</code></td>
            <td><em>09, 12</em></td>
            <td><strong>Standalone</strong> Month number (2-digits)</td>
        </tr>
        <tr>
            <td><code>LLL</code></td>
            <td><em>Sep</em></td>
            <td><strong>Standalone</strong> Month name (short)</td>
        </tr>
        <tr>
            <td><code>LLLL</code></td>
            <td><em>September</em></td>
            <td><strong>Standalone</strong> Month name (long)</td>
        </tr>
        <tr>
            <td><code>LLLLL</code></td>
            <td><em>S</em></td>
            <td><strong>Standalone</strong> Month name (narrow)</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Week</strong></td>
        </tr>
        <tr>
            <td><code>w</code></td>
            <td><em>8, 27</em></td>
            <td>Week of year</td>
        </tr>
        <tr>
            <td><code>ww</code></td>
            <td><em>08, 27</em></td>
            <td>Week of year (2-digits)</td>
        </tr>
        <tr>
            <td><code>W</code></td>
            <td><em>3</em></td>
            <td>Week of month.</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Day</strong></td>
        </tr>
        <tr>
            <td><code>d</code></td>
            <td><em>1</em></td>
            <td>Day of month</td>
        </tr>
        <tr>
            <td><code>dd</code></td>
            <td><em>01</em></td>
            <td>Day of month (2-digits)</td>
        </tr>
        <tr>
            <td><code>D..DDD</code></td>
            <td><em>345</em></td>
            <td>
                Day of year<br />
                Zero padded to pattern length.
            </td>
        </tr>
        <tr>
            <td><code>F</code></td>
            <td><em>2</em></td>
            <td>Day of week in month</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Week Day</strong></td>
        </tr>
        <tr>
            <td><code>E..EEE</code></td>
            <td><em>Tue</em></td>
            <td>Day of week name (short)</td>
        </tr>
        <tr>
            <td><code>EEEE</code></td>
            <td><em>Tuesday</em></td>
            <td>Day of week name (long)</td>
        </tr>
        <tr>
            <td><code>EEEEE</code></td>
            <td><em>T</em></td>
            <td>Day of week name (narrow)</td>
        </tr>
        <tr>
            <td><code>e</code></td>
            <td><em>2</em></td>
            <td>Day of week number</td>
        </tr>
        <tr>
            <td><code>ee</code></td>
            <td><em>02</em></td>
            <td>Day of week number (2-digits)</td>
        </tr>
        <tr>
            <td><code>eee</code></td>
            <td><em>Tue</em></td>
            <td>Day of week name (short)</td>
        </tr>
        <tr>
            <td><code>eeee</code></td>
            <td><em>Tuesday</em></td>
            <td>Day of week name (long)</td>
        </tr>
        <tr>
            <td><code>eeeee</code></td>
            <td><em>T</em></td>
            <td>Day of week name (narrow)</td>
        </tr>
        <tr>
            <td><code>c</code></td>
            <td><em>2</em></td>
            <td><strong>Standalone</strong> Day of week number</td>
        </tr>
        <tr>
            <td><code>cc</code></td>
            <td><em>02</em></td>
            <td><strong>Standalone</strong> Day of week number (2-digits)</td>
        </tr>
        <tr>
            <td><code>ccc</code></td>
            <td><em>Tue</em></td>
            <td><strong>Standalone</strong> Day of week name (short)</td>
        </tr>
        <tr>
            <td><code>cccc</code></td>
            <td><em>Tuesday</em></td>
            <td><strong>Standalone</strong> Day of week name (long)</td>
        </tr>
        <tr>
            <td><code>ccccc</code></td>
            <td><em>T</em></td>
            <td><strong>Standalone</strong> Day of week name (narrow)</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Day Period</strong></td>
        </tr>
        <tr>
            <td><code>a..aaa</code></td>
            <td><em>am</em></td>
            <td>Day period (short)</td>
        </tr>
        <tr>
            <td><code>aaaa</code></td>
            <td><em>am</em></td>
            <td>Day period (long)</td>
        </tr>
        <!-- <tr>
            <td><code>aaaaa</code></td>
            <td><em>a</em></td>
            <td>Day period (narrow)</td>
        </tr> -->
        <tr>
            <td colspan="3"><strong>Hour</strong></td>
        </tr>
        <tr>
            <td><code>h</code></td>
            <td><em>1, 12</em></td>
            <td>Hour [1-12]</td>
        </tr>
        <tr>
            <td><code>hh</code></td>
            <td><em>01, 12</em></td>
            <td>Hour [1-12] (2-digits)</td>
        </tr>
        <tr>
            <td><code>H</code></td>
            <td><em>0, 23</em></td>
            <td>Hour [0-23]</td>
        </tr>
        <tr>
            <td><code>HH</code></td>
            <td><em>00, 23</em></td>
            <td>Hour [0-23] (2-digits)</td>
        </tr>
        <tr>
            <td><code>K</code></td>
            <td><em>0, 11</em></td>
            <td>Hour [0-11]</td>
        </tr>
        <tr>
            <td><code>KK</code></td>
            <td><em>00, 11</em></td>
            <td>Hour [0-11] (2-digits)</td>
        </tr>
        <tr>
            <td><code>k</code></td>
            <td><em>1, 24</em></td>
            <td>Hour [1-24]</td>
        </tr>
        <tr>
            <td><code>kk</code></td>
            <td><em>01, 24</em></td>
            <td>Hour [1-24] (2-digits)</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Minute</strong></td>
        </tr>
        <tr>
            <td><code>m</code></td>
            <td><em>8, 59</em></td>
            <td>Minute</td>
        </tr>
        <tr>
            <td><code>mm</code></td>
            <td><em>08, 59</em></td>
            <td>Minute (2-digits)</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Second</strong></td>
        </tr>
        <tr>
            <td><code>s</code></td>
            <td><em>8, 12</em></td>
            <td>Second</td>
        </tr>
        <tr>
            <td><code>ss</code></td>
            <td><em>08, 12</em></td>
            <td>Second (2-digits)</td>
        </tr>
        <tr>
            <td><code>S+</code></td>
            <td><em>3456</em></td>
            <td>
                Fractional second<br />
                Truncated to pattern length.
            </td>
        </tr>
        <tr>
            <td colspan="3"><strong>Time Zone</strong></td>
        </tr>
        <tr>
            <td><code>z..zzz</code></td>
            <td><em>PDT</em></td>
            <td>Short specific non-location format*</td>
        </tr>
        <tr>
            <td><code>zzzz</code></td>
            <td><em>Pacific Daylight Time</em></td>
            <td>Long specific non-location format*</td>
        </tr>
        <tr>
            <td><code>Z..ZZZ</code></td>
            <td><em>-0800</em></td>
            <td>ISO8601 basic format</td>
        </tr>
        <tr>
            <td><code>ZZZZ</code></td>
            <td><em>GMT-8:00</em></td>
            <td>Long localized GMT format</td>
        </tr>
        <tr>
            <td><code>ZZZZZ</code></td>
            <td><em>-8:00</em></td>
            <td>ISO8601 extended format</td>
        </tr>
        <tr>
            <td><code>O</code></td>
            <td><em>GMT-8</em></td>
            <td>Short localized GMT format</td>
        </tr>
        <tr>
            <td><code>OOOO</code></td>
            <td><em>GMT-8:00</em></td>
            <td>Long localized GMT format</td>
        </tr>
        <tr>
            <td><code>VV</code></td>
            <td><em>America/Los_Angeles</em></td>
            <td>Long time zone ID</td>
        </tr>
        <tr>
            <td><code>X</code></td>
            <td><em>-08, +0530, Z</em></td>
            <td>ISO8601 basic format with Z (optional minutes)</td>
        </tr>
        <tr>
            <td><code>XX</code></td>
            <td><em>-0800, Z</em></td>
            <td>ISO8601 basic format with Z</td>
        </tr>
        <tr>
            <td><code>XXX</code></td>
            <td><em>-08:00, Z</em></td>
            <td>ISO8601 extended format with Z</td>
        </tr>
        <tr>
            <td><code>x</code></td>
            <td><em>-08, +0530, +00</em></td>
            <td>ISO8601 basic format (optional minutes)</td>
        </tr>
        <tr>
            <td><code>xx</code></td>
            <td><em>-0800, +0000</em></td>
            <td>ISO8601 basic format</td>
        </tr>
        <tr>
            <td><code>xxx</code></td>
            <td><em>-08:00, +00:00</em></td>
            <td>ISO8601 extended format</td>
        </tr>
    </tbody>
</table>
<p><em>* Output only</em></p>
<p><strong>Characters wrapped in <code>'</code> quotes will not be parsed.</strong></p>
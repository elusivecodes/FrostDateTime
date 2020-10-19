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
            <td>Abbreviated</td>
        </tr>
        <tr>
            <td><code>GGGG</code></td>
            <td><em>Anno Domini</em></td>
            <td>Wide</td>
        </tr>
        <tr>
            <td><code>GGGGG</code></td>
            <td><em>A</em></td>
            <td>Narrow</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Year</strong></td>
        </tr>
        <tr>
            <td><code>y..yyyy+</code></td>
            <td><em>2020</em></td>
            <td>Calendar year. Zero padded to pattern length. The <code>yy</code> format will always use the 2 low-order digits of the year.</td>
        </tr>
        <tr>
            <td><code>Y..YYYY+</code></td>
            <td><em>2020</em></td>
            <td>Week year. Zero padded to pattern length. The <code>yy</code> format will always use the 2 low-order digits of the year.</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Quarter</strong></td>
        </tr>
        <tr>
            <td><code>q</code></td>
            <td><em>2</em></td>
            <td rowspan="2">Quarter. Zero padded to pattern length.</td>
        </tr>
        <tr>
            <td><code>qq</code></td>
            <td><em>02</em></td>
        </tr>
        <tr>
            <td><code>Q</code></td>
            <td><em>2</em></td>
            <td rowspan="2">Quarter (standalone). Zero padded to pattern length.</td>
        </tr>
        <tr>
            <td><code>QQ</code></td>
            <td><em>02</em></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Month</strong></td>
        </tr>
        <tr>
            <td><code>M</code></td>
            <td><em>9</em></td>
            <td rowspan="2">Month number.</td>
        </tr>
        <tr>
            <td><code>MM</code></td>
            <td><em>09</em></td>
        </tr>
        <tr>
            <td><code>MMM</code></td>
            <td><em>Sep</em></td>
            <td rowspan="3">Month name.</td>
        </tr>
        <tr>
            <td><code>MMMM</code></td>
            <td><em>September</em></td>
        </tr>
        <tr>
            <td><code>MMMMM</code></td>
            <td><em>S</em></td>
        </tr>
        <tr>
            <td><code>L</code></td>
            <td><em>9</em></td>
            <td rowspan="2">Month number (standalone).</td>
        </tr>
        <tr>
            <td><code>LL</code></td>
            <td><em>09</em></td>
        </tr>
        <tr>
            <td><code>LLL</code></td>
            <td><em>Sep</em></td>
            <td rowspan="3">Month name (standalone).</td>
        </tr>
        <tr>
            <td><code>LLLL</code></td>
            <td><em>September</em></td>
        </tr>
        <tr>
            <td><code>LLLLL</code></td>
            <td><em>S</em></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Week</strong></td>
        </tr>
        <tr>
            <td><code>w</code></td>
            <td><em>8</em></td>
            <td rowspan="2">Week of year.</td>
        </tr>
        <tr>
            <td><code>ww</code></td>
            <td><em>08</em></td>
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
            <td rowspan="2">Day of month.</td>
        </tr>
        <tr>
            <td><code>dd</code></td>
            <td><em>01</em></td>
        </tr>
        <tr>
            <td><code>D..DDD</code></td>
            <td><em>345</em></td>
            <td>Day of year.</td>
        </tr>
        <tr>
            <td><code>F</code></td>
            <td><em>2</em></td>
            <td>Day of week in month.</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Week Day</strong></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Period</strong></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Hour</strong></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Minute</strong></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Second</strong></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Time Zone</strong></td>
        </tr>
    </tbody>
</table>
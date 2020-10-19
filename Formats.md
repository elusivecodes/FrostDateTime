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
            <td colspan="3">**Era**</td>
        </tr>
        <tr>
            <td>`G..GGG`</td>
            <td>*AD*</td>
            <td>Abbreviated</td>
        </tr>
        <tr>
            <td>`GGGG`</td>
            <td>*Anno Domini*</td>
            <td>Wide</td>
        </tr>
        <tr>
            <td>`GGGGG`</td>
            <td>*A*</td>
            <td>Narrow</td>
        </tr>
        <tr>
            <td colspan="3">**Year**</td>
        </tr>
        <tr>
            <td>`y`</td>
            <td>*2*,*20*,*202*,*2020*</td>
            <td rowspan="5">Calendar year (zero padded to pattern length). The `yy` format will always use the 2 low-order digits of the year.</td>
        </tr>
        <tr>
            <td>`yy`</td>
            <td>*02*,*20*,*02*,*20*</td>
        </tr>
        <tr>
            <td>`yyy`</td>
            <td>*002*,*020*,*0202*,*2020*</td>
        </tr>
        <tr>
            <td>`yyyy`</td>
            <td>*0002*,*0020*,*0202*,*2020*</td>
        </tr>
        <tr>
            <td>`yyyyy+`</td>
            <td>...</td>
        </tr>
    </tbody>
</table>
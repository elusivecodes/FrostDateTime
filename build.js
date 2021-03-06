const path = require('path');
const fs = require('fs');
const filepath = require('filepath');
const terser = require('terser');

const srcFolder = 'src';
const distFolder = 'dist';

const name = 'frost-datetime';

// load files and wrapper
let wrapper;
const files = [];

filepath.create(srcFolder).recurse(fullPath => {
    if (!fullPath.isFile()) {
        return;
    }

    if (path.extname(fullPath.path) === '.js') {
        const fileName = path.basename(fullPath.path, '.js');
        const data = fs.readFileSync(fullPath.path, 'utf8');

        if (fileName === 'wrapper') {
            wrapper = data;
        } else {
            files.push(data);
        }
    }
});

// inject code to wrapper
const code = wrapper.replace(
    '    // {{code}}',
    _ => files.join('\r\n')
        .replace(
            /^(?!\s*$)/mg,
            ' '.repeat(4)
        )
);

// minify
terser.minify(code, {
    ecma: 8,
    compress: {
        ecma: 8
    }
}).then(minified => {
    fs.writeFileSync(
        path.join(distFolder, name + '.js'),
        code
    );

    fs.writeFileSync(
        path.join(distFolder, name + '.min.js'),
        minified.code
    );
}).catch(error => {
    console.error(error);
});
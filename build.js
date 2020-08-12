const path = require('path');
const fs = require('fs');
const filepath = require('filepath');
const terser = require('terser');
const babel = require('@babel/core');

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

// write file
fs.writeFileSync(
    path.join(distFolder, name + '.js'),
    code
);

// minify
const minified = terser.minify(code, {
    ecma: 8,
    compress: {
        ecma: 8
    }
});

if (minified.error) {
    console.error(minified.error);
} else {
    fs.writeFileSync(
        path.join(distFolder, name + '.min.js'),
        minified.code
    );
}

// es5 transpile
const es5 = babel.transformSync(code, { presets: ['@babel/env'] });

// write file
fs.writeFileSync(
    path.join(distFolder, name + '-es5.js'),
    es5.code
);

// minify
const minifiedes5 = terser.minify(es5.code, {
    ecma: 5
});

if (minifiedes5.error) {
    console.error(minifiedes5.error);
} else {
    fs.writeFileSync(
        path.join(distFolder, name + '-es5.min.js'),
        minifiedes5.code
    );
}
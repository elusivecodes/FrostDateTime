const path = require('path');
const fs = require('fs');
const filepath = require('filepath');
const UglifyJS = require('uglify-es');

const srcFolder = 'src';
const distFolder = 'dist';

const name = 'frost-datetime';

// load files and wrapper
let wrapper;
let code = [];

filepath.create(srcFolder).recurse(fullPath => {
    if ( ! fullPath.isFile()) {
        return;
    }

    if (path.extname(fullPath.path) === '.js') {
        const fileName = path.basename(fullPath.path, '.js');
        const data = fs.readFileSync(fullPath.path, 'utf8');

        if (fileName === 'wrapper') {
            wrapper = data;
        } else {
            code.push(data);
        }
    }
});

// concatenate code
code = code.join('\r\n\r\n');

// indent code
code = code.replace(/^(?!\s*$)/mg, ' '.repeat(4));

// inject code to wrapper
code = wrapper.replace('// {{code}}', code);

// write file
const destination = path.join(distFolder, name + '.js');
filepath.create(destination).write(code);

// minify
const minified = UglifyJS.minify(code);

if (minified.error) {
    console.error(minified.error);
} else {
    const destination = path.join(distFolder, name + '.min.js');
    filepath.create(destination).write(minified.code);
}
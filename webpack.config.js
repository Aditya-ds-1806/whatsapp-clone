const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'public/src/index.js'),
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'index.js',
    },
};

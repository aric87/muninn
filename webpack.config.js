var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

var filename = ['index.min.js'];

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: filename.join('.'),
    },
    devtool: 'source-map',
    module: {
     loaders: [
       {
         test: /\.js$/,
         exclude: /(node_modules)/,
         loader: 'babel',
         query: {
           presets: ['es2015']
         }
       }
     ]
   }
}

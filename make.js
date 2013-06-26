/* CoffeeImage / make.js
 * echo 'make script for CoffeeImage' && node make
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var bitfactory = require('bitfactory'),
    UglifyJS = require("uglify-js"),
    stoptime = require('stoptime'),
    fs = require('fs');

var watch = stoptime(),
    header = '';

bitfactory.make({ //routes
    "": function(err, results) {
        console.log('built CoffeeImage in ' + watch.elapsed() + 'ms.');
    }
}, { //dependencies
    "*": { //wildcard
        "header": function(cb) {
            fs.readFile('coffee-image.h', 'utf8', function(err, data) {
                header = data;
                cb(err);
            });
        },
        "coffee-image.min.js": ["header", function(cb) {
            fs.writeFileSync('coffee-image.min.js', header + UglifyJS.minify('coffee-image.js').code);
            cb();
        }]
    }
});
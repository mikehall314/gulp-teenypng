/*jslint node: true, maxlen: 120 */

/*

gulp-teenypng

A gulp module to minify PNG images using teenypng + TinyPNG.

*/

"use strict";

var map, path, gutil, filesize, teenypng;

map      = require('map-stream');
gutil    = require("gulp-util");
path     = require("path");
teenypng = require("teenypng");
filesize = require('filesize');

module.exports = function (options) {
    var extensions = ['.jpg', '.jpeg', '.png'];

    return map(function (file, cb) {

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new gutil.PluginError('gulp-teenypng', 'Streaming not supported'));
        }

        // Double check we have images of the correct type
        if (extensions.indexOf(path.extname(file.path).toLowerCase()) === -1) {
            gutil.log('gulp-teenypng: Skipping unsupported image ' + gutil.colors.blue(file.relative));
            return cb(null, file);
        }

        // Now convert the buffer to a string and throw it at teenypng
        teenypng(file.contents, options, function (err, result) {

            var bytesSaved, statusMessage;

            if (err) {
                return cb(new gutil.PluginError('gulp-teenypng', err));
            }

            // Calculate how much space we saved
            bytesSaved = result.input.size - result.output.size;

            // Output a status message
            statusMessage = bytesSaved > 0 ? 'saved ' + filesize(bytesSaved, {round: 1}) : 'already optimized';
            statusMessage = gutil.colors.green('✔ ') + file.relative + gutil.colors.gray(' (' + statusMessage + ')');
            gutil.log('gulp-teenypng:', statusMessage);

            // Pass on the file
            if (bytesSaved > 0) {
                file.contents = result.output.image;
            }

            cb(null, file);
        });
    });
};

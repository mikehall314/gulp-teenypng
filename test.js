/*jslint node: true, nomen: true, stupid: true */
/*global describe, before, it */

"use strict";

var fs, assert, gutil, prompt, teenypng, defaults;

fs       = require("fs");
assert   = require("assert");
gutil    = require("gulp-util");
prompt   = require("prompt");
teenypng = require("./lib/gulp-teenypng");

describe("gulp-teenypng", function () {

    var defaults;

    prompt.start();

    before(function (done) {

        this.timeout(0);

        prompt.get({
            name: "apikey",
            description: "Enter your TinyPNG API Key",
            type: "string",
            required: true
        }, function (err, result) {

            if (err) {
                throw err;
            }

            // Merge user data with defaults to make
            defaults = result;
            done();
        });
    });

    // Test that PNG files to get smaller
    it("should reduce file size", function (done) {
        teenypng(defaults).on("data", function (file) {
            assert(file.contents.length < fs.statSync("./image.png").size);
            done();
        }).write(new gutil.File({
            path: "./image.png",
            contents: fs.readFileSync("./image.png")
        }));
    });
});

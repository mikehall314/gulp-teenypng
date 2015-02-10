# gulp-teenypng

Reduce PNG + JPG images with [teenypng](https://github.com/mikehall314/teenypng) and [gulp](http://gulpjs.com/)

## Install

Install with [npm](https://npmjs.org/package/gulp-teenypng)

```bash
$ npm install --save-dev gulp-teenypng
```

## Example

```js
"use strict";

var gulp, teenypng;

gulp     = require('gulp');
teenypng = require('gulp-teenypng');

gulp.task('default', function () {
    gulp.src('src/image.png')
        .pipe(teenypng({ "apikey": "XXXXXXXXXX" }))
        .pipe(gulp.dest('dist'));
});
```

## Settings

* `apikey`: Developer API key from tinypng.com (required)

Published under the [MIT License](http://opensource.org/licenses/MIT).

'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files']
});

var _ = require('lodash');

gulp.task('dev-copy-assets', ['inject'], function () {
    return gulp
        .src([
            conf.paths.src + '/**/*',
            path.join(conf.paths.tmp, '/serve/**/*')
        ])
        .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-release');
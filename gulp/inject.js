'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function () {
    browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/**/*.css')
    ], {
            read: false
        });

    var injectScripts = gulp.src([
        path.join(conf.paths.src, '/assets/js/**/*.js'),
        path.join(conf.paths.src, '/app/**/*.module.js'),
        path.join(conf.paths.src, '/app/**/*.js'),
        path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
        path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
    ])
        /*.pipe($.angularFilesort())*/
        .on('error', conf.errorHandler('AngularFilesort'));

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    var libInjectOptions = {
        starttag: '<!-- inject:lib:{{ext}} -->',
        addRootSlash: false
    };

    var injectLibStyles = gulp.src(conf.libSrc.style, { read: false });

    var injectLibScripts = gulp.src(conf.libSrc.script, { read: false });

    return gulp.src(path.join(conf.paths.src, '/index.html'))
        .pipe($.inject(injectLibStyles, libInjectOptions))
        .pipe($.inject(injectLibScripts, libInjectOptions))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe($.replace('node_modules/', '../node_modules/'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    src: 'src',
    dist: 'release',
    devDist: 'dev-release',
    tmp: 'tmp',
    e2e: 'e2e'
};

exports.libSrc = {
    style: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
    ],
    script: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
    ]
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'), //CSS压缩
    minifyHTML = require("gulp-minify-html"), // html 压缩
    uglify = require('gulp-uglify'), //js压缩插件
    concat = require('gulp-concat'), // 文件合并
    rename = require('gulp-rename'), // 重命名
    del = require('del'), // 文件删除
    livereload = require('gulp-livereload'), // 实时刷新
    sass = require('gulp-ruby-sass'), // scss 编译
    ngAnnotate = require('gulp-ng-annotate'), // ng压缩
    ngmin = require('gulp-ngmin'), // ng压缩
    order = require('gulp-order'), // gulp文件排序
    gulpSequence = require('gulp-sequence').use(gulp), // task任务顺序执行
    revCollector = require('gulp-rev-collector'), //html 替换文件路径
    rev = require('gulp-rev'); // 文件hash版本号

gulp.task('default', function() {
    return gulp.start('sequence');
});

gulp.task('sequence', function(cb) {
    return gulpSequence('minifycss', 'sass', 'minifyjs', 'rev')(cb);
});

gulp.task('rev', function() {
    return gulp.src(['rev/**/*.json', 'src/**/*.html'])
        .pipe(revCollector({
            // replaceReved: true,
            // dirReplacements: {
            //     'js/': 'js/'
            // }
        }))
        // .pipe(minifyHTML({
        //     empty: true,
        //     spare: true
        // }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('minifyjs', function() {
    return gulp.src('src/**/*.js')
        //.pipe(gulp.dest('dist/'))
        //.pipe(gulp.dest('dist/'))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(ngAnnotate())
        .pipe(ngmin({
            dynamic: false
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(concat('build.js'))
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

gulp.task('minifycss', function() {
    return gulp.src('src/!(lib)/**/*.css')
        .pipe(gulp.dest('dist/'))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

gulp.task('sass', function() {
    return sass('src/**/*.scss', {
            noCache: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


gulp.task('clean', function(cb) {
    return del(['dist', 'rev'], cb)
});

gulp.task('watch', function() {
    // gulp.watch('src/**/*.*', ['default']);
    return gulp.watch('src/**/*.*', ['default']);
});
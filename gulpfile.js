var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'), //CSS压缩
    minifyHTML = require("gulp-minify-html"), // html 压缩
    uglify = require('gulp-uglify'), //js压缩插件
    concat = require('gulp-concat'), // 文件合并
    rename = require('gulp-rename'), // 重命名
    del = require('del'), // 文件删除
    //livereload = require('gulp-livereload'), // 实时刷新
    sass = require('gulp-ruby-sass'), // scss 编译
    ngAnnotate = require('gulp-ng-annotate'), // ng压缩
    ngmin = require('gulp-ngmin'), // ng压缩
    order = require('gulp-order'), // gulp文件排序
    gulpSequence = require('gulp-sequence').use(gulp), // task任务顺序执行
    revCollector = require('gulp-rev-collector'), //html 替换文件路径
    rev = require('gulp-rev'), // 文件hash版本号
    sourcemaps = require('gulp-sourcemaps'), // map文件
    postcss = require('gulp-postcss'), // 解析css
    autoprefixer = require('autoprefixer'); // css 后缀

var browserSync = require('browser-sync').create(); // 浏览器自动刷新

gulp.task('default', function() {
    return gulp.start('browserSync');
});

gulp.task('build', function(cb) {
    return gulpSequence('minifycss', 'sass', 'minifyjs', 'rev')(cb);
});

gulp.task('dev', function(cb) {
    return gulpSequence('devCss', 'devSass', 'devJs', 'rev')(cb);
});

gulp.task('devCss', function() {
    return gulp.src(['src/!(lib)/**/*.css'])
        .pipe(rev())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

gulp.task('devSass', function() {
    return sass('src/!(lib)/**/*.scss', {
            noCache: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(rev())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

gulp.task('devJs', function() {
    return gulp.src(['rev/**/*.json', 'src/!(lib)/**/*.js'])
        .pipe(revCollector({}))
        .pipe(order([
            'src/config/app.module.js'
        ]))
        .pipe(ngAnnotate())
        .pipe(ngmin({
            dynamic: false
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

gulp.task('rev', function() {
    return gulp.src(['rev/**/*.json', 'src/index.html', 'src/!(lib)**/**/*.html'])
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
    return gulp.src(['src/!(lib)/**/*.js'])
        .pipe(order([
            'src/config/app.module.js'
        ]))
        //.pipe(gulp.dest('dist/'))
        //.pipe(gulp.dest('dist/'))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(ngAnnotate())
        .pipe(ngmin({
            dynamic: false
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(concat('build.js'))
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

gulp.task('minifycss', function() {
    return gulp.src('src/!(lib)/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(rev())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

gulp.task('sass', function() {
    return sass('src/!(lib)/**/*.scss', {
            noCache: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(rev())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


gulp.task('clean', function(cb) {
    return del(['dist', 'rev'], cb)
});

gulp.task('watch', function() {
    // gulp.watch('src/**/*.*', ['default']);
    return gulp.watch('src/**/*.*', ['dev']);
});

gulp.task('browserSync', ['dev'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        port: 9999
    });
    // gulp.watch('src/**/*.*', ['dev']).on('change', browserSync.reload);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
});
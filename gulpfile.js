var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss', './scss/*.scss', './sites/all/themes/the208wrapshop/css/sass/*.scss']

};

gulp.task('default', ['sass', 'sassx']);

gulp.task('sassx', function(done) {

 gulp.src('./sites/all/themes/the208wrapshop/css/sass/*.scss')
   .pipe(sass({
        errLogToConsole: true
   }))
   .pipe(gulp.dest('./sites/all/themes/the208wrapshop/css/'))
   .pipe(minifyCss({
        keepSpecialComments: 0
   }))
   .pipe(rename({ extname: '.min.css' }))
   .pipe(gulp.dest('./sites/all/themes/the208wrapshop/css/'))
   .on('end', done);
});


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass', 'sassx']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


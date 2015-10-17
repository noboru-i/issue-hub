var babel = require('gulp-babel');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

gulp.task(
  'compile',
  [
    'compile-es6',
    'compile-html',
    'compile-css',
    'compile-font'
  ]
);

gulp.task(
  'compile-es6',
  function () {
    return gulp.src('src/**/*.js')
      .pipe(plumber())
      .pipe(babel())
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile-html',
  function () {
    gulp.src('src/**/*.html')
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile-css',
  function () {
    gulp.src('src/**/*.css')
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile-font',
  function () {
    gulp.src(['src/**/*.eot', 'src/**/*.svg', 'src/**/*.ttf', 'src/**/*.woff'])
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'watch',
  function () {
    gulp.watch('src/**/*', ['compile']);
  }
);

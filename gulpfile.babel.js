import pkg from './package.json';
import babel from 'gulp-babel';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import packager from 'electron-packager';

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

gulp.task('package:darwin', ['compile'], (done) => {
  packager({
    dir: '.',
    out: 'packages/v' + pkg.version,
    name: pkg.name,
    arch: 'x64',
    platform: 'darwin',
    version: '0.34.0',
    overwrite: true,
    ignore: [
      '/packages',
      '/src'
    ]
  }, () => {
    done();
  });
});

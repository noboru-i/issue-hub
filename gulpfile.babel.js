import pkg from './package.json';
import babel from 'gulp-babel';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import postcssNested from 'postcss-nested';
import packager from 'electron-packager';

gulp.task(
  'compile',
  [
    'compile:es6',
    'compile:html',
    'compile:css',
    'compile:font'
  ]
);

gulp.task(
  'compile:es6',
  () => {
    return gulp.src('src/**/*.js')
      .pipe(plumber())
      .pipe(babel())
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile:html',
  () => {
    gulp.src('src/**/*.html')
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile:css',
  () => {
    gulp.src('src/**/*.css')
      .pipe( postcss([ postcssNested ]) )
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile:font',
  () => {
    gulp.src(['src/**/*.eot', 'src/**/*.svg', 'src/**/*.ttf', 'src/**/*.woff'])
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'watch',
  () => {
    gulp.watch('src/**/*', ['compile']);
  }
);

gulp.task(
  'package:darwin',
  ['compile'],
  (done) => {
    let devDependencies = Object.keys(pkg.devDependencies);
    packager({
      dir: '.',
      out: 'packages/v' + pkg.version,
      name: pkg.name,
      arch: 'x64',
      platform: 'darwin',
      version: '0.34.0',
      overwrite: true,
      ignore: [
        '/.DS_Store',
        '/.eslintrc',
        '/.gitignore',
        '/README.md',
        '/gulpfile.babel.js',
        '/node_modules/.bin($|/)',
        '/packages($|/)',
        '/src($|/)'
      ].concat(devDependencies.map(function(name) { return `/node_modules/${name}($|/)`; }))
    }, () => {
      done();
    });
  }
);

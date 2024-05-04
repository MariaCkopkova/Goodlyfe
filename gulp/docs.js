const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const pugs = require('gulp-pug');
const webpHTML = require('gulp-webp-html');


// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');
//const autoprefixer = require('autoprefixer');

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

gulp.task('clean:docs', function (done) {
  if (fs.existsSync('./docs/')) {
    return gulp.src('./docs', { read: false })
    .pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSetting = {
  prefix: '@@',
  basepath: '@file',
};

gulp.task('html:docs', function () {
  return gulp
    .src('./src/pug/pages/*.pug')
    .pipe(changed('./docs/'))
    .pipe(plumber(plumberNotify('PUG')))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(gulp.dest('./docs/'));
});

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  };
};

gulp.task('pug:docs', function () {
  return gulp
    .src('./src/pug/pages/*.pug')
    .pipe(changed('./docs/'))
    .pipe(plumber(plumberNotify('PUG')))
    .pipe(
      pugs({
        pretty: true,
      })
    )
    .pipe(htmlclean())
    .pipe(webpHTML())
    .pipe(gulp.dest('./docs/'));
});

gulp.task('sass:docs', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./docs/css/'))
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer(
      {
        overrideBrowserslist: ['last 16 versions'],
        cascade: false
        //browsersList: [
        //  "cover 99.5%"

        //],
      }
    ))
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css/'));
});


gulp.task('images:docs', function () {
  return gulp
    .src('./src/img/**/*')
    .pipe(changed('./docs/img'))
    .pipe(webp())
    .pipe(gulp.dest('./docs/img/'))
    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed('./docs/img'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./docs/img/'));
});

gulp.task('fonts:docs', function () {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./docs/fonts'))
    .pipe(gulp.dest('./docs/fonts/'));
});
// Копируем любые файлы(напр: pdf)
gulp.task('files:docs', function () {
  return gulp
    .src('./src/files/**/*')
    .pipe(changed('./docs/files'))
    .pipe(gulp.dest('./docs/files/'));
});

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task('js:docs', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./docs/js'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js'));
});

gulp.task('server:docs', function () {
  return gulp.src('./docs/').pipe(server(serverOptions));
});

const gulp = require("gulp");
//const fileInclude = require("gulp-file-include");
const pugs = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
var sassGlob = require('gulp-sass-glob');
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const sourceMaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");

gulp.task("clean:dev", function (done) {
  if (fs.existsSync("./build/")) {
    return gulp.src("./build", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSetting = {
  prefix: "@@",
  basepath: "@file",
};

gulp.task("html:dev", function () {
  return gulp
    //.src("./src/**.pug")
    .src("./src/pages/**.pug")
    .pipe(changed('./build/'))
    .pipe(plumber(plumberNotify("PUG")))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(gulp.dest("./build/"));
});

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

gulp.task("pug:dev", function () {
  return gulp
    .src("./src/pug/pages/*.pug")
    .pipe(changed('./build/'))
    .pipe(plumber(plumberNotify("PUG")))
    .pipe(
      pugs({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./build/"));
});

gulp.task("sass:dev", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(changed('./build/css/'))
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("images:dev", function () {
  return gulp
    .src("./src/img/**/*")
    .pipe(changed('./build/img'))
   // .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./build/img/"));
});

// Копируем шрифты из папки fonts в папку dist/fonts
gulp.task("fonts:dev", function () {
  return gulp.src("./src/fonts/**/*")
  .pipe(changed('./build/fonts'))
  .pipe(gulp.dest("./build/fonts/"));
});
// Копируем любые файлы(напр: pdf)
gulp.task("files:dev", function () {
  return gulp.src("./src/files/**/*")
  .pipe(changed('./build/files'))
  .pipe(gulp.dest("./build/files/"));
});

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task("js:dev", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed('./build/js'))
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel())
    .pipe(webpack(require("./../webpack.config.js")))
    .pipe(gulp.dest("./build/js"));
});

gulp.task("server:dev", function () {
  return gulp.src("./build/").pipe(server(serverOptions));
});

gulp.task("watch:dev", function () {
  gulp.watch("./src/scss/**/*scss", gulp.parallel("sass:dev"));
  gulp.watch("./src/pug/**/*.pug", gulp.parallel("pug:dev"));
  gulp.watch("./src/img/**/*", gulp.parallel("images:dev"));
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts:dev"));
  gulp.watch("./src/files/**/*", gulp.parallel("files:dev"));
  gulp.watch("./src/js/**/*js", gulp.parallel("js:dev"));
});



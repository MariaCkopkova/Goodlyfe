const gulp = require('gulp');

// Tasks
require('./gulp/docs.js');
require('./gulp/dev.js');

gulp.task(
   'docs',
   gulp.series(
     'clean:docs',
     gulp.parallel('pug:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
     gulp.parallel('server:docs')
   )
 );
gulp.task(
   'default',
   gulp.series(
     'clean:dev',
     gulp.parallel('pug:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
     gulp.parallel('server:dev', 'watch:dev')
   )
 );
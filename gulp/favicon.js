var gulp = require('gulp');
var changed = require('gulp-changed');

gulp.task('favicon', function () {
  return gulp.src('src/favicon.ico')
    .pipe(changed('staging/*.ico'))
    .pipe(gulp.dest('staging'));
});

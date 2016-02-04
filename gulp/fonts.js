var gulp = require('gulp');
var changed = require('gulp-changed');

gulp.task('fonts', function () {
  return gulp.src('src/fonts/*.ttf')
    .pipe(changed('staging/fonts'))
    .pipe(gulp.dest('staging/fonts'));
});

var gulp = require('gulp');
var changed = require('gulp-changed');

gulp.task('vendor:css', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
      .pipe(changed('staging/css'))
      .pipe(gulp.dest('staging/css'));
});

gulp.task('vendor:fonts', function() {
  return gulp.src([
    'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
  ])
    .pipe(changed('staging/fonts'))
    .pipe(gulp.dest('staging/fonts'));
});

gulp.task('vendor', ['vendor:css', 'vendor:fonts']);

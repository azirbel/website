var gulp = require('gulp');

gulp.task('vendor', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('staging/css'));
});

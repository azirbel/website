var gulp = require('gulp');

gulp.task('vendor:css', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('staging/css'));
});

gulp.task('vendor:fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/fontawesome-webfont.woff2')
        .pipe(gulp.dest('staging/fonts'));
});

gulp.task('vendor', ['vendor:css', 'vendor:fonts']);

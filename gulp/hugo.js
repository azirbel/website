var gulp = require('gulp');
var exec = require('child_process').execSync;
var gutil = require('gulp-util');
var path = require('path');
var del = require('del');

function hugo(isProduction) {
    var src = path.join(process.cwd(), 'hugo');
    var dst = path.join(process.cwd(), 'public');

    gutil.log('src: ' + src + ' dst: ' + dst);

    var cmd = ''
    if (isProduction) {
      cmd = 'hugo --config=hugo/prod-config.toml -s ' + src + ' -d ' + dst;
    } else {
      cmd = 'hugo --config=hugo/dev-config.toml -s ' + src + ' -d ' + dst;
    }

    var result = exec(cmd, {encoding: 'utf-8'});
    gutil.log('hugo: \n' + result);
}

gulp.task('hugo:draft', function() {
    hugo(false);
});

gulp.task('hugo:all', ['revision'], function() {
    hugo(false);
});

gulp.task('hugo:delete', ['revision'], function() {
    var dst = path.join(process.cwd(), 'public');
    del.sync(dst);
});

gulp.task('hugo:live', ['hugo:delete'], function() {
    hugo(true);
});

var gulp = require('gulp'),
git = require('gulp-git'),
bump = require('gulp-bump'),
filter = require('gulp-filter'),
tag_version = require('gulp-tag-version');

require('load-common-gulp-tasks')(gulp);

function incTag(importance) {
    return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bumps package version'))
    .pipe(filter('package.json'))
    .pipe(tag_version());
}

function inc(importance) {
    return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bumps package version'))
    .pipe(filter('package.json'))
    .pipe(tag_version());
}


gulp.task('prerelease', 'makes v0.2.1 → v0.2.1-1', ['lint', 'felint', 'test', 'nice-package'], function() { return inc('prerelease'); });
gulp.task('patch', 'makes v0.1.0 → v0.1.1', ['test', 'lint', 'nice-package', 'felint'], function() { return incTag('patch'); });
gulp.task('feature', 'makes v0.1.1 → v0.2.0', ['lint', 'felint', 'test', 'nice-package'], function() { return incTag('minor'); });
gulp.task('release', 'makes v0.2.1 → v1.0.0', ['lint', 'felint', 'test', 'nice-package'], function() { return incTag('major'); });

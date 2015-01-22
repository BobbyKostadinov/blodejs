var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    gulpNodemon = require('gulp-nodemon');

require('load-common-gulp-tasks')(gulp, {
    includeUntested: false,
    paths: {
        lint: [
            './*.js',
            '!server.js',
            './lib/**/*.js',
            './test/**/*.js',
            '!./lib/*/view/*.min.js',
            '!./lib/**/node_modules/**/*.js',
            '!./lib/**/target/**/*.js',
            '!./lib/**/node_modules/*.js',
        ],
        felint: [
            './lib/*/content/scripts/*.js',
            '!./lib/*/content/scripts/*.min.js',
        ],
        cover: [
          './lib/**/lib/*.js',
        ],
        test: [
          './test/**/*.js',
          './lib/**/test/**/*.js'
        ]
    }
});


function inc(importance) {
    return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bumps package version'))
    .pipe(filter('package.json'))
    .pipe(tag_version());
}
gulp.task('start-watch', function () {

    gulpNodemon({
        script: 'server.js',
        ext: 'js',
    })
    .on('change')
    .on('restart', function () {
        console.log('restarted!');
    });
});

function incNoTag(importance) {
    return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bumps package version'))
    .pipe(filter('package.json'));
}

gulp.task('prerelease', 'makes v0.2.1 → v0.2.1-1', ['lint', 'felint', 'test-cover', 'nice-package'], function() { return incNoTag('prerelease'); });
gulp.task('patch', 'makes v0.1.0 → v0.1.1', ['test-cover', 'lint', 'nice-package', 'felint'], function() { return inc('patch'); });
gulp.task('feature', 'makes v0.1.1 → v0.2.0', ['lint', 'felint', 'test-cover', 'nice-package'], function() { return inc('minor'); });
gulp.task('release', 'makes v0.2.1 → v1.0.0', ['lint', 'felint', 'test-cover', 'nice-package'], function() { return inc('major'); });

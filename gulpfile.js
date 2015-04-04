var gulp = require('gulp'),
  nodemon = require('./gulp/nodemon'),
  jsx = require('./gulp/jsx'),
  sass = require('./gulp/sass'),
  clean = require('./gulp/clean'),
  git = require('gulp-git'),
  bump = require('gulp-bump'),
  filter = require('gulp-filter'),
  tag_version = require('gulp-tag-version'),
  gulpNodemon = require('gulp-nodemon'),
  isparta = require('isparta');

gulp.task('build', ['jsx', 'sass']);
gulp.task('dev', ['jsx-watch', 'sass-watch', 'nodemon']);

gulp.task('jsx', jsx.toJs);
gulp.task('jsx-watch', jsx.toJsWatch);

gulp.task('sass', sass.toCss);
gulp.task('sass-watch', sass.toCssWatch);

gulp.task('nodemon', nodemon.start);

gulp.task('clean', clean.clean);


require('load-common-gulp-tasks')(gulp, {
    includeUntested: true,
    istanbul: {
      instrumenter: isparta.Instrumenter
    },
    jshintrc: {
      server: ".jshintrc"
    },
    paths: {
        lint: [
            './*.js',
            '!server.js',
            '!./lib/**/target/**/*.js',
            '!./lib/components/**'
        ],
        felint: [
            './lib/*/content/scripts/*.js',
            '.!/lib/components/*'
        ],
        cover: [
          './lib/**/*.js',
          '!./lib/**/*-test.js',
          '!./lib/components/**'
        ],
        test: [
          './test/**/*.js',
          '!./lib/components/**',
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

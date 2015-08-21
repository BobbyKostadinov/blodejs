var gulp = require('gulp'),
  gutil = require('gulp-util'),
  buffer = require('gulp-buffer'),
  source = require('vinyl-source-stream'),
  watchify = require('watchify'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify');

exports.toJs = function (sourcePath, destFilename) {
  return toJs.bind(null, sourcePath, destFilename);
};

exports.toJsWatch = function (sourcePath, destFilename) {
  return toJsWatch.bind(null, sourcePath, destFilename);
};

function toJs(sourcePath, destFilename) {
  return createStream(createBundler({
      file: sourcePath,
      isDebug: false
    }), destFilename)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
}

function toJsWatch(sourcePath, destFilename) {
  var bundler = createBundler({
      file: sourcePath,
      isDebug: true
    });

  function createBundlerStream() {
    return createStream(bundler, destFilename)
      .pipe(gulp.dest('./dist'));
  }

  bundler = watchify(bundler);
  bundler.on('update', createBundlerStream);
  bundler.on('time', function (time) {
    console.log(destFilename + ' built in: %dms', time);
  });

  return createBundlerStream();
}

function createBundler(config) {
  return browserify(config.file, {
    cache: {},
    packageCache: {},
    fullPaths: true,
    transform: [['reactify', {'es6': true}]],
    debug: config.isDebug
  });
}

function createStream(bundler, destFilename) {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(destFilename));
}

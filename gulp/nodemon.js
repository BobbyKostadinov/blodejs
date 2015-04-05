var spawn = require('child_process').spawn,
    path = require('path'),
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

exports.start = start;

function start() {
  var config = {
    execMap: {
      js: "node --harmony",
    },
    script: 'server.js',
    watch: ['server.js', 'dist/**/*.js', 'lib/resources'],

    stdout: false
  };

  return nodemon(config)
    .on('readable', function() {
      var bunyan = spawn('node', [path.join(__dirname, '/../node_modules/bunyan/bin/bunyan'), '-o', 'short'], { stdio: ['pipe', process.stdout, process.stderr] });
      this.stdout.pipe(bunyan.stdin);
      this.stderr.pipe(bunyan.stdin);
    });
}

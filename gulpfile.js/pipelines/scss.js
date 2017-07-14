var postcss = require('gulp-postcss');
var syntax = require('postcss-scss');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var gulpif = require('gulp-if');

// настройки нотификации
var defaultNotifier = {
  sound: true,
  title: 'insales-template-builder',
  message: ''
}

function scssStream(stream) {
  return stream
    .pipe(postcss().on('error',  function (err) {
      defaultNotifier.message = err.name;
      notifier.notify(defaultNotifier);
      gutil.log(err.message);
    }))
    .pipe(gulpif(stream.isPaused(), stream.resume()))
}

module.exports = scssStream;

var image = require('gulp-image');
var gulpif = require('gulp-if');
var settings = require('../config/settings.json');

function imageStream(stream) {
  return stream
    .pipe(gulpif(settings.imageMin, image()))
    .pipe(stream.resume())
}

module.exports = imageStream;

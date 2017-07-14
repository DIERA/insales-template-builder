var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var writeFile = require('write');
var rename = require("gulp-rename");
var paths = require('../config/paths.json');
var Promise = require('promise');


// кастомный чейнинг gulp плагинов
var chain = require('gulp-chain');
var imagePipeline = require('../pipelines/image.js');
var imageStream = chain(function(stream) {
	return imagePipeline(stream);
});

gulp.task('deploy:media', function (cb) {
  return new Promise(function (resolve, reject) {
    gulp.src(paths.media.paths)
      .pipe(rename(function (_path) {
        _path.dirname = "";
      }))
      .pipe(imageStream())
      .pipe(gulp.dest(paths.theme.media))
      .on('end', function() {
        resolve();
      });
    });
});

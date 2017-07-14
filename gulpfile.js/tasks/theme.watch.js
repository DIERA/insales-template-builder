var gulp = require('gulp');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var paths = require('../config/paths.json');
var settings = require('../config/settings.json');
var uploader = require('../config/uploader.json');
var contents = require('../help/contents.js');
var writeFile = require('write');
var glob = require("glob");
var gap = require('gulp-append-prepend');
var image = require('gulp-image');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

var variablesInclude = '';
if (settings.styles === 'scss') {
  variablesInclude = contents.getVariables();
}

// кастомный чейнинг gulp плагинов
var scssPipeline = require('../pipelines/scss.js');
var chain = require('gulp-chain');
var scssStream = chain(function(stream) {
	return scssPipeline(stream);
});
var imagePipeline = require('../pipelines/image.js');
var imageStream = chain(function(stream) {
	return imagePipeline(stream);
});

// Insales Uploader
var InsalesUploader = require('insales-uploader');
var InsalesUp = new InsalesUploader(uploader)

gulp.task('theme:watch', ['theme:watch:components', 'theme:watch:layouts', 'theme:watch:plugins', 'theme:watch:config', 'theme:watch:bundles:css', 'theme:watch:bundles_variable:css', 'theme:watch:bundles:js', 'theme:watch:media', 'theme:watch:fonts', 'uploader:watch'],function () {
});

gulp.task('theme:watch:fonts', function () {

    watch(paths.fonts.style, function () {
      gulp.src(paths.fonts.style)
        .pipe(concat('fonts.scss'))
        .pipe(gulp.dest(paths.theme.media))
    })

    watch(paths.fonts.path, { ignoreInitial: true })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.media))
});

gulp.task('theme:watch:components', function () {

    var isConcatStyles = settings.build.css.theme.concat;
    var isConcatScripts = settings.build.js.theme.concat;
    var styles = paths.components.styles;

    if (isConcatStyles) {
      watch(styles, function () {
        gulp.src(styles)
          .pipe(scssStream())
          .pipe(concat('theme.scss'))
          .pipe(gap.prependText(variablesInclude))
          .pipe(gulp.dest(paths.theme.media))
      })
    }else{
      watch(styles, { ignoreInitial: true })
        .pipe(scssStream())
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gap.prependText(variablesInclude))
        .pipe(gulp.dest(paths.theme.media));
    }

    if (isConcatScripts) {
      watch(paths.components.scripts, function () {
        gulp.src(paths.components.scripts)
          .pipe(concat('theme.js'))
          .pipe(gulp.dest(paths.theme.media))
      })
    }else{
      watch(paths.components.scripts, { ignoreInitial: true })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.media));
    }

    watch(paths.components.liquid, { ignoreInitial: true })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.snippets));
});

gulp.task('theme:watch:layouts', function () {
  var isConcatStyles = settings.build.css.layouts.concat;
  var isConcatScripts = settings.build.js.layouts.concat;
  var styles = paths.layouts.styles;

  if (isConcatStyles) {
    watch(styles, function () {
      gulp.src(styles)
        .pipe(scssStream())
        .pipe(concat('layouts.scss'))
        .pipe(gap.prependText(variablesInclude))
        .pipe(gulp.dest(paths.theme.media))
    })
  }else{
    watch(styles, { ignoreInitial: true })
        .pipe(scssStream())
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gap.prependText(variablesInclude))
        .pipe(gulp.dest(paths.theme.media));
  }
  if (isConcatScripts) {
    watch(paths.layouts.scripts, function () {
      gulp.src(paths.layouts.scripts)
        .pipe(concat('layouts.js'))
        .pipe(gulp.dest(paths.theme.media))
    })
  }else{
    watch(paths.layouts.scripts, { ignoreInitial: true })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.media));
    }
    watch(paths.layouts.liquid, { ignoreInitial: true })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.templates));
});

gulp.task('theme:watch:plugins', function () {
    watch(paths.plugins.styles, { ignoreInitial: true }, function () {
      glob(paths.plugins.styles, {}, function (er, files) {
        var styles = [];
        _.forEach(files, function (_file) {
          var _fileParse = path.parse(_file);
          styles.push( _fileParse.base )
        })

        var contentStyle = contents.getStylesFile(styles);
        setTimeout(function () {
          writeFile(paths.theme.media + '/plugins.scss', contentStyle, function (err) {
            if (err) {
              console.log('Ошибка при генерации стилей');
            }
          });
        }, 500)
      })

    })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.media))


    watch(paths.plugins.scripts, { ignoreInitial: true }, function () {
      glob(paths.plugins.scripts, {}, function (er, files) {
        var scripts = [];
        _.forEach(files, function (_file) {
          var _fileParse = path.parse(_file);
          scripts.push( _fileParse.base )
        })

        var contentScripts = contents.getScriptFile(scripts);
        writeFile(paths.theme.media + '/plugins.js', contentScripts, function (err) {
          if (err) {
            console.log('Ошибка при генерации стилей');
          }
        });
      });
    }).pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.media))
});

gulp.task('theme:watch:config', function () {
    watch(paths.config.configs, { ignoreInitial: true })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(gulp.dest(paths.theme.config));
});

gulp.task('theme:watch:media', function () {
    watch(paths.media.paths, { ignoreInitial: true })
        .pipe(rename(function (_path) {
          _path.dirname = "";
        }))
        .pipe(imageStream())
        .pipe(gulp.dest(paths.theme.media));
});

gulp.task('theme:watch:bundles:css', function () {

  var _css = []
  _css.push( path.normalize( paths.bundles.css + '/*/*.*css' ) );

  return watch(_css, function (vinyl) {
    var _bundlePath = path.normalize( vinyl.dirname + '/*.*css' );
    var _bundleName = _.last( _.split(vinyl.dirname, path.sep) ) + '.scss';
    gulp.src(_bundlePath)
      .pipe(scssStream())
      .pipe(concat(_bundleName))
      .pipe(gap.prependText(variablesInclude))
      .pipe(gulp.dest(paths.theme.media))
    });
});

gulp.task('theme:watch:bundles_variable:css', function () {
  var variablesScss = [];

  _.forEach(paths.scss.all, function (_path) {
    variablesScss.push(path.normalize( _path + '*.*' ) );
  })

  watch(variablesScss, { ignoreInitial: true })
      .pipe(rename(function (_path) {
        _path.dirname = "";
      }))
      .pipe(gulp.dest(paths.theme.media));
});

gulp.task('theme:watch:bundles:js', function () {
  var _js = path.normalize( paths.bundles.js + '/*/*.*js' );
  return watch(_js, function (vinyl) {
    var _bundlePath = path.normalize( vinyl.dirname + '/*.*js' );
    var _bundleName = _.last( _.split(vinyl.dirname, path.sep) ) + '.js';

    gulp.src(_bundlePath)
      .pipe(concat(_bundleName))
      .pipe(gulp.dest(paths.theme.media))
    });
});

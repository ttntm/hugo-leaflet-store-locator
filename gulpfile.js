var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    concatCss = require('gulp-concat-css'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('procss', function () {
  return gulp.src('./src/css/page.css')
    .pipe(postcss([
      require('css-mqpacker'),
      ]))
    .pipe(concatCss('page.css'))
    .pipe(cssnano({
      reduceIdents: false,
      svgo: false,
      discardComments: {removeAll: true},
      zindex: false
    }))
    .pipe(gulp.dest('./static/css/'));
});

gulp.task('leaflet-css', function () {
  return gulp.src('./src/css/leaflet.bundle.css')
    .pipe(postcss([
      require('css-mqpacker'),
      ]))
    .pipe(concatCss('leaflet.bundle.css'))
    .pipe(cssnano({
      reduceIdents: false,
      svgo: false,
      discardComments: {removeAll: true}
    }))
    .pipe(gulp.dest('./static/css/'));
});

gulp.task('leafletjs', function () {
  return gulp.src(['./src/js/leaflet.js','./src/js/leaflet.markercluster.js','./src/js/L.Control.Locate.js'])
  .pipe(concat('leaflet.bundle.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./static/js/'));
});

gulp.task('watch-css', function() {
  gulp.watch('./src/css/*', ['procss'])
});

gulp.task('build-css', ['procss','leaflet-css']);

gulp.task('build-js', ['leafletjs']);

gulp.task('deploy', ['build-css', 'build-js']);
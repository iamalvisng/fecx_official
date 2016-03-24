var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var $           = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/bootstrap-sass/assets/stylesheets'
  // 'src/scss/vendors/owl.carousel'
];

var jspPaths = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
];

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./dist"
    },
    port: 8000,
    open: true
  });
});

gulp.task('reload', function() {
  browserSync.reload();
});


gulp.task('images', function() {
	gulp.src('src/images/**/*')
	.pipe($.imagemin({
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest('dist/images'));
});


gulp.task('scripts', function() {
  return gulp.src([
		'src/scripts/*.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    // 'bower_components/smooth-scroll/dist/js/smooth-scroll.js'
	])
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['scripts', 'sass', 'browser-sync'], function() {
  gulp.watch(['src/scripts/**/*.js'], ['scripts']);
  gulp.watch(['src/scss/**/*.scss', 'dist/css/**/*.css'], ['sass']);
  gulp.watch('dist/*.html', ['reload']);
});

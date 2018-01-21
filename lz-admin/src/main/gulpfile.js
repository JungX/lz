var gulp = require('gulp'),
	templates = require('gulp-angular-templatecache'),
	minifyHTML = require('gulp-minify-html'),
	minifyCSS = require('gulp-clean-css'),
	jshint = require('gulp-jshint'),
	del = require('del'),
	rjs = require('gulp-requirejs'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace'),
	connect = require('gulp-connect'),
	fs = require('fs'),
	sequence = require('gulp-sequence');

gulp.task('default', sequence('clean', 'templates', 'copy', 'jshint', 'compile', 'minifyCSS'));

gulp.task('clean', function () {
	del(['webapp/build/**/*']);
});

gulp.task('copy', function () {
	gulp.src([
		'webapp/bower_components/requirejs/require.js'
	]).pipe(gulp.dest('webapp/build/'));

	var paths = [
		'webapp/images/**',
		'webapp/fonts/**',
		'webapp/templates/**'
	];
	return gulp.src(paths, {base: 'webapp/'})
		.pipe(gulp.dest('webapp/build/'));
});

gulp.task('minifyCSS', function () {
	gulp.src('webapp/css/styles.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('webapp/build/css/'));
});

gulp.task('compile', function () {
	return gulp.src('webapp/bower_components/almond/almond.js')
		.pipe(gulp.dest('webapp/build'))
		.pipe(rjs({
			out: 'require.config.js',
			baseUrl: 'webapp/js/',
			name: 'require.config',
			mainConfigFile: 'webapp/js/require.config.js'
		}))
		.pipe(gulp.dest('webapp/build'))
		.on('end', function () {
			gulp.src('webapp/build/*.js')
				.pipe(concat('ad.js'))
				//.pipe(uglify({mangle: false}))
				.pipe(gulp.dest('webapp/build/js/'))
				.on('end', function () {
					del(['webapp/build/almond.js', 'webapp/build/require.config.js', 'webapp/build/require.js']);

					gulp.src([
						'webapp/templates/'
					]).pipe(gulp.dest('webapp/build/'));

				});
		});
});

gulp.task('templates', function () {
	return gulp.src('webapp/js/modules/**/*.html')
		.pipe(minifyHTML({
			quotes: true,
			empty: true
		}))
		.pipe(templates({
			standalone: true,
			filename: 'template.js',
			module: 'template',
			transformUrl: function (url) {
				return url.replace(/^/, 'js/modules/');
			}
		}))
		.pipe(gulp.dest('webapp/js'));
});

gulp.task('jshint', function () {
	var stream = gulp.src('webapp/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(require('jshint-stylish')));
	return stream;
});
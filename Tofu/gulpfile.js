const gulp = require("gulp"),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require("gulp-jshint"),
	sass = require("gulp-dart-sass"),
	cssnano = require("gulp-cssnano"),
	babel = require("gulp-babel"),
	cache = require("gulp-cache"),
	del = require("del"),
	config = require("./Config"),
	sourcemaps = require("gulp-sourcemaps"),
	root = require("app-root-path"),
	browserSync = require("browser-sync")

const imagemin = import("gulp-imagemin")

gulp.task("js", () =>
{
	if (config.general.development_mode) {
		return gulp.src(root + '/Resources/JS/*.js')
			.pipe(sourcemaps.init({largeFile: true}))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(babel())
			.pipe(uglify())
			.pipe(concat('bundle.js'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(root + '/Public/JS'));
	}
	else
		return gulp.src(root + '/Resources/JS/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(babel())
			.pipe(uglify())
			.pipe(concat('bundle.js'))
			.pipe(gulp.dest(root + '/Public/JS'));
})

gulp.task("sass", () => {
	return gulp.src(root +'/Resources/{SASS,CSS}/*.{css,sass,scss}')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(root +"/Public/CSS"))
})

gulp.task("images", () => {
	return gulp.src(root +"/Resources/Images/*.{png,jpg,gif,svg}")
		.pipe(cache(imagemin({interlaced: true})))
		.pipe(gulp.dest(root +"/Public/Images"))
})
gulp.task("clean", async() => {
	del.sync("Public")
	await cache.clearAll()
})

gulp.task("browserSync", async () => {
	browserSync({
		port: 8001,
		proxy: {
			target: "http://localhost:8000",
			ws: true
		},
		ui: {
			port: 8002,
		},
		files: ["Public/**","Resources/Views/**"],
		notify: true,
	});
})

gulp.task("default", gulp.series(gulp.series("clean"),gulp.parallel("sass", "images","js")))

module.exports = gulp
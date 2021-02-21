const gulp = require("gulp"),
	uglify = require('uglify'),
	concat = require('gulp-concat'),
	jshint = require("gulp-jshint"),
	sass = require("gulp-sass"),
	cssnano = require("gulp-cssnano"),
	imagemin = require("gulp-imagemin"),
	cache = require("gulp-cache"),
	del = require("del"),
	runSequence = require("run-sequence"),
	config = require("../Config"),
	sourcemaps = require("gulp-sourcemaps")


gulp.task("default", () => {
	runSequence('clean',["js","sass","images"])
})

gulp.task("js"), () => {
	gulp.src('Resources/JS/*.js')
		.pipe(sourcemaps.init({largeFile : true}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('Public/JS/app.js'));
}

gulp.task("sass"), () => {
	gulp.src('Resources/{SASS,CSS}/*.{css,sass,scss}')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(concat('main.css'))
		.pipe(gulp.dest("Public/CSS/main.css"))
}

gulp.task("images"), () => {
	gulp.src("Resources/Images/*.{png,jpg,gif,svg}")
		.pipe(cache(imagemin({interlaced : true})))
		.pipe(gulp.dest("Public/Images"))
}

gulp.task("clean"),() => {
	return del.sync("Public")
}
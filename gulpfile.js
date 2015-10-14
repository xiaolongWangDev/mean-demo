/* required methods */
var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var runSequence = require("run-sequence");
var liveReload = require("gulp-livereload");
/* tasks */

gulp.task("distJs", function(){
	return gulp.src(["client/bower_components/jquery/dist/jquery.min.js",
		"client/bower_components/bootstrap/dist/js/bootstrap.min.js",
		"client/src/js/**/*.js"])
		.pipe(concat('mean-demo.min.js'))
		.pipe(gulp.dest("client/dist/static/js"))
		.pipe(liveReload());
});

gulp.task("sass", function(){
	return gulp.src("client/src/css/styles.scss")
		.pipe(sass())
		.pipe(rename("builtSass.css"))
		.pipe(gulp.dest("client/dist/static/css"));
});


gulp.task("concatCss", function(){
	return gulp.src(["client/bower_components/bootstrap/dist/css/bootstrap.min.css",
		"client/src/css/**/*.css"])
		.pipe(concat('concatCss.css'))
		.pipe(gulp.dest("client/dist/static/css"));
});

gulp.task("allCss", function(){
	return gulp.src(["client/dist/static/css/concatCss.css",
		"client/dist/static/css/builtSass.css"])
		.pipe(concat('mean-demo.min.css'))
		.pipe(gulp.dest("client/dist/static/css"))
		.pipe(liveReload());
});

gulp.task("distCss", function(callback){
	runSequence("sass", "concatCss", "allCss", callback);
});

gulp.task("distHtml", function(){
	return gulp.src(["client/src/html/**/*"])
		.pipe(gulp.dest("client/dist/html"))
		.pipe(liveReload());
});

gulp.task("watchJs", function(){
	gulp.watch(["client/bower_components/jquery/dist/jquery.min.js",
		"client/bower_components/bootstrap/dist/js/bootstrap.min.js",
		 "client/src/js/**/*.js"], ["distJs"]);
});

gulp.task("watchCss", function(){
	gulp.watch(["client/bower_components/bootstrap/dist/css/bootstrap.min.css",
		 "client/src/css/**/*.css", "client/src/css/**/*.scss"], ["distCss"]);
});

gulp.task("watchHtml", function(){
	gulp.watch("client/src/html/**/*",["distHtml"]);
});


gulp.task("watch", function(callback){
	liveReload.listen();
	runSequence("watchJs", "watchCss", "watchHtml", callback);
});

gulp.task("default", function(callback){
	runSequence("distJs", "distCss", "distHtml", callback);
});

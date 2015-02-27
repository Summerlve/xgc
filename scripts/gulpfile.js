var gulp = require("gulp");
var eslint = require("gulp-eslint");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("compressjs", function () {
	return gulp.src("module/common.wechat.js")
			.pipe(rename({
				suffix: ".min"
			}))
			.pipe(uglify())
			.pipe(gulp.dest("module/"));
});

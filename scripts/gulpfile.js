var gulp = require("gulp");
var eslint = require("gulp-eslint");

gulp.task("eslint", function () {
    return gulp.src("module/*.js")
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError());
});

gulp.task("default", function () {

});

var watch = gulp.watch("module/*.js", ["eslint"]);
watch.on("change", function (event) {
	
});
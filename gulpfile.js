const gulp = require("gulp");
const args = require("yargs").argv;
const rename = require("gulp-rename");
const clean = require("gulp-clean");

gulp.task("del", function () {
  return gulp.src(".env", { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("move", function () {
  return gulp
    .src(["env/" + args.env + ".env"])
    .pipe(rename(".env"))
    .pipe(gulp.dest("./"));
});

gulp.task("set", gulp.series("del", "move"));

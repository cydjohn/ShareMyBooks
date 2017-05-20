/*
const gulp = require("gulp");
const gulpWatch = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const cssFilesCollection = './src/styles/*.css';
const cssFilesLocation = "./src/styles/";
const mainCSSFileForApplication = "./src/mainCSS/";

// create task
gulp.task("css", () => {
    gulp.src(cssFilesCollection)
        .pipe(concatenate("allStyles.css"))
        .pipe(gulp.dest(mainCSSFileForApplication))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(rename("allStyles.min.css"))
        .pipe(gulp.dest(mainCSSFileForApplication));
});

gulp.task("build", ["css"]);


gulp.task("watch", () => {
    gulp.watch(cssFilesCollection, ["css"]);
});

gulp.task("default", ["watch"]);
*/
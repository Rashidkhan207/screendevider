const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
//const browserSync = require('browser-sync');
const {src,series,parallel,dest,watch} = require('gulp');


//Now we Define our js files jsPath
const jsPath = './js/**/*.js';
// Define css source path
const cssPath = './css/**/*.css';
// Define scss file path
const sassPath = './sass/**/*.scss';

//copy function
function clon() {
    return src('src/*.html').pipe(gulp.dest('dist'));
}
// image optimize function
function imgTask() {
    return src('assets/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}
// javascript concatinate function
function jsTask() {
    return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('complete.js'))
    .pipe(terser()) //minify javascript in terser function
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js')); // ouput location of javascript files
}
// CSS minify function
function cssTask() {
    return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer(),cssnano()])) //minify css
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css')); // ouput location of javascript files
}
//compile scss function
function styleTask() {
    //scss file location
    return gulp.src(sassPath)
    //pass file in sass compiler
    .pipe(sass())
    //compiled css file location
    .pipe(gulp.dest('css'))
    //strem change in browser
    //.pipe(browserSync.stream());

}
//gulp watch function
function watchTask() {
    watch([cssPath,jsPath],{inerval:1000}, parallel(cssTask,jsTask,styleTask));
    
}
exports.styleTask = styleTask;
exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.imagTask = imgTask;
exports.clon = clon;
//exports.default = parallel(clon,imgTask,jsTask);
//exports.watch = watch;
exports.default = series(parallel(clon,jsTask,imgTask,cssTask,styleTask),watchTask);

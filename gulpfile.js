const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const { series, parallel } = require('gulp');

// export default () => (
// 	gulp.src('./dist/images/*')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist'))
// );


function style() {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function cssmin() {
    return gulp.src('./dist/css/*.css')
    .pipe(uglifycss({
        "uglyComments": true
      }))
      .pipe(gulp.dest('./dist/css'));
}

function imgMin() {
    return gulp.src('./dist/images/*')
    .pipe(changed('./dist/image-min'))
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/image-min'));
}

function svg() {
    return gulp.src('./dist/icons/*.svg')
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./dist/icons'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/sass/**/*.scss', style);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.cssmin = cssmin;
exports.watch = watch;
exports.svg = svg;
exports.imgMin = imgMin;
exports.default = parallel(style, cssmin, svg, imgMin);
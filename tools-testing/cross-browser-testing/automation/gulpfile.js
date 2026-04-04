const gulp = require('gulp');
const htmltidy = require('gulp-htmltidy');
const autoprefixer = require('gulp-autoprefixer');
const csslint = require('gulp-csslint');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');
const { series } = require('gulp');

function html(cb) {
  return gulp.src('src/index.html')
        .pipe(htmltidy())
        .pipe(gulp.dest('build'));
    cb();
}

function css(cb) {
    return gulp.src('src/style.css')
        .pipe(csslint())
        .pipe(csslint.formatter('compact'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('build'));
    cb();
}

function js(cb) {
    return gulp.src('src/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build'));
        cb();
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.default = series(html, css, js);

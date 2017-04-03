let gulp = require('gulp');
let zip = require('gulp-zip');
let copy = require('gulp-copy');
let clean = require('gulp-clean');
let gulpsync = require('gulp-sync')(gulp);

let pjson = require('./package.json');

gulp.task('build', gulpsync.sync(['clean:dist', 'clean:tmp', 'sources', 'zip', 'clean:tmp']));

gulp.task('sources', () => {
    let sources = ['manifest.json', 'assets/**/**', 'js/**/**', 'popup/**/**'];
    return gulp
        .src(sources)
        .pipe(copy('.tmp'));
});

gulp.task('zip', () => {
    return gulp
        .src('.tmp/**')
        .pipe(zip('troll-chrome-images-' + pjson.version + '.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean:tmp', () => {
    return gulp
        .src('.tmp', { read: false })
        .pipe(clean());
});

gulp.task('clean:dist', () => {
    return gulp
        .src('dist', { read: false })
        .pipe(clean());
});
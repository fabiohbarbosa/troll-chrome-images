const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', () => {
    return gulp.src(['./*', '!dist', '!node_modules', '!package.json', '!gulpfile.js', 'screenshot.png', '!README.md'])
        .pipe(zip('troll-chrome-images.zip'))
        .pipe(gulp.dest('dist'));
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
const purgecss = require('gulp-purgecss');

gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(autoprefixer({

            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(sass())
        .pipe(concat('styles.css'))

        .pipe(gulp.dest('./css/'))
});

gulp.task('livereload', function () {
    gulp.src('')
        .pipe(connect.reload());
});
gulp.task('purgecss', () => {
    return gulp.src('./css/*.css')
        .pipe(purgecss({
            content: ['./*.html']
        }))
        .pipe(gulp.dest('./css/build.css'))
});
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass', 'livereload', 'purgecss']);
    gulp.watch('', ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'purgecss']);

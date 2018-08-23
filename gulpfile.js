var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var autoprefixerOptions = {
    browsers: ['last 2 versions']
};

// Static Server + watching scss/html files
gulp.task('serve', function () {
    browserSync.init({
        proxy: "127.0.0.1:8080"
    });
    gulp.watch("./src/javascript/**/*.js", ['js']);
    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
    gulp.watch("./src/**/*.php").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("src/scss/*.scss")
        // .pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // .pipe(sourcemaps.write('maps', {
        // 	includeContent: false,
        // 	sourceRoot: 'source'
        // }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    gulp.src('node_modules/axios/dist/*')
        .pipe(gulp.dest('src/js/libs/axios/'));
    return gulp.src('src/javascript/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'js', 'serve']);

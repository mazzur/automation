import gulp from 'gulp';
import stylus from 'gulp-stylus';
import config from './config';
import rimraf from 'rimraf';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('stylus', () => {
    gulp.src(config.patterns.stylus)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('html', () => {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('clean', (cb) => {
    rimraf(config.patterns.dist, cb);
});

gulp.task('default', ['clean', 'html', 'stylus']);
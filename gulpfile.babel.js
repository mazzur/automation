import gulp from 'gulp';
import stylus from 'gulp-stylus';
import config from './config';
import rimraf from 'rimraf';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';

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

gulp.task('js', () => {
    browserify(config.paths.mainjs)
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('eslint', () => {
    gulp.src(config.patterns.lint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean', 'html', 'stylus', 'eslint', 'js']);
gulp.task('default', ['build']);
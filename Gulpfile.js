const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const twig = require('gulp-twig');
const runSequence = require('run-sequence');


gulp.task('sass:dev', () => 
	gulp.src('./client/src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/styles')));


gulp.task('watch', () => {
	gulp.watch('client/src/sass/**/*.scss', ['sass:dev']);
    gulp.watch('client/src/scripts/**/*.js', ['scripts']);
    gulp.watch('client/src/fonts/*.{woff,woff2}', ['fonts:copy']);
	gulp.watch('client/src/patterns/**/*.html', ['templates']);
})


gulp.task('server', function () {
    browserSync.init({
        files: [
            'dist/*.html',
            'dist/styles/*.css'
        ],
        server: {
            baseDir: ['./dist'],
            port: 3000,
            open: true
        }
    });
});

gulp.task('templates', () => 
	gulp.src('./client/src/patterns/**/*.html')
		.pipe(twig())
		.pipe(gulp.dest('dist')));

gulp.task('fonts:copy', () => 
    gulp.src('./client/src/fonts/*.{woff,woff2}')
        .pipe(gulp.dest('./dist/fonts')));


gulp.task('scripts', () => 
    gulp.src('./client/src/scripts/**/*.js')
        .pipe(gulp.dest('./dist/scripts')));

gulp.task('default', () => 
	runSequence('sass:dev', 'scripts', 'templates', 'fonts:copy', 'server', 'watch'));

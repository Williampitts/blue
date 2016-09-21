const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const twig = require('gulp-twig');
const runSequence = require('run-sequence');



gulp.task('sass:dev', () => 
	gulp.src('./client/src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/styles')));

gulp.task('patterns:watch', () => {
	gulp.watch('client/src/sass/**/*.scss', ['sass:dev']);
	gulp.watch('client/patterns/**/*.html', ['patterns:templates']);
})


gulp.task('patterns:server', function () {
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

gulp.task('patterns:templates', () => 
	gulp.src('./client/patterns/**/*.html')
		.pipe(twig())
		.pipe(gulp.dest('dist')));


gulp.task('patterns:dev', () => 
	runSequence('sass:dev', 'patterns:templates', 'patterns:server', 'patterns:watch'));

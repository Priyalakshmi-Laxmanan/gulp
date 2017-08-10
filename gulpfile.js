var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('gulp-sassdoc');
var csscomb = require('gulp-csscomb');
var cleanCSS = require('gulp-clean-css');
var csslint = require('gulp-csslint');


gulp.task('sass', () => 
    sass('public/sass/*.scss', 
    { 
        sourcemap : true,
    })
    .on('error', sass.logError)
    .pipe(csscomb())        
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))        
    .pipe(gulp.dest('dist/css/'))
    );


gulp.task('minify-css',() => {
    return gulp.src('dist/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/mincss/'));
});


gulp.task('watch', ['sass', 'minify-css'], function(){
    gulp.watch('public/sass/*.scss', ['sass', 'minify-css']); 
})
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cssnano=require('cssnano');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');

gulp.task('styles', function(){
    return gulp.src('src/*.css')
            .pipe(postcss([ autoprefixer ]))
            .pipe(sourcemaps.init())
            .pipe(sourcemaps.write('maps/'))
            .pipe(gulp.dest('dist/'));
});

gulp.task('rename', ['styles'], function(){
    return gulp.src('dist/example.css')
        .pipe(postcss([cssnano]))
        .pipe(rename('examples.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('dist/'));
})

gulp.task('lint-styles', function(){
    return gulp.src('src/*.css')
        .pipe(postcss([stylelint({
            'rules':{
                'color-no-invalid-hex':2,
                "declaration-colon-space-before": [2, "never"],
                "indentation": [2, 2],
                "number-leading-zero": [2, "always"] 
            }
        }), reporter({
            clearMessages: true
        })]))
});

gulp.task('default', ['lint-styles', 'rename']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function(event){
    console.log('file ' + event.path + 'was ' + event.type + ', runing task...');
});
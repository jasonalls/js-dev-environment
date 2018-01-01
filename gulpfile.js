'use strict';
// <binding AfterBuild='default' />
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var gulpRename = require('gulp-rename');
var cacheBuster = require('gulp-cache-bust');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var lazypipe = require('lazypipe');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var deletefile = require('gulp-delete-file');
var clean = require('gulp-clean');
var del = require('del');

// Delete the html debug file.
gulp.task('clean', function (done) {
    del(['dist/index.debug.html']);
    done();
  }); 

// compressTasks is a sub process used by useRef (below) that
// compresses (takes out white space etc) the javascript and 
// css files
var compressTasks = lazypipe()
    .pipe(sourcemaps.init, { loadMaps: true })
    .pipe(function () { return gulpif('*.js', uglify()); })
    .pipe(function() {
        return gulpif('*.css', cssnano({
                zindex: false }));
    });

// useRef looks at markers in index.debug.html and combines
// all of the files into one file.  once the files are combined
// the compressTasks process is called and then
// the files are all written out to the index directory.
gulp.task('useRef', function() {
        return gulp.src('src/index.debug.html')
                    .pipe(useref({}, lazypipe().pipe(compressTasks)))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest('dist'));
    }
);

// minIndex takes all of the whitespace out of the 
// main index file
gulp.task('minIndex', gulp.series('useRef', function() {
    return gulp.src('dist/index.debug.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('.'));

}));

// renameIndex renames the index file and puts it
// in the root directory
gulp.task('renameIndex', gulp.series('minIndex', function () {
    return gulp.src('dist/index.debug.html')
        .pipe(gulpRename('dist/index.html'))
        .pipe(gulp.dest('.'));
}));


gulp.task('copyJs', gulp.series('useRef', function () {
    // copy the js and map files generated from useref to 
    // the real app directory
    return gulp.src('dist/app/*.*')
        .pipe(gulp.dest('app'));
}));

gulp.task('copyCss', gulp.series('useRef', function () {
    // copy the css and map files generated from useref to 
    // the real css directory
    return gulp.src('dist/css/*.*')
        .pipe(gulp.dest('dist/css'));
}));

// cacheBuster looks at the css and js files and appends a hash to the
// request to cause the file to get reloaded when the file changes.
gulp.task('cacheBuster', gulp.series('copyCss', 'copyJs', 'renameIndex'), function () {
    return gulp.src('dist/index.html')
        .pipe(cacheBuster({type: 'timestamp'}))
        .pipe(gulp.dest('./dist'));
});

// This is the kickoff process.  Only one dependency.
gulp.task('default', gulp.series('cacheBuster', 'clean'));
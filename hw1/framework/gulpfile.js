var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

function compile(watch) {
    var bundleStream = watchify(browserify('src/hello/hello.js', {debug: true})
        .transform(babelify.configure({
            presets: ["es2015"]
        })));

    function bundle() {
        console.log('bundling...');
        bundleStream
            .bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('grasshopper.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./'));
        console.log('bundled');
    }

    if (watch) {
        bundleStream.on('update', function () {
            bundle();
        })
    }
    bundle();
}

function watch() {
    return compile(true);
}

gulp.task('build', function () {
    return compile();
});

gulp.task('watch', function () {
    return watch();
});

gulp.task('default', ['watch']);

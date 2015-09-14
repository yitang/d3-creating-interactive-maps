// Build Tasks

var del    = require('del'),
    gulp   = require('gulp'),
    stylus = require('gulp-stylus'),
    nib    = require('nib');

// Compile the Styles
gulp.task('stylus', ['clean:css'], function() {

  gulp.src('src/stylus/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('assets/css'));

});

gulp.task('clean:css', function() {
  return del(['assets/css/main.css']);
})

gulp.task('default', ['stylus']);

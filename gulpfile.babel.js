import loadPlugins from 'load-plugins';
import gulp from 'gulp';

const $ = loadPlugins('gulp-*', { strip: ['gulp'] });

/**
 * Pipes can be chained together with gulp's .pipe method
 */
const pipes = {};

// Transpile all JS to ES5.
pipes.Transpile = () => {
 return gulp.src(['app/**/*.{js,html}'])
   .pipe($.sourcemaps.init())
   .pipe($.if('*.html', $.crisper({
     scriptInHead: false
   }))) // Extract JS from .html files
   .pipe($.if('*.js', $.babel({
     presets: ['es2015']
   })))
   .pipe($.sourcemaps.write('.')) // sourcemaps for crisper dpes not work yet
   .pipe(gulp.dest('dist/'));
};

gulp.task('build', () => {
  pipes.Transpile();
});
